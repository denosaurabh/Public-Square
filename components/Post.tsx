import { styled } from "@/stitches.config";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarImage } from "./Avatar";
import { MarkDownContainer } from "@/style/markdown";
import { SmallText, Text } from "./Text";

import CommentSvg from "@/icons/comment.svg";
import CollectSvg from "@/icons/collect.svg";
import MirrorSvg from "@/icons/mirror.svg";

const Post: React.FC = (props: any) => {
  const { profile, stats, metadata, createdAt, id: postId } = props;
  const { id, handle, picture } = profile;

  const len = metadata.content.length;
  const maxLength = 300;
  const val = len / maxLength;

  let size: "xSmall" | "small" | "medium" | "large" = "medium";

  if (val > 0.5) {
    size = "large";
  } else if (val > 0.25) {
    size = "medium";
  } else {
    size = "small";
  }

  return (
    <PostContainer size={size}>
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

      <Stats stats={stats} />
    </PostContainer>
  );
};

export default Post;

export const Stats = ({ stats, withText, css }) => {
  return (
    <StatsBox css={css}>
      <StatsItem>
        <CommentSvg />
        {stats.totalAmountOfComments} {withText && "comments"}
      </StatsItem>
      <StatsItem>
        <CollectSvg />
        {stats.totalAmountOfCollects} {withText && "collects"}
      </StatsItem>
      <StatsItem>
        <MirrorSvg />
        {stats.totalAmountOfMirrors} {withText && "mirrors"}
      </StatsItem>
    </StatsBox>
  );
};

const PostContainer = styled("div", {
  width: "250px",
  height: "fit-content",

  backgroundColor: "#E7EBF9",
  borderRadius: "10px",

  variants: {
    size: {
      xSmall: {
        width: "10rem",
        // height: "10rem",
      },
      small: {
        width: "30rem",
        // height: "10rem",
      },
      medium: {
        width: "15rem",
        // height: "20rem",
      },
      big: {
        width: "20rem",
        // height: "30rem",
      },
      large: {
        width: "25rem",
        // height: "30rem",
      },
    },
  },

  defaultVariants: {
    size: "medium",
  },
});

const ContentContainer = styled(MarkDownContainer, {
  padding: "1.5rem",
  margin: "0",

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

export const StatsBox = styled("div", {
  width: "18rem",
  margin: "1rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const StatsItem = styled(Text, {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "1rem",

  color: "light-grey",

  borderRadius: "10px",
  transition: "all 0.2s ease-in-out",

  margin: 0,

  "&:hover": {
    cursor: "pointer",

    backgroundColor: "#F0F3FE",
    boxShadow: "0px 7px 15px rgba(139, 146, 172, 0.57)",
  },
});
