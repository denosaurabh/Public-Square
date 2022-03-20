import Comment from "@/components/comment";
import CreateComment from "@/components/createComment";
import MarkDownBox from "@/components/MarkdownBox";
import { StatsBox, StatsItem } from "@/components/Post";
import {
  LinkSmallText,
  SemiBoldText,
  SmallText,
  Text,
} from "@/components/Text";
import {
  QUERY_PUBLICATIONS,
  QUERY_PUBLICATION_BY_ID,
} from "@/graphql/PUBLICATIONS";
import { styled } from "@/stitches.config";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

import CommentSvg from "@/icons/comment.svg";
import CollectSvg from "@/icons/collect.svg";
import MirrorSvg from "@/icons/mirror.svg";
import Link from "next/link";
import { useState } from "react";
import useMirrorPost from "@/hooks/useMirrorPost";
import useCollectPost from "@/hooks/useCollectPost";
import CommentsContainer from "@/components/CommentsContainer";

const PostPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [openCreateComment, setOpenCreateComment] = useState(false);

  const [mirrorPost] = useMirrorPost(`${id}`);
  const [collectPost] = useCollectPost(`${id}`);

  const { data } = useSWR([
    QUERY_PUBLICATION_BY_ID,
    {
      request: {
        publicationId: id,
      },
    },
  ]);

  const { data: commentsData } = useSWR([
    QUERY_PUBLICATIONS,
    {
      request: {
        commentsOf: id,
        limit: 30,
      },
    },
  ]);

  const pub = data?.data.publication;

  console.log(pub);

  if (!pub) return <></>;

  return (
    <Container>
      {pub.metadata ? (
        <LeftBox>
          <MarkDownBox content={pub.metadata.content} />

          <ColumnStatsBox>
            <StatsItem onClick={() => setOpenCreateComment(!openCreateComment)}>
              <CommentSvg />
              {pub.stats.totalAmountOfComments || "no"} comment
              {pub.stats.totalAmountOfMirrors > 1 ? "s" : ""}
            </StatsItem>
            <StatsItem onClick={collectPost}>
              <CollectSvg />
              {pub.stats.totalAmountOfCollects || "no"} collect
              {pub.stats.totalAmountOfMirrors > 1 ? "s" : ""}
            </StatsItem>
            <StatsItem onClick={mirrorPost}>
              <MirrorSvg />
              {pub.stats.totalAmountOfMirrors || "no"} mirror
              {pub.stats.totalAmountOfMirrors > 1 ? "s" : ""}
            </StatsItem>
          </ColumnStatsBox>

          {openCreateComment ? <CreateComment publicationId={pub.id} /> : null}

          <div>
            <SmallText css={{ display: "flex", alignItems: "center" }}>
              from
              <Link href={`/profile/${pub.profile.id}`} passHref>
                <LinkSmallText>@{pub.profile.handle}</LinkSmallText>
              </Link>
            </SmallText>
            <SmallText>owned by {pub.profile.ownedBy}</SmallText>
          </div>
        </LeftBox>
      ) : (
        <Text>loading....</Text>
      )}

      <RightBox>
        <CommentsContainer data={commentsData} />
      </RightBox>
    </Container>
  );
};

export default PostPage;

const Container = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  // flexWrap: "wrap",

  gap: "3rem",
});

const LeftBox = styled("div", {
  width: "60%",

  display: "flex",
  flexDirection: "column",
  gap: "8rem",
});

const RightBox = styled("div", {
  // width: "40%",

  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

const ColumnStatsBox = styled(StatsBox, {
  flexDirection: "column",
  alignItems: "flex-start",
  width: "max-content",

  "& p": {
    gap: "1rem",
  },
});
