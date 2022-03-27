import PostsContainer from "@/components/PostsContainer";
import { LightSansSerifText } from "@/components/Text";
import { EXPLORE_PUBLICATIONS } from "@/graphql/DISCOVERY";

import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useObservable } from "@/stores";
import { SettingsStore } from "@/stores/SettingsStore";

const Home: NextPage = () => {
  const filter = useObservable(SettingsStore.filter);
  const denoAppID = useObservable(SettingsStore.denoAppId);

  const { data, fetchMore } = useQuery(gql(EXPLORE_PUBLICATIONS), {
    variables: {
      request: {
        limit: 40,
        sortCriteria: filter,
        sources: denoAppID ? ["denolensapp"] : [],
      },
    },
  });

  console.log(data);

  if (!data?.explorePublications?.items) {
    return <LightSansSerifText>loading....</LightSansSerifText>;
  }

  return (
    <>
      <PostsContainer publications={data?.explorePublications?.items} />
    </>
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
