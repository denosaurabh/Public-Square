import { styled } from "@/stitches.config";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarImage } from "./Avatar";
import Editor from "./Editor";
import { SmallText, TextDefault } from "./Text";

const Comment: React.FC = (props: any) => {
  const { profile, stats, metadata, id: postId, css } = props;
  const { id, handle, picture } = profile;

  return (
    <CommentContainer css={css}>
      <ContentContainer>
        {/* <Avatar>
          <AvatarImage
            src={
              picture?.original.url ||
              `https://source.boringavatars.com/marble/25/${handle}`
            }
            alt="deno"
          />
        </Avatar> */}

        <Editor
          readOnly
          value={metadata.content}
          css={{ margin: 0, padding: 0 }}
        />
      </ContentContainer>

      <Link href={`/profile/${id}`} passHref>
        <Profile>
          <Avatar>
            <AvatarImage
              src={
                picture?.original.url ||
                `https://source.boringavatars.com/marble/25/${handle}`
              }
              alt="deno"
            />
          </Avatar>

          <TextDefault>
            {handle.length > 8 ? `${handle.slice(0, 8)}...` : handle}
          </TextDefault>
          <SmallText css={{ marginLeft: "auto" }}>commented</SmallText>
        </Profile>
      </Link>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled("div", {
  width: "100%",
  height: "fit-content",

  paddingTop: "1rem",

  color: "$grey600",
  borderBottom: "1px solid $grey300",
});

const ContentContainer = styled("div", {
  borderRadius: "$500",

  padding: "0 1rem 1rem 2rem",

  display: "flex",
  alignItems: "center",
  gap: "1rem",

  "& .post-content-markdown": {
    fontSize: "1.5rem",
  },

  "&:hover": {
    cursor: "pointer",
  },
});

const Profile = styled("div", {
  display: "flex",
  alignItems: "center",

  padding: "1rem 2rem",

  "&:hover": {
    cursor: "pointer",
  },
});
