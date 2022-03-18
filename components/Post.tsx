import { styled } from "@/stitches.config";
import { Avatar, AvatarImage } from "./Avatar";
import { Text } from "./Text";

const Post: React.FC = (props) => {
  const { profile, stats, metadata } = props;
  const { id, handle } = profile;

  return (
    <PostContainer>
      <ContentContainer>
        <Text>{metadata.content}</Text>
      </ContentContainer>

      <Profile>
        <Avatar>
          <AvatarImage src="/img/dinosaur.png" alt="deno" />
        </Avatar>

        <Text>{handle}</Text>
      </Profile>
    </PostContainer>
  );
};

export default Post;

const PostContainer = styled("div", {
  width: "250px",
  height: "fit-content",
});

const ContentContainer = styled("div", {
  border: "1px solid grey",
  borderRadius: "10px",

  padding: "0.4rem",
});

const Profile = styled("div", {
  display: "flex",
  alignItems: "center",

  padding: "0.5rem 1rem",
});
