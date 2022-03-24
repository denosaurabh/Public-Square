import { styled } from "@/stitches.config";
import { LineBox } from "./LineBox";

// const Tag: React.FC = ({ children }) => {
//   return <TagStyled>{children}</TagStyled>;
// };

const Tag = styled(LineBox, {
  width: "fit-content",

  padding: "0.4rem 1rem",

  fontFamily: "$sansSerif",
  fontStyle: "italic",
  fontSize: "$sm",
  color: "$grey400",

  borderRadius: "$500",
  backgroundColor: "$grey200",
});

export default Tag;
