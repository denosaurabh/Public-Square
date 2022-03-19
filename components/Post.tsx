import { styled } from "@/stitches.config";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarImage } from "./Avatar";
import { SmallText, Text } from "./Text";

import CommentSvg from "@/icons/comment.svg";
import CollectSvg from "@/icons/collect.svg";
import MirrorSvg from "@/icons/mirror.svg";

const Post: React.FC = (props: any) => {
  const { profile, stats, metadata, createdAt, id: postId } = props;
  const { id, handle, picture } = profile;

  return (
    <PostContainer>
      <Link href={`/post/${postId}`} passHref>
        <ContentContainer>
          <ReactMarkdown
            className="post-content-markdown"
            remarkPlugins={[remarkGfm]}>
            {metadata.content}
          </ReactMarkdown>
        </ContentContainer>
      </Link>

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
          ;<Text>{handle}</Text>
          <SmallText css={{ marginLeft: "auto" }}>
            {new Date(createdAt).toLocaleTimeString()}
          </SmallText>
        </Profile>
      </Link>

      <StatsBox>
        <StatsItem>
          <CommentSvg />
          {stats.totalAmountOfComments}
        </StatsItem>
        <StatsItem>
          <CollectSvg />
          {stats.totalAmountOfCollects}
        </StatsItem>
        <StatsItem>
          <MirrorSvg />
          {stats.totalAmountOfMirrors}
        </StatsItem>
      </StatsBox>
    </PostContainer>
  );
};

export default Post;

const PostContainer = styled("div", {
  width: "250px",
  height: "fit-content",
});

const ContentContainer = styled("div", {
  border: "1px solid grey",
  borderRadius: "10px",

  padding: "1rem",

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

  padding: "0.5rem 1rem 0 1rem",

  "&:hover": {
    cursor: "pointer",
  },
});

const StatsBox = styled("div", {
  width: "100%",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const StatsItem = styled(Text, {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",

  color: "light-grey",
});
