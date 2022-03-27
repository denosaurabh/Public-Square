import { Avatar, AvatarImage } from "@/components/Avatar";
import { Button } from "@/components/Button";
import Follow from "@/components/follow";
import { LineBox } from "@/components/LineBox";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileMessageActions from "@/components/ProfileMessageActions";
import {
  LightSansSerifText,
  LinkSmallText,
  SemiBoldText,
  SmallText,
  TextDefault,
} from "@/components/Text";
import { QUERY_PROFILE_BY_ID } from "@/graphql/PROFILE";
import { styled } from "@/stitches.config";
import { cleanUrl } from "@/utils";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useAccount, useSignTypedData } from "wagmi";

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;

  const [, signTypedData] = useSignTypedData();
  const [accountRes] = useAccount();

  const { data: profileDataRes, loading } = useQuery(gql(QUERY_PROFILE_BY_ID), {
    variables: {
      request: {
        profileIds: [id],
        limit: 1,
      },
    },
    pollInterval: 3000,
  });

  if (loading || !profileDataRes) {
    return <LightSansSerifText>loading....</LightSansSerifText>;
  }

  const {
    handle,
    bio,
    picture,
    id: profileId,
    followModule,
    ownedBy,
    website,
    twitterUrl,
    location,
  } = profileDataRes?.profiles.items[0];

  return (
    <Container>
      <TopContainer>
        <LeftBox>
          <Avatar css={{ width: "120px", height: "120px" }}>
            <AvatarImage
              src={
                picture?.original.url ||
                `https://source.boringavatars.com/marble/25/${handle}`
              }
              alt="deno"
            />
          </Avatar>
        </LeftBox>
        <CenterBox>
          <SemiBoldText>@{handle}</SemiBoldText>

          {bio ? (
            <TextDefault>{bio}</TextDefault>
          ) : (
            <TextDefault sansSerif>no bio....</TextDefault>
          )}

          <Follow
            profileId={profileId}
            followerAddress={ownedBy}
            followModule={followModule}
          />

          {/* <ProfileMessageActions /> */}
        </CenterBox>
        <RightBox>
          {website ? (
            <Link href={website} passHref>
              <LinkSmallText as="a" target="_blank">
                {cleanUrl(website)}
              </LinkSmallText>
            </Link>
          ) : null}

          {twitterUrl ? (
            <Link href={twitterUrl} passHref>
              <LinkSmallText as="a" target="_blank">
                {cleanUrl(twitterUrl)}
              </LinkSmallText>
            </Link>
          ) : null}

          {location ? <SmallText>location: {location}</SmallText> : null}

          <Link href={`/address/${ownedBy}`} passHref>
            <LinkSmallText as="a">
              <SmallText>owned by: {ownedBy}</SmallText>
            </LinkSmallText>
          </Link>
        </RightBox>
      </TopContainer>

      {/* <FollowPromises /> */}

      <ProfileTabs ownerAddress={ownedBy} />
    </Container>
  );
};

export default Profile;

const Container = styled("div", { marginTop: "5rem" });

const TopContainer = styled(LineBox, {
  display: "flex",
  gap: "2rem",

  width: "100%",

  padding: "2rem",
  margin: "0 auto",

  borderRadius: "$500",
});

const LeftBox = styled("div", {});
const CenterBox = styled("div", {
  // flex: 1,
  // width: "100rem",
});

const RightBox = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  "a, p": {
    margin: 1,
  },

  "& a": {
    marginBottom: "2rem",

    "&:first-child": {
      marginBottom: "0",
    },
  },
});
