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
        sortCriteria: "TOP_COMMENTED",
        // sources: ["deno-lensapp"],
      },
    },
  ]);

  return (
    <PageContainer>
      <PostsContainer>
        {/* <Post />; */}
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
