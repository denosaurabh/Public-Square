import Link from "next/link";

import { LineBox } from "@/components/LineBox";
import Tag from "@/components/Tag";
import { styled } from "@/stitches.config";
import { Text } from "@/components/Text";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/Button";
import Gradient from "@/components/Gradient";
import { Separator } from "@/components/Seperator";

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
        <Logo
          css={{ width: "160px", height: "auto", marginTop: "5rem" }}
          src="/img/logo.svg"
          alt="Bond logo"
        />

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

        <Text size="lg" css={{ margin: "2rem 0" }}>
          Uniting Engineers, Designers & Thinkers
        </Text>
      </CenterBox>

      <Separator css={{ margin: "6rem auto !important", maxWidth: "90%" }} />

      <Space css={{ marginTop: "2rem" }}>
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

        <Image
          src="/img/bond.webp"
          alt="bond between Thinkers, Artists and Enginners"
        />

        {/* <Text sansSerif size="lg" width="80%">
          We live in such digital space where, 
        </Text> */}
      </Space>

      {/* <Gradient /> */}

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

const Image = styled("img", {
  width: "100%",
  height: "auto",

  objectFit: "cover",
});

const Logo = styled(Image, {
  stroke: "$grey600 !important",

  svg: {
    stroke: "$grey600 !important",
    fill: "$grey600 !important",
  },
});
