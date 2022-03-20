import { Avatar, AvatarGroup, AvatarImage } from "@/components/Avatar";
import { Button } from "@/components/Button";
import Follow from "@/components/follow";
import FollowPromises from "@/components/FollowPromises";
import { H1 } from "@/components/Heading";
import Post from "@/components/Post";
import SocialDAOTab from "@/components/SocialDaoTab";
import {
  LightSansSerifText,
  LinkSmallText,
  SemiBoldText,
  SmallText,
  Text,
} from "@/components/Text";
import { EXPLORE_PUBLICATIONS } from "@/graphql/DISCOVERY";
import { styled } from "@/stitches.config";
import { PostsContainer } from "@/style/post";
import { cleanUrl } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const SocialDAO = () => {
  let profileDataRes = {
    data: {
      profiles: {
        items: [
          {
            handle: "Science",
            bio: "Synthetic diamond is diamond produced in a technological process. Claims of diamond synthesis were documented between 1879 and 1928 but none have been confirmed. In the 1940s, research began in the United States, Sweden and the Soviet Union to grow diamond using chemical vapor deposition (CVD) and high-pressure high-temperature (HPHT) processes. The first reproducible synthesis was in 1953. CVD and HPHT still dominate the production of synthetic diamonds,",
            picture: null,
            id: "",
            followModule: [],
            ownedBy: "0x438E2EC928a5975113Da95E0114Cc3B075bA5aDC",
            website: "https://www.science.com",
            twitterUrl: "https://twitter.com/science",
            location: "",
          },
        ],
      },
    },
  };

  const { data } = profileDataRes;

  const {
    handle,
    bio,
    picture,
    id: profileId,
    followModule,
    ownedBy,
  } = data?.profiles.items[0];

  return (
    <Container>
      <TopContainer>
        <LeftBox>
          <Avatar
            css={{ width: "120px", height: "120px", marginBottom: "1rem" }}>
            <AvatarImage
              src={
                picture?.original.url ||
                `https://source.boringavatars.com/marble/25/${handle}`
              }
              alt="deno"
            />
          </Avatar>

          <AvatarGroup gap="-0.5rem">
            {[...Array(6)].map((v, i) => (
              <Avatar key={i}>
                <AvatarImage
                  src={`https://source.boringavatars.com/marble/25/${i}`}
                  alt="deno"
                />
              </Avatar>
            ))}
          </AvatarGroup>
          <LightSansSerifText css={{ width: "100%" }}>
            +1.2m members...
          </LightSansSerifText>
        </LeftBox>
        <CenterBox>
          <H1>{handle}</H1>

          {bio ? (
            <Text css={{ margin: 0 }}>{bio}</Text>
          ) : (
            <Text font="sansSerif">no bio....</Text>
          )}

          <ButtonsContainer>
            <Follow
              profileId={profileId}
              followerAddress={ownedBy}
              followModule={followModule}
            />
            <Button>Join</Button>
            <ConstitutionText as="a" href="/">
              Constitution
            </ConstitutionText>
          </ButtonsContainer>
        </CenterBox>
      </TopContainer>

      <SocialDAOTab />
    </Container>
  );
};

export default SocialDAO;

const Container = styled("div", { marginTop: "5rem" });

const TopContainer = styled("div", {
  display: "flex",
  gap: "4rem",

  width: "80%",
  margin: "0 auto",
});

const LeftBox = styled("div", {});
const CenterBox = styled("div", {});

const ButtonsContainer = styled("div", {
  display: "flex",
  gap: "1rem",

  marginTop: "2rem",
});

const ConstitutionText = styled(Text, "a", {
  fontFamily: "$sansSerif",
  fontWeight: "700",
  fontStyle: "italic",
  fontSize: "2rem",

  marginLeft: "auto",
});
