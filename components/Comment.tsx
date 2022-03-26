import { styled } from "@/stitches.config";
import Link from "next/link";
import dayjs from "dayjs";
import { Avatar, AvatarImage } from "./Avatar";
import { MarkDownContainer } from "@/style/markdown";
import { SmallText, Text, TextDefault } from "./Text";

import CommentSvg from "@/icons/comment.svg";
import CollectSvg from "@/icons/collect.svg";
import MirrorSvg from "@/icons/mirror.svg";
import { useState } from "react";
import Editor from "./Editor";

import relativeTime from "dayjs/plugin/relativeTime";
import { H3 } from "./Heading";
import { LineBox } from "./LineBox";

dayjs.extend(relativeTime);

const Comment: React.FC = (props: any) => {
  const { profile, stats, metadata, createdAt, id: postId, mainPost } = props;
  const { id, handle, picture } = profile;

  const { metadata: mainPostMetadata } = mainPost;

  return (
    <PostContainer>
      <Link href={`/post/${mainPost.id}`} passHref>
        <a style={{ textDecoration: "none" }}>
          {/* <ContentContainer>
            <ReactMarkdown
              className="post-content-markdown"
              remarkPlugins={[remarkGfm]}>
              {metadata.content || "*weirdly nothing...*"}
            </ReactMarkdown>
          </ContentContainer> */}

          {/* <Editor readOnly value={metadata.content} css={{ padding: "1rem" }} /> */}

          {/* <Text size="md">
            {metadata.content.length > 50
              ? metadata.content.slice(0, 50)
              : metadata.content}
          </Text> */}

          <Editor readOnly value={metadata.content} css={{ padding: "1rem" }} />

          <CommentBox>
            <Editor
              readOnly
              value={mainPostMetadata.content}
              css={{ padding: "1rem" }}
            />

            <Text size="md">
              {/* {mainPostMetadata.content.length > 50
                ? mainPostMetadata.content.slice(0, 50)
                : mainPostMetadata.content} */}
            </Text>
          </CommentBox>
        </a>
      </Link>

      {/* <Stats
        stats={stats}
        css={{
          opacity: hover ? "1" : "0",
        }}
      /> */}

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
          ;<TextDefault>{handle}</TextDefault>
          <SmallText
            css={{
              marginLeft: "auto",
              span: {
                fontStyle: "italic",
                color: "$grey400",
                marginRight: "1rem",
              },
            }}>
            <span>commented</span>
            {/* <span>dayjs(createdAt).fromNow()</span> */}
          </SmallText>
        </Profile>
      </Link>
    </PostContainer>
  );
};

export default Comment;

interface HeadlineProps {
  metadata: Record<string, any>;
}

const Headline: React.FC<HeadlineProps> = ({ metadata }) => {
  const { name, description, content } = metadata;
  const random = Math.random();

  if (random > 0 && random < 0.33 && name && name.length < 40) {
    return (
      <H3
        size="xl"
        as="h3"
        sansSerif
        italic
        css={{ padding: "1rem", lineHeight: "50px" }}>
        {name}
      </H3>
    );
  } else if (random > 0.33 && random < 0.66 && description) {
    return <Editor readOnly value={description} css={{ padding: "1rem" }} />;
  } else if (random > 0.66 && random < 0.99 && content) {
    return (
      <Editor
        readOnly
        value={content}
        css={{ fontSize: "1.6rem", fontFamily: "$sansSerif", padding: "1rem" }}
      />
    );
  } else {
    return <Editor readOnly value={content} css={{ padding: "1rem" }} />;
  }
};

interface StatsProps {
  stats: {
    totalAmountOfComments: number;
    totalAmountOfCollects: number;
    totalAmountOfMirrors: number;
  };
  withText?: boolean;
  css?: Record<string, any>;
}

export const Stats: React.FC<StatsProps> = ({ stats, withText, css }) => {
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
  height: "fit-content",
  maxHeight: "35rem",

  borderBottom: "1px solid $grey300",
  paddingBottom: "1rem",

  transition: "all 0.3s ease-in-out",

  "&:last-child": {
    borderBottom: "0",
  },
});

const CommentBox = styled(LineBox, {
  margin: "1rem",
  marginBottom: "1rem",
  // padding: "1rem",

  borderRadius: "$500",
});

const ContentContainer = styled(MarkDownContainer, {
  padding: "1.5rem",
  margin: "0",

  maxHeight: "20rem",
  overflowY: "hidden",
  overflowX: "hidden",
  textOverflow: "ellipsis",

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

  padding: "0.5rem 1rem",

  "&:hover": {
    cursor: "pointer",
  },
});

export const StatsBox = styled("div", {
  width: "20rem",
  margin: "0 1rem",
  marginTop: "2rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const StatsItem = styled(TextDefault, {
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

    color: "$grey100",
    backgroundColor: "$grey400",
    boxShadow: "0px 7px 15px rgba(139, 146, 172, 0.57)",
  },
});
