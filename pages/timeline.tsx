import { LineBox } from "@/components/LineBox";
import { styled } from "@/stitches.config";
import { ProfilesStore } from "@/stores/ProfilesStore";

import { gql, useQuery } from "@apollo/client";
import { LightSansSerifText, Text } from "@/components/Text";

import { H1, Heading } from "@/components/Heading";
import { day } from "@/utils/dayjs";
import { useObservable } from "@/stores";
import { QUERY_TIMELINE } from "@/graphql/TIMELINE";
import PostsContainer from "@/components/PostsContainer";

const Timeline = () => {
  const activeProfileId = useObservable(ProfilesStore.activeProfileId);

  const { data, loading } = useQuery(gql(QUERY_TIMELINE), {
    variables: {
      request: {
        profileId: activeProfileId,
        limit: 20,
      },
    },
  });

  if (loading || !data) {
    return <LightSansSerifText>loading...</LightSansSerifText>;
  }

  console.log(data);

  return (
    <Container>
      <H1 size="h1" as="h1" sansSerif italic>
        Collections
      </H1>
      <Text italic sansSerif size="lg" css={{ marginBottom: "2rem" }}>
        Collections shows what your peers are doing on lens protocol.
      </Text>

      <PostsContainer
        noHeader
        publications={data.timeline.items}
        css={{
          border: "none !important",
          borderTop: "1px solid $grey300 !important",
          borderRadius: 0,
        }}
      />

      {!data.timeline.items.length ? (
        <LightSansSerifText>
          Follow profiles you like, engage with peoples posts to get connections
          posts here :)
        </LightSansSerifText>
      ) : null}
    </Container>
  );
};

export default Timeline;

const Container = styled(LineBox, {
  padding: "2rem",
});
