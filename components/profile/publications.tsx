import { QUERY_PUBLICATIONS } from "@/graphql/PUBLICATIONS";
import { PostsContainer } from "@/style/post";
import { useRouter } from "next/router";
import useSWR from "swr";
import Post from "../Post";
import { LightSansSerifText } from "../Text";

const Publications: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: pubsDataRes } = useSWR([
    QUERY_PUBLICATIONS,
    {
      request: {
        profileId: id,
        publicationTypes: ["POST", "COMMENT", "MIRROR"],
        limit: 10,
      },
    },
  ]);

  console.log(id, pubsDataRes);

  if (!pubsDataRes) return <LightSansSerifText>loading....</LightSansSerifText>;

  const posts = pubsDataRes?.data.publications.items;

  return (
    <PostsContainer>
      {posts ? (
        posts.map((post: any) => {
          if (post.__typename === "Post") {
            return <Post {...post} key={post.id} />;
          }
        })
      ) : (
        <LightSansSerifText>loading....</LightSansSerifText>
      )}

      {!posts.length ? <LightSansSerifText>No Posts</LightSansSerifText> : null}
    </PostsContainer>
  );
};

export default Publications;
