import { darkTheme, styled } from "@/stitches.config";

import Header from "@/components/Header";
import ActionBox from "@/components/ActionBox";
import { SettingsStore } from "@/stores/SettingsStore";
import { useStore, useObservable } from "@/stores";

// import dynamic from "next/dynamic";
// const Header = dynamic(() => import("@/components/Header"), {
//   ssr: false,
// });

// import ListenAccount from "@/components/ListenAccount";

const PageContainer: React.FC = ({ children }) => {
  const settingsStore = useStore(SettingsStore);
  const theme = useObservable(settingsStore.theme);

  return (
    <Container className={theme === "dark" ? darkTheme : ""}>
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
  minHeight: "100vh",
  height: "auto",

  padding: "2rem",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  backgroundColor: "$grey100",
});

const Main = styled("div", {
  maxWidth: "100rem",
  width: "100%",

  height: "100%",

  margin: "2rem 0",
});
