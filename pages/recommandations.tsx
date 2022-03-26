import { NextPage } from "next";
import { H1 } from "@/components/Heading";
import Profile from "@/components/Profile";
import { LightSansSerifText, TextDefault } from "@/components/Text";
import { RECOMMANDATIONS } from "@/graphql/RECOMMANDATIONS";
import { gql, useQuery } from "@apollo/client";
import { styled } from "@/stitches.config";

const Recommandations: NextPage = () => {
  const { data, loading } = useQuery(gql(RECOMMANDATIONS));

  console.log(data);

  if (loading || !data?.recommendedProfiles) {
    return <LightSansSerifText>loading....</LightSansSerifText>;
  }

  return (
    <>
      <H1 italic sansSerif>
        Recommandations
      </H1>
      <TextDefault
        italic
        sansSerif
        css={{ padding: 0, margin: 0, marginBottom: "4rem" }}>
        These are the recommanded profiles to you by smartly looking at your
        past interacions with lens protocol.
      </TextDefault>

      <ProfilesContainer>
        {data.recommendedProfiles.map((profile, i) => {
          return (
            <Profile {...profile} key={i} href={`profile/${profile.id}`} />
          );
        })}
      </ProfilesContainer>
    </>
  );
};

export default Recommandations;

const ProfilesContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  // flexDirection: "column",
  gap: "1.5rem",
});
