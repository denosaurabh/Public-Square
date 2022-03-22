import { styled } from "@/stitches.config";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarImage } from "./Avatar";
import { SmallText, Text } from "./Text";

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

          <Text>{handle}</Text>
          <SmallText css={{ marginLeft: "auto" }}>commented</SmallText>
        </Profile>
      </Link>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled("div", {
  width: "250px",
  height: "fit-content",
});

const ContentContainer = styled("div", {
  borderRadius: "10px",

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
  border: "1px solid #D3D3D3",
  backgroundColor: "#E7EBF9",
  borderRadius: "10px",

  padding: "1rem",
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
