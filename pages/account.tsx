import { NextPage } from "next";
import { useRouter } from "next/router";

import { LineBox } from "@/components/LineBox";
import { QUERY_PROFILE_BY_ID } from "@/graphql/PROFILE";
import { styled } from "@/stitches.config";
import { gql, useQuery } from "@apollo/client";
import { LightSansSerifText } from "@/components/Text";
import { H3 } from "@/components/Heading";
import Profile from "@/components/Profile";
import { Avatar, AvatarGroup, AvatarImage } from "@/components/Avatar";
import { WalletStore } from "@/stores/WalletStore";
import { useObservable } from "@/stores";

const AccountPage: NextPage = () => {
  const address = useObservable(WalletStore.address);

  const { data, loading } = useQuery(gql(QUERY_PROFILE_BY_ID), {
    variables: {
      request: {
        ownedBy: address,
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
      <H3 size="h1" css={{ padding: "2rem" }}>
        {address}
      </H3>
      <AvatarGroup
        gap="-0.5rem"
        css={{
          justifyContent: "flex-start",
          width: "100%",
          padding: "0 4rem",

          marginBottom: "4rem",
        }}>
        {data?.profiles.items.map((profile, id) => {
          return (
            <Avatar
              key={id}
              css={{
                transition: "all 150ms",

                "&:hover": {
                  cursor: "pointer",
                  transform: "scale(1.1)",
                },
              }}>
              <AvatarImage src={profile?.picture?.original?.url} />
            </Avatar>
          );
        })}
      </AvatarGroup>

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

export default AccountPage;

const Container = styled(LineBox, {
  padding: "1rem",
});

const ProfilesContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  // flexDirection: "column",
  gap: "1.5rem",
});
