import { H3 } from "@/components/Heading";
import { styled } from "@/stitches.config";

const ApplicationError = () => {
  return (
    <Center>
      <H3 sansSerif italic as="a" href="/">
        Make sure you are on Polygon Mumbai Network
      </H3>
    </Center>
  );
};

export default ApplicationError;

const Center = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  height: "70vh",
});
