import { Avatar, AvatarImage } from "@/components/Avatar";
import Follow from "@/components/follow";
import FollowPromises from "@/components/FollowPromises";
import { LineBox } from "@/components/LineBox";
import Post from "@/components/Post";
import ProfileTabs from "@/components/profile/ProfileTabs";
import {
  LinkSmallText,
  SemiBoldText,
  SmallText,
  TextDefault,
} from "@/components/Text";
import { QUERY_PROFILE_BY_ID } from "@/graphql/PROFILE";
import { QUERY_PUBLICATIONS } from "@/graphql/PUBLICATIONS";
import { styled } from "@/stitches.config";
import { PostsContainer } from "@/components/PostsContainer";
import { cleanUrl } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: profileDataRes } = useSWR([
    QUERY_PROFILE_BY_ID,
    {
      request: {
        profileIds: [id],
        limit: 1,
      },
    },
  ]);

  console.log(profileDataRes);

  if (!profileDataRes) return <></>;

  const { data } = profileDataRes;
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
  } = data?.profiles.items[0];

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
            <TextDefault font="sansSerif">no bio....</TextDefault>
          )}

          <Follow
            profileId={profileId}
            followerAddress={ownedBy}
            followModule={followModule}
          />
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
          <SmallText>owned by: {ownedBy}</SmallText>
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
