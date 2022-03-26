import { styled } from "@/stitches.config";
import Comment from "./comment";
import { LightSansSerifText, SemiBoldText, TextDefault } from "./Text";

interface CommentsContainerProps {
  data: any;
}

const CommentsContainer: React.FC<CommentsContainerProps> = ({
  data: commentsData,
}) => {
  if (!commentsData?.data) return <></>;

  if (commentsData?.data.publications.items.length === 0) {
    return <LightSansSerifText>No comments</LightSansSerifText>;
  }

  return (
    <Container>
      <SemiBoldText>Comments</SemiBoldText>

      {commentsData?.data.publications.items ? (
        commentsData?.data.publications.items.map((comment: any) => (
          <Comment {...comment} key={comment.id} />
        ))
      ) : (
        <TextDefault>loading....</TextDefault>
      )}

      {!commentsData?.data.publications.items.length ? (
        <LightSansSerifText>no Comments ....</LightSansSerifText>
      ) : null}
    </Container>
  );
};

export default CommentsContainer;

const Container = styled("div", {
  width: "100%",
});
