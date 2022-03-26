import { styled } from "@/stitches.config";
import { smallAddress } from "@/utils";
import Link from "next/link";
import { Avatar, AvatarGroup, AvatarImage } from "./Avatar";
import { H3, H6, Heading } from "./Heading";
import { LightSansSerifText, Text, TextDefault } from "./Text";

interface Profile {
  handle: string;
  picture: { original: { url: string } };
  bio: string;
  id: string;
  ownedBy: string;
  stats: {
    totalFollowers: number;
    totalPublications: number;
    totalMirrors: number;
    totalCollects: number;
  };
  href?: string;
}

interface ProfileProps {
  profiles: Profile[];
  ownedBy: string;
}

const AddressProfile: React.FC<ProfileProps> = ({ profiles, ownedBy }) => {
  return (
    <Link href={`/address/${ownedBy}`} passHref>
      <ProfileBox>
        <H3 as="h5" size="h5">
          {smallAddress(ownedBy, 6)}
        </H3>

        <AvatarGroup gap="-0.5rem">
          {profiles.map((profile: Profile, i) => (
            <AvatarBox key={i}>
              <Avatar
                css={{
                  width: "30px",
                  height: "30px",

                  transition: "all 150ms",

                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}>
                <AvatarImage
                  css={{
                    objectFit: "fill",
                  }}
                  src={
                    profile?.picture?.original.url ||
                    `https://source.boringavatars.com/marble/25/${profile.handle}`
                  }
                  alt="deno"
                />
              </Avatar>
            </AvatarBox>
          ))}
        </AvatarGroup>

        <Text size="md" css={{ marginTop: "1rem" }}>
          {profiles.length} profile{profiles.length === 1 ? "" : "s"}
        </Text>
      </ProfileBox>
    </Link>
  );
};

export default AddressProfile;

const ProfileBox = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  border: "1px solid $grey300",
  borderRadius: "14px",

  width: "30rem",
  minHeight: "16rem",

  padding: "1rem",

  // padding: "2rem 1rem 1rem 1rem",

  img: {
    width: "100%",
    height: "9rem",
  },

  "&:hover": {
    cursor: "pointer",
  },
});

const TopContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  textAlign: "center",

  width: "100%",
  margin: "0",

  borderBottom: "1px solid $grey300",
});

const AvatarBox = styled("div", {});

const Box = styled("div", {
  display: "flex",

  p: {
    fontSize: "1.5rem",
    borderRight: "1px solid $grey300",

    span: {
      fontSize: "1.3rem",
    },
  },
});

const LineText = styled(TextDefault, {
  margin: 0,
  padding: "0.8rem 2rem",

  borderBottom: "1px solid $grey300",

  width: "100%",

  span: {
    fontWeight: 500,
  },
});
