import Comment from "@/components/comment";
import CreateComment from "@/components/createComment";
import MarkDownBox from "@/components/MarkdownBox";
import { StatsBox, StatsItem } from "@/components/Post";
import {
  LightSansSerifText,
  LinkSmallText,
  SemiBoldText,
  SmallText,
  Text,
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
import { day } from "@/utils/dayjs";
import ReportPublication from "@/components/ReportPublication";
import ActionBox from "@/components/ActionBox";
import Media from "@/components/Media";

const PostPage: NextPage = () => {
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

    pollInterval: 3000,
    ssr: true,
  });

  console.log(data);

  const { data: commentsData } = useQuery(gql(QUERY_PUBLICATIONS), {
    variables: {
      request: {
        commentsOf: id,
        limit: 30,
      },
    },

    pollInterval: 3000,
  });

  const pub = data?.publication;

  if (loading || !pub) {
    return <LightSansSerifText>Loading....</LightSansSerifText>;
  }

  return (
    <>
      {pub.mainPost ? (
        <>
          <Container
            css={{
              flexDirection: "column",
              gap: "2rem",
              paddingBottom: "2rem",
            }}>
            <H5 size="h1" italic sansSerif>
              {pub.mainPost.metadata.name}
            </H5>

            <Link href={`/post/${pub.mainPost.id}`} passHref>
              <Text
                size="lg"
                sansSerif
                italic
                css={{
                  textDecoration: "underline",
                  padding: "1.2rem 2rem",
                  border: "1px solid $grey400",
                  borderRadius: "$500",
                  width: "fit-content",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}>
                Check out full post
              </Text>
            </Link>
          </Container>

          <Separator orientation="vertical" css={{ maxHeight: "40px" }} />
        </>
      ) : null}

      <Container>
        {pub.metadata ? (
          <LeftBox>
            <div>
              <H5 size="h1" italic sansSerif>
                {pub.metadata.name}
              </H5>
              <H6 size="h6" weight="600" css={{ margin: "3rem 0" }}>
                {pub.metadata.description}
              </H6>
              {/* <MarkDownBox content={pub.metadata.content} /> */}

              <Editor readOnly value={pub.metadata.content} />
            </div>

            <Media mediaArr={pub.metadata?.media} />

            <ColumnStatsBox>
              <StatsItem
                onClick={async () => {
                  await setOpenCreateComment(!openCreateComment);

                  window.scrollTo({
                    left: 0,
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  });
                }}>
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
                    ? REFERENCE_MODULES[pub.referenceModule.__typename]
                        .userMessage
                    : REFERENCE_MODULES["none"].userMessage}
                </TooltipContent>
              </Tooltip>
            </ColumnStatsBox>

            <FlexColumn>
              <SmallTextFlex>
                Posted on: {day(pub.createdAt).fromNow()}
              </SmallTextFlex>

              <SmallTextFlex>
                From
                <Link href={`/profile/${pub.profile.id}`} passHref>
                  <LinkSmallText>@{pub.profile.handle}</LinkSmallText>
                </Link>
              </SmallTextFlex>

              <SmallTextFlex>
                Owned by
                <Link href={`/address/${pub.profile.ownedBy}`} passHref>
                  <LinkSmallText>{pub.profile.ownedBy}</LinkSmallText>
                </Link>
              </SmallTextFlex>

              <SmallTextFlex>App Id: {pub.appId}</SmallTextFlex>
            </FlexColumn>

            {/* <ReportPublication publicationId={pub.id} /> */}
          </LeftBox>
        ) : (
          <TextDefault>loading....</TextDefault>
        )}

        {/* <Separator
        orientation="vertical"
        css={{ minHeight: "100vh", height: "100%" }}
      /> */}

        <RightBox>
          <CommentsContainer data={{ data: commentsData }} />
        </RightBox>
      </Container>

      {openCreateComment ? (
        <>
          <Separator orientation="vertical" css={{ maxHeight: "30px" }} />
          <Container>
            <CreateComment publicationId={pub.id} />
          </Container>
        </>
      ) : null}
    </>
  );
};

export default PostPage;

const Container = styled(LineBox, {
  display: "flex",
  justifyContent: "space-between",

  // flexWrap: "wrap",
  padding: "1rem 2rem",

  borderRadius: "$500",
});

const LeftBox = styled("div", {
  flexBasis: "66%",

  display: "flex",
  flexDirection: "column",
  gap: "8rem",

  paddingRight: "2rem",
  marginRight: "1rem",

  borderRight: "1px solid $grey300",
});

const RightBox = styled("div", {
  flex: 1,

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

const FlexColumn = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",

  marginBottom: "4rem",
});

const SmallTextFlex = styled(SmallText, {
  display: "flex",
  alignItems: "center",
  height: "1rem",

  margin: 0,
  padding: 0,

  a: {
    margin: 0,
    padding: 0,
  },

  p: {
    // margin: "0.5rem",
    padding: 0,
  },
});
