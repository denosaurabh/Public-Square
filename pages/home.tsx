import { apolloClientWithoutAuth } from "@/apollo/client";
import Post from "@/components/Post";
import { TextDefault } from "@/components/Text";
import { EXPLORE_PUBLICATIONS } from "@/graphql/DISCOVERY";
import { PostsContainer } from "@/style/post";
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
        <TextDefault>loading....</TextDefault>
      )}
    </PostsContainer>
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
