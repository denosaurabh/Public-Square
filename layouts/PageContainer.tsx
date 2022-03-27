import { darkTheme, styled } from "@/stitches.config";

import Header from "@/components/Header";
import ActionBox from "@/components/ActionBox";
import { SettingsStore } from "@/stores/SettingsStore";
import { useObservable } from "@/stores";
import Footer from "@/components/Footer";

// import dynamic from "next/dynamic";
// const Header = dynamic(() => import("@/components/Header"), {
//   ssr: false,
// });

// import ListenAccount from "@/components/ListenAccount";

const PageContainer: React.FC = ({ children }) => {
  // const settingsStore = useStore(SettingsStore);
  const theme = useObservable(SettingsStore.theme);

  return (
    <Container className={theme === "dark" ? darkTheme : ""}>
      <Header />
      <Main>
        <ActionBox />
        {children}
      </Main>

      <Footer />

      {/* <ListenAccount /> */}
    </Container>
  );
};

export default PageContainer;

const Container = styled("div", {
  width: "100%",
  minHeight: "100vh",
  height: "auto",

  padding: "2rem",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  backgroundColor: "$grey100",

  "html::-webkit-scrollbar": {
    width: "3px",
  },
  "html::-webkit-scrollbar-track": {
    borderRadius: "10px",
  },
  "html::-webkit-scrollbar-thumb": {
    background: "$grey400",
    borderRadius: "10px",
  },
});

const Main = styled("div", {
  maxWidth: "100rem",
  width: "100%",

  height: "100%",
  minHeight: "100vh",

  margin: "2rem 0",
});
