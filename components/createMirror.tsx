import { styled } from "@/stitches.config";
import { Button } from "./Button";
import useMirrorPost from "@/hooks/useMirrorPost";

interface CreateCommentI {
  publicationId: string;
}

const CreateMirror: React.FC<CreateCommentI> = ({ publicationId }) => {
  const [mirorPost] = useMirrorPost(publicationId);

  return (
    <MirrorContainer onSubmit={mirorPost}>
      <Button type="submit">Mirror</Button>
    </MirrorContainer>
  );
};

export default CreateMirror;

const MirrorContainer = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",

  width: "40rem",
  margin: "5rem auto",
});
