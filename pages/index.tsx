import Post from "@/components/Post";
import { Text } from "@/components/Text";
import { EXPLORE_PUBLICATIONS } from "@/graphql/DISCOVERY";
import PageContainer from "@/layouts/PageContainer";
import { PostsContainer } from "@/style/post";
import type { NextPage } from "next";
import useSWR from "swr";

const Home: NextPage = () => {
  const { data } = useSWR([
    EXPLORE_PUBLICATIONS,
    {
      request: {
        limit: 50,
        sortCriteria: "TOP_COLLECTED",
      },
    },
  ]);

  return (
    <PageContainer>
      <PostsContainer>
        {data ? (
          data?.data.explorePublications?.items.map((post) => {
            if (post.__typename === "Post") {
              return <Post {...post} key={post.id} />;
            }
          })
        ) : (
          <Text>loading....</Text>
        )}
      </PostsContainer>
    </PageContainer>
  );
};

export default Home;
