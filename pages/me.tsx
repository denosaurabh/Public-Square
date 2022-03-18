import { Avatar, AvatarImage } from "@/components/Avatar";
import Post from "@/components/Post";
import { SemiBoldText, Text } from "@/components/Text";
import { QUERY_PROFILE_BY_ID } from "@/graphql/PROFILE";
import { QUERY_PUBLICATION_BY_PROFILEID } from "@/graphql/PUBLICATIONS";
import PageContainer from "@/layouts/PageContainer";
import { styled } from "@/stitches.config";
import { useStore, useObservable } from "@/stores";
import { AccountStore } from "@/stores/AccountStore";
import { PostsContainer } from "@/style/post";
import useSWR from "swr";

const Profile = () => {
  const accountStore = useStore(AccountStore);
  const activeAccountAdr = useObservable(accountStore.activeAccountAdr);

  console.log(activeAccountAdr);

  const { data: profileDataRes } = useSWR([
    QUERY_PROFILE_BY_ID,
    {
      request: {
        profileIds: [activeAccountAdr || "0x01"],
        limit: 3,
      },
    },
  ]);

  const { data: pubsDataRes } = useSWR([
    QUERY_PUBLICATION_BY_PROFILEID,
    {
      request: {
        profileId: activeAccountAdr,
        publicationTypes: ["POST", "COMMENT", "MIRROR"],
        limit: 50,
      },
    },
  ]);

  if (!profileDataRes) return <PageContainer></PageContainer>;

  console.log(profileDataRes);

  const { data } = profileDataRes;
  const { handle, bio } = data?.profiles.items[0];

  console.log("pubsDataRes", pubsDataRes);

  return (
    <PageContainer>
      <Container>
        <TopContainer>
          <LeftBox>
            <Avatar css={{ width: "100px", height: "100px" }}>
              <AvatarImage src="/img/dinosaur.png" alt="deno" />
            </Avatar>

            <SemiBoldText>{handle}</SemiBoldText>
          </LeftBox>
          <RightBox>
            <Text>{bio}</Text>
          </RightBox>
        </TopContainer>

        <PostsContainer>
          {/* <Post /> */}

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
