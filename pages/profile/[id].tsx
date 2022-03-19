import { Avatar, AvatarImage } from "@/components/Avatar";
import Follow from "@/components/follow";
import Post from "@/components/Post";
import { SemiBoldText, Text } from "@/components/Text";
import { QUERY_PROFILE_BY_ID } from "@/graphql/PROFILE";
import { QUERY_PUBLICATIONS } from "@/graphql/PUBLICATIONS";
import PageContainer from "@/layouts/PageContainer";
import { styled } from "@/stitches.config";
import { PostsContainer } from "@/style/post";
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
  } = data?.profiles.items[0];

  console.log(data);

  return (
    <PageContainer>
      <Container>
        <TopContainer>
          <LeftBox>
            <Avatar css={{ width: "100px", height: "100px" }}>
              <AvatarImage
                src={
                  picture?.original.url ||
                  `https://source.boringavatars.com/marble/25/${handle}`
                }
                alt="deno"
              />
            </Avatar>

            <SemiBoldText>@{handle}</SemiBoldText>

            <Follow
              profileId={profileId}
              followerAddress={ownedBy}
              followModule={followModule}
            />
          </LeftBox>
          <RightBox>
            <Text>{bio}</Text>
          </RightBox>
        </TopContainer>

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
const RightBox = styled("div", {});
