import { H3 } from "@/components/Heading";
import { styled } from "@/stitches.config";

const Error = ({ statusCode }) => {
  return (
    <Center>
      <H3 sansSerif italic as="a" href="/">
        App Crashed. Code: {statusCode}
      </H3>
    </Center>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

const Center = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  height: "70vh",
});
