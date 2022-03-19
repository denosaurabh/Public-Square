import Comment from "@/components/comment";
import CreateComment from "@/components/createComment";
import CreateMirror from "@/components/createMirror";
import Post from "@/components/Post";
import { Text } from "@/components/Text";
import { EXPLORE_PUBLICATIONS } from "@/graphql/DISCOVERY";
import {
  QUERY_PUBLICATIONS,
  QUERY_PUBLICATION_BY_ID,
} from "@/graphql/PUBLICATIONS";
import PageContainer from "@/layouts/PageContainer";
import { PostsContainer } from "@/style/post";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

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

  if (!pub) return <></>;

  return (
    <PageContainer>
      <PostsContainer>
        {data ? <Post {...pub} key={pub.id} /> : <Text>loading....</Text>}
      </PostsContainer>

      <CreateMirror publicationId={pub.id} />
      <CreateComment publicationId={pub.id} />

      {commentsData?.data.publications.items ? (
        commentsData?.data.publications.items.map((comment) => (
          <Comment {...comment} key={comment.id} />
        ))
      ) : (
        <Text>loading....</Text>
      )}
    </PageContainer>
  );
};

export default PostPage;
