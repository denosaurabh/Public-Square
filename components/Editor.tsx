import { darkTheme, styled } from "@/stitches.config";
import RichMarkdownEditor from "rich-markdown-editor";
import { SettingsStore } from "@/stores/SettingsStore";
import { useStore, useObservable } from "@/stores";
import { IPFSClient } from "@/utils/ipfs";
import light, { dark } from "@/style/markdownTheme";

const Editor: React.FC = (props) => {
  const settingsStore = useStore(SettingsStore);
  const theme = useObservable(settingsStore.theme);

  return (
    <StyledEditor
      uploadImage={async (file) => {
        const added = await IPFSClient.add(file);
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;

        return url;
      }}
      //   dark={theme === "dark" ? true : false}
      theme={theme === "dark" ? dark : light}
      {...props}
    />
  );
};

export default Editor;

const StyledEditor = styled(RichMarkdownEditor, {
  fontSize: "$sm",
  color: "$grey600",

  textAlign: "start",

  display: "block !important",

  alignItems: "start",

  //   minHeight: "80vh",
  maxHeight: "20rem",

  padding: "1rem 0 1rem 0",

  textOverflow: "ellipsis",
  overflow: "hidden",

  //   [`.${darkTheme} &`]: {
  //     background: "$grey200 !important",

  //     div: {
  //       background: "$grey200 !important",
  //     },
  //   },
});
