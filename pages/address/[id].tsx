import { NextPage } from "next";
import { useRouter } from "next/router";

import { LineBox } from "@/components/LineBox";
import { QUERY_PROFILE_BY_ID } from "@/graphql/PROFILE";
import { styled } from "@/stitches.config";
import { gql, useQuery } from "@apollo/client";
import { LightSansSerifText } from "@/components/Text";
import { H3 } from "@/components/Heading";
import Profile from "@/components/Profile";

const AddressPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading } = useQuery(gql(QUERY_PROFILE_BY_ID), {
    variables: {
      request: {
        ownedBy: id,
        limit: 20,
      },
    },
  });

  if (loading || !data?.profiles?.items) {
    return <LightSansSerifText>loading....</LightSansSerifText>;
  }

  console.log(data);

  return (
    <Container>
      <H3 size="h1" css={{ marginBottom: "5rem", padding: "2rem" }}>
        {id}
      </H3>

      <H3 css={{ marginBottom: "1rem", padding: "2rem" }} size="h6">
        {data?.profiles?.items.length} Profiles
      </H3>
      <ProfilesContainer>
        {data?.profiles.items.map((profile, id) => {
          return (
            <Profile {...profile} key={id} href={`/profile/${profile.id}`} />
          );
        })}
      </ProfilesContainer>
    </Container>
  );
};

export default AddressPage;

const Container = styled(LineBox, {
  padding: "1rem",
});

const ProfilesContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  // flexDirection: "column",
  gap: "1.5rem",
});
