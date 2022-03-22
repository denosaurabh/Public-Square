import { styled } from "@/stitches.config";

import { Button } from "./Button";
import { TextArea } from "./TextArea";
import Input from "./Input";

interface ContentInputProps {
  onPostClick: (e) => void;
}

const ContentInput: React.FC<ContentInputProps> = ({ onPostClick }) => {
  return (
    <ContentInputContainer>
      <Input placeholder="Your Post Title" />
      <TextArea placeholder="enter post" />

      <Button onClick={onPostClick}>Post</Button>
    </ContentInputContainer>
  );
};

export default ContentInput;

const ContentInputContainer = styled("div", {
  marginTop: "5rem",
});
