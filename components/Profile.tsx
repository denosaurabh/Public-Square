import { styled } from "@/stitches.config";
import { smallAddress } from "@/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { Avatar, AvatarGroup } from "./Avatar";
import { H6 } from "./Heading";
import { LightSansSerifText, Text } from "./Text";

interface ProfileProps {
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
}

const Profile: React.FC<ProfileProps> = ({
  handle,
  picture,
  bio,
  id,
  ownedBy,
  stats,
}) => {
  return (
    <Link href={`/social/${handle}`}>
      <ProfileBox>
        <TopContainer>
          <AvatarBox>
            <Avatar css={{ width: "120px", height: "120px" }}>
              <AvatarImage
                src={
                  picture?.original.url ||
                  `https://source.boringavatars.com/marble/25/${handle}`
                }
                alt="deno"
              />
            </Avatar>
          </AvatarBox>
          <RightBox>
            {/* <AvatarGroup>{}</AvatarGroup> */}
            <H6>{handle}</H6>
            <Text>{id}</Text>
          </RightBox>
        </TopContainer>
        <LineText>
          <span>owned by: </span> {smallAddress(ownedBy, 6)}
        </LineText>
        {bio ? (
          <LineText>{bio}</LineText>
        ) : (
          <LineText as={LightSansSerifText}>no bio...</LineText>
        )}

        <Box>
          <LineText>
            <span>Total Followers:</span> {stats.totalFollowers}
          </LineText>
          <LineText>
            <span>Total Posts:</span> {stats.totalPublications}
          </LineText>
        </Box>
        <Box>
          <LineText>
            <span>Total Mirrors:</span> {stats.totalMirrors}
          </LineText>
          <LineText>
            <span>Total Collects:</span> {stats.totalCollects}
          </LineText>
        </Box>
      </ProfileBox>
    </Link>
  );
};

export default Profile;

const ProfileBox = styled("div", {
  display: "flex",
  flexDirection: "column",

  border: "1px solid #D3D3D3",
  borderRadius: "14px",

  width: "30rem",
  minHeight: "30rem",

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

  width: "100%",
  margin: "0",

  borderBottom: "1px solid #D3D3D3",
});

const RightBox = styled("div", {
  width: "100%",
  height: "100%",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "0.6rem",

  h6: {
    fontWeight: 500,
    margin: 0,
    padding: 0,
  },

  p: {
    margin: 0,
    padding: 0,
  },
});

const AvatarBox = styled("div", {});

const Box = styled("div", {
  display: "flex",

  p: {
    fontSize: "1.5rem",
    borderRight: "1px solid #D3D3D3",

    span: {
      fontSize: "1.3rem",
    },
  },
});

const LineText = styled(Text, {
  margin: 0,
  padding: "0.8rem 2rem",

  borderBottom: "1px solid #D3D3D3",

  width: "100%",

  span: {
    fontWeight: 500,
  },
});
