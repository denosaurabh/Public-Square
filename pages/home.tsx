import { apolloClientWithoutAuth } from "@/apollo/client";
import Post from "@/components/Post";
import PostsContainer from "@/components/PostsContainer";
import { LightSansSerifText, TextDefault } from "@/components/Text";
import { EXPLORE_PUBLICATIONS } from "@/graphql/DISCOVERY";
// import { PostsContainer } from "@/components/PostsContainer";
import { gql } from "@apollo/client";
import type { NextPage } from "next";
import useSWR from "swr";

const Home: NextPage = ({ publications }) => {
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
    {
      fallbackData: publications,
    }
  );

  console.log(data);

  if (!data?.data.explorePublications?.items) {
    return <LightSansSerifText>loading....</LightSansSerifText>;
  }

  return (
    <PostsContainer publications={data?.data.explorePublications?.items} />
  );
};

export default Home;

// export async function getStaticProps() {
//   const res = await apolloClientWithoutAuth.query({
//     query: gql(EXPLORE_PUBLICATIONS),
//     variables: {
//       request: {
//         limit: 40,
//         sortCriteria: "TOP_COMMENTED",
//       },
//     },
//   });

//   return {
//     props: {
//       publications: res,
//     },
//     revalidate: 20,
//   };
// }
