import { EXPLORE_PUBLICATIONS } from "@/graphql/DISCOVERY";
import { QUERY_PUBLICATIONS } from "@/graphql/PUBLICATIONS";
import { useObservable } from "@/stores";
import { SocialDAOStore } from "@/stores/SocialDaoStore";
import PostsContainer from "@/components/PostsContainer";
import useSWR from "swr";
import Post from "../Post";
import { LightSansSerifText } from "../Text";

const Publications: React.FC = () => {
  // const socialDao = useStore(SocialDAOStore);
  const posts = useObservable(SocialDAOStore.posts);

  return (
    <>
      {!posts && <LightSansSerifText>loading....</LightSansSerifText>}

      {!posts.length ? (
        <LightSansSerifText>No Publications</LightSansSerifText>
      ) : null}

      <PostsContainer publications={posts} noHeader />
    </>
  );
};

export default Publications;
