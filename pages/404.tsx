import { H3 } from "@/components/Heading";
import { styled } from "@/stitches.config";

const NotFound = () => {
  return (
    <Center>
      <H3 font="serif" italic as="a" href="/">
        Want to get lost in your thoughts?
      </H3>
    </Center>
  );
};

export default NotFound;

const Center = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  height: "70vh",
});
