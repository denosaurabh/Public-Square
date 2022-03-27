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
        publicationTypes: ["POST", "COMMENT", "MIRROR"],
        limit: 30,
      },
    },
  ]);

  console.log(id, pubsDataRes);

  const posts = pubsDataRes?.data?.publications?.items;

  return (
    <>
      {posts ? (
        <PostsContainer publications={posts} noHeader showStats />
      ) : null}

      {pubsDataRes?.data?.loading ? (
        <LightSansSerifText>Loading...</LightSansSerifText>
      ) : null}
    </>
  );
};

export default Publications;
