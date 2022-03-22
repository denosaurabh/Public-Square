import { EXPLORE_PUBLICATIONS } from "@/graphql/DISCOVERY";
import { QUERY_PUBLICATIONS } from "@/graphql/PUBLICATIONS";
import { useStore, useObservable } from "@/stores";
import { SocialDAOStore } from "@/stores/SocialDaoStore";
import { PostsContainer } from "@/style/post";
import useSWR from "swr";
import Post from "../Post";
import { LightSansSerifText } from "../Text";

const Publications: React.FC = () => {
  const socialDao = useStore(SocialDAOStore);
  const daoProfileInfo = useObservable(socialDao.currentDaoProfileInfo);

  const { data: pubsData } = useSWR(
    [
      QUERY_PUBLICATIONS,
      {
        request: {
          profileId: daoProfileInfo.id,
          publicationTypes: ["POST", "COMMENT", "MIRROR"],
          limit: 30,
        },
      },
    ],
    {}
  );

  return (
    <PostsContainer>
      {pubsData ? (
        pubsData?.data.publications?.items.map((post: any) => {
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
