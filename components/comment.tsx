import { styled } from "@/stitches.config";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarImage } from "./Avatar";
import { SmallText, TextDefault } from "./Text";

const Comment: React.FC = (props: any) => {
  const { profile, stats, metadata, id: postId } = props;
  const { id, handle, picture } = profile;

  return (
    <CommentContainer>
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

        <MarkdownContent>
          <ReactMarkdown
            className="post-content-markdown"
            remarkPlugins={[remarkGfm]}>
            {metadata.content}
          </ReactMarkdown>
        </MarkdownContent>
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

  color: "$grey600",

  padding: "1rem 0",
  borderBottom: "1px solid $grey300",
});

const ContentContainer = styled("div", {
  borderRadius: "$500",

  padding: "1rem",

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

const MarkdownContent = styled("div", {
  borderRadius: "10px",

  width: "100%",
});

const Profile = styled("div", {
  display: "flex",
  alignItems: "center",

  padding: "0rem 1rem",

  "&:hover": {
    cursor: "pointer",
  },
});
