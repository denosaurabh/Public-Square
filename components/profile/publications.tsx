import { QUERY_PUBLICATIONS } from "@/graphql/PUBLICATIONS";
import { useRouter } from "next/router";
import useSWR from "swr";
import Post from "../Post";
import PostsContainer from "../PostsContainer";
import { LightSansSerifText } from "../Text";

const Publications: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: pubsDataRes } = useSWR([
    QUERY_PUBLICATIONS,
    {
      request: {
        profileId: id,
        publicationTypes: ["POST"],
        limit: 30,
      },
    },
  ]);

  console.log(id, pubsDataRes);

  if (!pubsDataRes) return <LightSansSerifText>loading....</LightSansSerifText>;

  const posts = pubsDataRes?.data.publications.items;

  return (
    <>
      <PostsContainer publications={posts} noHeader showStats />

      {!posts.length ? <LightSansSerifText>No Posts</LightSansSerifText> : null}
    </>
  );
};

export default Publications;
