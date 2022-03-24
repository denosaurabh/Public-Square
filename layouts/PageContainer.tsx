import { styled } from "@/stitches.config";

import Header from "@/components/Header";
import ActionBox from "@/components/ActionBox";

// import dynamic from "next/dynamic";
// const Header = dynamic(() => import("@/components/Header"), {
//   ssr: false,
// });

// import ListenAccount from "@/components/ListenAccount";

const PageContainer: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      <Main>
        <ActionBox />
        {children}
      </Main>

      {/* <ListenAccount /> */}
    </Container>
  );
};

export default PageContainer;

const Container = styled("div", {
  width: "100%",
  height: "auto",

  padding: "2rem",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Main = styled("div", {
  maxWidth: "100rem",
  width: "100%",

  height: "100%",

  margin: "2rem 0",
});
