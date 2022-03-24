import { apolloClientWithoutAuth } from "@/apollo/client";
import Post from "@/components/Post";
import PostsContainer from "@/components/PostsContainer";
import { LightSansSerifText, TextDefault } from "@/components/Text";
import { EXPLORE_PUBLICATIONS } from "@/graphql/DISCOVERY";
// import { PostsContainer } from "@/components/PostsContainer";
import { gql } from "@apollo/client";
import type { NextPage } from "next";
import useSWR from "swr";

const Recommandations: NextPage = () => {
  const { data } = useSWR([
    EXPLORE_PUBLICATIONS,
    {
      request: {
        limit: 40,
        sortCriteria: "TOP_COMMENTED",
        // sources: ["deno-lensapp", "denolensapp"],
      },
    },
  ]);

  console.log(data);

  if (!data?.data.explorePublications?.items) {
    return <LightSansSerifText>loading....</LightSansSerifText>;
  }

  return (
    <PostsContainer publications={data?.data.explorePublications?.items} />
  );
};

export default Recommandations;
