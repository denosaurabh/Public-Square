import { Avatar, AvatarImage } from "@/components/Avatar";
import Post from "@/components/Post";
import { SemiBoldText, Text } from "@/components/Text";
import PageContainer from "@/layouts/PageContainer";
import { styled } from "@/stitches.config";
import { PostsContainer } from "@/style/post";

const Profile = () => {
  return (
    <PageContainer>
      <Container>
        <TopContainer>
          <LeftBox>
            <Avatar css={{ width: "100px", height: "100px" }}>
              <AvatarImage src="/img/dinosaur.png" alt="deno" />
            </Avatar>

            <SemiBoldText>@denosaur</SemiBoldText>
          </LeftBox>
          <RightBox>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </RightBox>
        </TopContainer>

        <PostsContainer>{/* <Post /> */}</PostsContainer>
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
