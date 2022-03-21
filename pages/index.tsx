import Post from "@/components/Post";
import { Text } from "@/components/Text";
import { EXPLORE_PUBLICATIONS } from "@/graphql/DISCOVERY";
import { PostsContainer } from "@/style/post";
import type { NextPage } from "next";
import useSWR from "swr";

const Home: NextPage = () => {
  const { data } = useSWR(
    [
      EXPLORE_PUBLICATIONS,
      {
        request: {
          limit: 40,
          sortCriteria: "TOP_COMMENTED",
          // sources: ["deno-lensapp", "denolensapp"],
        },
      },
    ],
    {}
  );

  return (
    <PostsContainer>
      {/* <Post />; */}
      {data ? (
        data?.data.explorePublications?.items.map((post: any) => {
          if (post.__typename === "Post") {
            return <Post {...post} key={post.id} />;
          }
        })
      ) : (
        <Text>loading....</Text>
      )}
    </PostsContainer>
  );
};

export default Home;
