import Comment from "@/components/comment";
import CreateComment from "@/components/createComment";
import MarkDownBox from "@/components/MarkdownBox";
import { StatsBox, StatsItem } from "@/components/Post";
import { LinkSmallText, SmallText, Text } from "@/components/Text";
import {
  QUERY_PUBLICATIONS,
  QUERY_PUBLICATION_BY_ID,
} from "@/graphql/PUBLICATIONS";
import PageContainer from "@/layouts/PageContainer";
import { styled } from "@/stitches.config";
import { PostsContainer } from "@/style/post";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

import CommentSvg from "@/icons/comment.svg";
import CollectSvg from "@/icons/collect.svg";
import MirrorSvg from "@/icons/mirror.svg";
import Link from "next/link";

const PostPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

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

  if (!pub) return <PageContainer />;

  return (
    <PageContainer>
      <Container>
        {pub.metadata ? (
          <LeftBox>
            <MarkDownBox content={pub.metadata.content} />

            <ColumnStatsBox>
              <StatsItem>
                <CommentSvg />
                {pub.stats.totalAmountOfComments || "no"} comment
                {pub.stats.totalAmountOfMirrors > 1 ? "s" : ""}
              </StatsItem>
              <StatsItem>
                <CollectSvg />
                {pub.stats.totalAmountOfCollects || "no"} collect
                {pub.stats.totalAmountOfMirrors > 1 ? "s" : ""}
              </StatsItem>
              <StatsItem>
                <MirrorSvg />
                {pub.stats.totalAmountOfMirrors || "no"} mirror
                {pub.stats.totalAmountOfMirrors > 1 ? "s" : ""}
              </StatsItem>
            </ColumnStatsBox>

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
          <CreateComment publicationId={pub.id} />

          {commentsData?.data.publications.items ? (
            commentsData?.data.publications.items.map((comment) => (
              <Comment {...comment} key={comment.id} />
            ))
          ) : (
            <Text>loading....</Text>
          )}
        </RightBox>
      </Container>
    </PageContainer>
  );
};

export default PostPage;

const Container = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});

const LeftBox = styled("div", {
  width: "50%",

  display: "flex",
  flexDirection: "column",
  gap: "8rem",
});

const RightBox = styled("div", {
  width: "50%",

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
