import { EXPLORE_PUBLICATIONS } from "@/graphql/DISCOVERY";
import { PostsContainer } from "@/style/post";
import useSWR from "swr";
import Post from "../Post";
import { LightSansSerifText } from "../Text";

const Publications: React.FC = () => {
  const { data: pubsData } = useSWR(
    [
      EXPLORE_PUBLICATIONS,
      {
        request: {
          limit: 50,
          sortCriteria: "TOP_COMMENTED",
        },
      },
    ],
    {}
  );

  return (
    <PostsContainer>
      {pubsData ? (
        pubsData?.data.explorePublications?.items.map((post: any) => {
          if (post.__typename === "Post") {
            return <Post {...post} key={post.id} />;
          }
        })
      ) : (
        <LightSansSerifText>loading....</LightSansSerifText>
      )}
    </PostsContainer>
  );
};

export default Publications;
