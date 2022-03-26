import { H1 } from "@/components/Heading";
import { LineBox } from "@/components/LineBox";
import { LightSansSerifText, Text } from "@/components/Text";
import { QEURY_PING, STATUS } from "@/graphql/STATUS";
import { styled } from "@/stitches.config";
import { gql, useQuery } from "@apollo/client";

const Status = () => {
  const { data: statusData, loading: statusLoading } = useQuery(gql(STATUS));
  const { data: pingData, loading: pingLoading } = useQuery(gql(QEURY_PING));

  console.log(statusData, pingData);

  if (statusLoading || pingLoading || !statusData || !pingData) {
    return <LightSansSerifText>Loading....</LightSansSerifText>;
  }

  return (
    <Container>
      <Flex>
        <H1 sansSerif italic>
          Operations:
        </H1>
        <StatusCircle ok={pingData.ping === "pong"} />
        {pingData.ping === "pong" ? (
          <Text size="lg">working smoothly</Text>
        ) : (
          <Text size="lg">Down</Text>
        )}
      </Flex>

      <Flex css={{ marginBottom: "2rem" }}>
        <H1 sansSerif italic>
          All Time Status:
        </H1>
      </Flex>

      <Wrap>
        {Object.keys(statusData.globalProtocolStats).map((key, i) => {
          if (key === "__typename") return;

          if (
            typeof statusData.globalProtocolStats[key] === "number" ||
            typeof statusData.globalProtocolStats[key] === "string"
          ) {
            return (
              <StatusBox>
                <Text size="lg">{key}</Text>

                <H1
                  sansSerif
                  italic
                  size="h1"
                  as="h2"
                  css={{ margin: "1rem 0" }}>
                  {statusData.globalProtocolStats[key]}
                </H1>
              </StatusBox>
            );
          }
        })}
      </Wrap>

      <H1 sansSerif italic>
        Revenue:
      </H1>
      <Wrap>
        {statusData.globalProtocolStats["totalRevenue"].map(
          ({ asset, value }, i) => {
            return (
              <StatusBox key={i}>
                <Text size="lg">{asset.symbol}</Text>

                <H1
                  sansSerif
                  italic
                  size="h1"
                  as="h2"
                  css={{ margin: "1rem 0" }}>
                  {value}
                </H1>
              </StatusBox>
            );
          }
        )}
      </Wrap>

      {/* <Text size="lg">I love lens protocol</Text> */}
    </Container>
  );
};

export default Status;

const Container = styled(LineBox, {
  padding: "2rem",
});

const Flex = styled("div", {
  display: "flex",
  gap: "2rem",

  alignItems: "center",

  marginBottom: "4rem",
});

const Wrap = styled(Flex, {
  flexWrap: "wrap",
  gap: "1rem",

  alignItems: "flex-start",

  marginBottom: "4rem",
});

const StatusBox = styled(LineBox, {
  borderRadius: "$500",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",

  padding: "2rem",

  width: "20rem",
  height: "20rem",
});

const StatusCircle = styled("div", {
  width: "3rem",
  height: "3rem",

  borderRadius: "1000px",

  variants: {
    ok: {
      true: {
        backgroundColor: "hsl(151, 55.0%, 41.5%)",
      },
      false: {
        backgroundColor: "#ebbc00",
      },
    },
  },
});
