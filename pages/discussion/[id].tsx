import Comment from "@/components/comment";
import CreateComment from "@/components/createComment";
import MarkDownBox from "@/components/MarkdownBox";
import { StatsBox, StatsItem } from "@/components/Post";
import {
  LightSansSerifText,
  LinkSmallText,
  SemiBoldText,
  SmallText,
  TextDefault,
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
import { H3, H5, H6 } from "@/components/Heading";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/Tooltip";
import { COLLECT_MODULES, REFERENCE_MODULES } from "@/contratcts";
import { gql, useQuery } from "@apollo/client";
import { apolloClientWithoutAuth } from "@/apollo/client";
import { LineBox } from "@/components/LineBox";
import { Separator } from "@/components/Seperator";
import Editor from "@/components/Editor";

const Subject: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [openCreateComment, setOpenCreateComment] = useState(false);

  const [mirrorPost] = useMirrorPost(`${id}`);
  const [collectPost] = useCollectPost(`${id}`);

  // const { data } = useSWR([
  //   QUERY_PUBLICATION_BY_ID,
  //   {
  //     request: {
  //       publicationId: id,
  //     },
  //   },
  // ]);

  const { loading, error, data } = useQuery(gql(QUERY_PUBLICATION_BY_ID), {
    variables: {
      request: {
        publicationId: id,
      },
    },

    ssr: true,
  });

  console.log(data);

  const { data: commentsData } = useSWR([
    QUERY_PUBLICATIONS,
    {
      request: {
        commentsOf: id,
        limit: 30,
      },
    },
  ]);

  if (loading) return <LightSansSerifText>Loading....</LightSansSerifText>;

  const pub = data?.publication;

  console.log("commentsData", commentsData);

  return (
    <>
      <Container>
        {pub.metadata ? (
          <CenterBox>
            <div>
              <H5 size="h1" italic sansSerif>
                {pub.metadata.name}
              </H5>
              <H6 size="h6" weight="600" css={{ margin: "3rem 0" }}>
                {pub.metadata.description}
              </H6>
              {/* <MarkDownBox content={pub.metadata.content} /> */}

              <Editor
                readOnly
                value={pub.metadata.content}
                css={{
                  display: "flex",
                  justifyContent: "center",

                  textAlign: "baseline",
                }}
              />
            </div>

            <div>
              <SmallText css={{ display: "flex", alignItems: "center" }}>
                from
                <Link href={`/profile/${pub.profile.id}`} passHref>
                  <LinkSmallText>@{pub.profile.handle}</LinkSmallText>
                </Link>
              </SmallText>
            </div>
          </CenterBox>
        ) : (
          <TextDefault>loading....</TextDefault>
        )}

        {/* <Separator
        orientation="vertical"
        css={{ minHeight: "100vh", height: "100%" }}
      /> */}
      </Container>

      <ColumnStatsBox>
        <StatsItem onClick={() => setOpenCreateComment(!openCreateComment)}>
          <CommentSvg />
          {pub.stats.totalAmountOfComments || "no"} comment
          {pub.stats.totalAmountOfMirrors > 1 ? "s" : ""}
        </StatsItem>

        <Tooltip>
          <TooltipTrigger>
            <StatsItem onClick={collectPost}>
              <CollectSvg />
              {pub.stats.totalAmountOfCollects || "no"} collect
              {pub.stats.totalAmountOfMirrors > 1 ? "s" : ""}
            </StatsItem>
          </TooltipTrigger>

          <TooltipContent>
            {pub.collectModule
              ? COLLECT_MODULES[pub.collectModule.__typename].userMessage
              : COLLECT_MODULES["FreeCollectModuleSettings"].userMessage}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <StatsItem onClick={mirrorPost}>
              <MirrorSvg />
              {pub.stats.totalAmountOfMirrors || "no"} mirror
              {pub.stats.totalAmountOfMirrors > 1 ? "s" : ""}
            </StatsItem>
          </TooltipTrigger>

          <TooltipContent>
            {pub.referenceModule
              ? REFERENCE_MODULES[pub.referenceModule.__typename].userMessage
              : REFERENCE_MODULES["none"].userMessage}
          </TooltipContent>
        </Tooltip>
      </ColumnStatsBox>

      {openCreateComment ? (
        <CreateCommentBox>
          <CreateComment publicationId={pub.id} />
        </CreateCommentBox>
      ) : null}

      <CommentsContainer>
        {commentsData?.data.publications.items ? (
          commentsData?.data.publications.items.map((comment: any) => (
            <>
              <Separator orientation="vertical" css={{ maxHeight: "40px" }} />
              <Comment
                {...comment}
                key={comment.id}
                css={{
                  border: "1px solid $grey300 !important",
                  borderRadius: "$500",
                }}
              />
            </>
          ))
        ) : (
          <TextDefault>loading....</TextDefault>
        )}
      </CommentsContainer>
    </>
  );
};

export default Subject;

const Container = styled(LineBox, {
  display: "flex",
  justifyContent: "space-between",

  // flexWrap: "wrap",
  padding: "1rem 2rem",

  borderRadius: "$500",
});

const CenterBox = styled("div", {
  flexBasis: "100%",

  display: "flex",
  flexDirection: "column",
  gap: "8rem",

  paddingRight: "2rem",
});

const CommentsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const ColumnStatsBox = styled(StatsBox, {
  flexDirection: "column",
  alignItems: "flex-start",
  width: "max-content",

  "& p": {
    gap: "1rem",
  },
});

const CreateCommentBox = styled("div", {
  padding: "1rem",

  border: "1px solid $grey300",
  borderRadius: "$500",
});
