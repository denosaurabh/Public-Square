import Link from "next/link";

import { LineBox } from "@/components/LineBox";
import Tag from "@/components/Tag";
import { styled } from "@/stitches.config";
import { Text } from "@/components/Text";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/Button";

const LandingPage: React.FC = () => {
  return (
    <Container>
      <TopBox>
        <Tag css={{ fontSize: "$md" }}>
          Proposal by{" "}
          <Link href="https://denosaurabh.me" passHref>
            <a target="_blank">denosaurabh</a>
          </Link>
        </Tag>

        <Text>Posted on 27 March 2022</Text>
      </TopBox>
      <CenterBox>
        <Heading as="h1" size="xxl" weight="bold" sansSerif italic>
          Public Square
        </Heading>
        <Text
          as="span"
          size="md"
          css={{ color: "$grey400", marginTop: "2rem" }}>
          ημόσια Πλατεία / Dimósia Plateía
        </Text>
        <Heading
          as="h3"
          size="h1"
          weight="bold"
          sansSerif
          italic
          css={{ color: "$grey400" }}>
          Bond of Science, Art and Modern Philosophy
        </Heading>

        <Link href="/create/profile" passHref>
          <Button css={{ marginTop: "2rem" }}>Join this Community</Button>
        </Link>
      </CenterBox>

      <Space>
        <Heading
          as="h3"
          size="h1"
          weight="bold"
          sansSerif
          italic
          css={{ color: "$grey400", marginTop: "3rem" }}>
          An Interconnection between
        </Heading>
        <Heading as="h1" size="xxl" weight="bold" sansSerif italic>
          Thinkers
        </Heading>
        <Heading as="h1" size="xxl" weight="bold" sansSerif italic>
          Engineers
        </Heading>
        <Heading as="h1" size="xxl" weight="bold" sansSerif italic>
          Designers
        </Heading>
        <Heading
          as="h3"
          size="h1"
          weight="bold"
          sansSerif
          italic
          css={{ color: "$grey400" }}>
          to make a better world
        </Heading>
      </Space>

      {/* <Text>We know thw current state of social media</Text> */}
    </Container>
  );
};

export default LandingPage;

const Container = styled(LineBox, {
  height: "100%",
  minHeight: "100vh",

  padding: "1rem",

  borderRadius: "$500",
});

const TopBox = styled("div", {
  width: "100%",

  display: "flex",
  justifyContent: "space-between",
});

const CenterBox = styled("div", {
  width: "100%",
  height: "50rem",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",

  gap: "2rem",

  textAlign: "center",
});

const Space = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  gap: "6rem",
});
