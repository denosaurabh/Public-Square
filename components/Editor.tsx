import { darkTheme, styled } from "@/stitches.config";
import RichMarkdownEditor, { Props } from "rich-markdown-editor";
import { SettingsStore } from "@/stores/SettingsStore";
import { useObservable } from "@/stores";
import { IPFSClient } from "@/utils/ipfs";
import light, { dark } from "@/style/markdownTheme";
import { useRouter } from "next/router";

interface EditorProps extends Props {
  css?: Record<string, any>;
}

const Editor: React.FC<EditorProps> = (props) => {
  // const settingsStore = useStore(SettingsStore);
  const theme = useObservable(SettingsStore.theme);

  const router = useRouter();

  return (
    <StyledEditor
      uploadImage={async (file) => {
        const added = await IPFSClient.add(file);
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;

        return url;
      }}
      onClickHashtag={(hashtag) => {
        router.push(`/search?query=${hashtag}`);
      }}
      //   dark={theme === "dark" ? true : false}
      theme={theme === "dark" ? dark : light}
      {...props}
    />
  );
};

export default Editor;

const StyledEditor = styled(RichMarkdownEditor, {
  fontFamily: "$main !important",
  fontSize: "$md",
  fontWeight: "400",

  color: "$grey600",

  textAlign: "start",
  display: "block !important",
  alignItems: "start",

  // maxHeight: "20rem",
  // maxWidth: "20rem",

  padding: "1rem 0 1rem 0",

  textOverflow: "ellipsis",
  overflow: "hidden",
});
