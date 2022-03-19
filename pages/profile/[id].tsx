import { Avatar, AvatarImage } from "@/components/Avatar";
import Follow from "@/components/follow";
import FollowPromises from "@/components/FollowPromises";
import Post from "@/components/Post";
import {
  LinkSmallText,
  SemiBoldText,
  SmallText,
  Text,
} from "@/components/Text";
import { QUERY_PROFILE_BY_ID } from "@/graphql/PROFILE";
import { QUERY_PUBLICATIONS } from "@/graphql/PUBLICATIONS";
import PageContainer from "@/layouts/PageContainer";
import { styled } from "@/stitches.config";
import { PostsContainer } from "@/style/post";
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
        limit: 3,
      },
    },
  ]);

  const { data: pubsDataRes } = useSWR([
    QUERY_PUBLICATIONS,
    {
      request: {
        profileId: id,
        publicationTypes: ["POST", "COMMENT", "MIRROR"],
        limit: 50,
      },
    },
  ]);

  if (!profileDataRes) return <PageContainer></PageContainer>;

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

  console.log(data);

  return (
    <PageContainer>
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
              <Text>{bio}</Text>
            ) : (
              <Text font="sansSerif">no bio....</Text>
            )}

            <Follow
              profileId={profileId}
              followerAddress={ownedBy}
              followModule={followModule}
            />
          </CenterBox>
          <RightBox>
            {website ? (
              <Link href={website} target="_blank" passHref>
                <LinkSmallText>{cleanUrl(website)}</LinkSmallText>
              </Link>
            ) : null}

            {twitterUrl ? (
              <Link href={twitterUrl} target="_blank" passHref>
                <LinkSmallText>{cleanUrl(twitterUrl)}</LinkSmallText>
              </Link>
            ) : null}

            {location ? <SmallText>location: {location}</SmallText> : null}
            <SmallText>owned by: {ownedBy}</SmallText>
          </RightBox>
        </TopContainer>

        <FollowPromises />

        <PostsContainer>
          {pubsDataRes?.data.publications.items.map((pub) => {
            if (pub.__typename === "Post") {
              return <Post {...pub} key={pub.id} />;
            }
          })}
        </PostsContainer>
      </Container>
    </PageContainer>
  );
};

export default Profile;

const Container = styled("div", { marginTop: "5rem" });

const TopContainer = styled("div", {
  display: "flex",
  gap: "2rem",

  width: "80%",
  margin: "0 auto",
});

const LeftBox = styled("div", {});
const CenterBox = styled("div", {
  // flex: 1,
  // width: "100rem",
});

const RightBox = styled("div", {
  marginLeft: "6rem",
  width: "10rem",
});
