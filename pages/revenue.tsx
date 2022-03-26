import { LineBox } from "@/components/LineBox";
import { styled } from "@/stitches.config";
import { ProfilesStore } from "@/stores/ProfilesStore";

import { gql, useQuery } from "@apollo/client";
import { QUERY_REVENUE } from "@/graphql/REVENUE";
import { LightSansSerifText, Text } from "@/components/Text";

import { H1, Heading } from "@/components/Heading";
import { day } from "@/utils/dayjs";
import { useObservable } from "@/stores";

const Revenue = () => {
  const activeProfileId = useObservable(ProfilesStore.activeProfileId);

  const { data, loading } = useQuery(gql(QUERY_REVENUE), {
    variables: {
      request: {
        profileId: activeProfileId,
      },
    },
  });

  if (loading || !data) {
    return <LightSansSerifText>loading...</LightSansSerifText>;
  }

  console.log(data);

  return (
    <Container>
      <H1 size="h1" as="h1">
        Revenue
      </H1>
      <Text italic sansSerif size="md" css={{ marginBottom: "2rem" }}>
        Here you can see all the revenue you have by your Posts throughout all
        profiles on lens protocol.
      </Text>

      <EaringsContainer>
        {data?.profileRevenue
          ? data.profileRevenue.items.map((item, i) => (
              <PublicationEarningBox key={i}>
                <H1 as="h1" size="h1" sansSerif italic>
                  {item.publication.metadata.name}
                </H1>

                <Text
                  size="xl"
                  fontWeight="600"
                  css={{
                    span: {
                      fontSize: "$sm",
                      color: "$grey500",
                      marginLeft: "1rem",
                    },
                  }}>
                  {item.earnings.value}

                  <span>{item.earnings.asset.symbol}</span>
                </Text>
              </PublicationEarningBox>
            ))
          : null}

        {!data.profileRevenue.items.length ? (
          <LightSansSerifText>no revenue from posts</LightSansSerifText>
        ) : null}
      </EaringsContainer>
    </Container>
  );
};

export default Revenue;

const Container = styled(LineBox, {
  padding: "2rem",
});

const EaringsContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",

  gap: "2rem",
});

const PublicationEarningBox = styled(LineBox, {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  padding: "2rem",

  width: "25rem",
  minHeight: "25rem",

  height: "fit-content",
});
