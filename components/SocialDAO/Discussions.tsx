import { styled } from "@/stitches.config";
import { useObservable } from "@/stores";
import { SocialDAOStore } from "@/stores/SocialDaoStore";
import Link from "next/link";
import { Avatar, AvatarGroup, AvatarImage } from "../Avatar";
import { H3, H6, Heading } from "../Heading";
import { LightSansSerifText } from "../Text";

const Discussions: React.FC = () => {
  // const socialDao = useStore(SocialDAOStore);
  const discussions = useObservable(SocialDAOStore.discussions);

  return (
    <DiscussionsContainer>
      {discussions ? (
        discussions.map((el, i) => <Discussion no={i + 1} {...el} key={i} />)
      ) : (
        <LightSansSerifText>loading...</LightSansSerifText>
      )}
      {!discussions.length ? (
        <LightSansSerifText>No Discussions</LightSansSerifText>
      ) : null}

      {/* <CreateDiscussionHeading>
        Create your own discussion
      </CreateDiscussionHeading>*/}
    </DiscussionsContainer>
  );
};

export default Discussions;

interface DiscussionProps {
  id: string;
  metadata: Record<string, any>;
  no: string;
}

export const Discussion: React.FC<DiscussionProps> = ({ id, metadata, no }) => {
  return (
    <Link href={`/discussion/${id}`} passHref>
      <DiscussionBox>
        <LightSansSerifText>{no}.</LightSansSerifText>
        <Heading as="h3" size="h1" sansSerif italic>
          {metadata.name}
        </Heading>

        {/* <AvatarGroup gap="-0.5rem">
          {[...Array(Math.round(Math.random() * 10))].map((v, i: number) => (
            <Avatar key={i}>
              <AvatarImage
                src={`https://source.boringavatars.com/marble/25/${i}`}
                alt="deno"
              />
            </Avatar>
          ))}
        </AvatarGroup>

        <LightSansSerifText>+10 members</LightSansSerifText> */}
      </DiscussionBox>
    </Link>
  );
};

const DiscussionsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",

  margin: "5rem 0",
});

const DiscussionBox = styled("div", {
  width: "80%",
  height: "fit-content",

  padding: "2rem",
  margin: "0 auto",

  borderRadius: "14px",

  display: "flex",
  alignItems: "center",
  gap: "0.5rem",

  textAlign: "center",

  textDecoration: "none",

  h3: {
    marginRight: "auto",
  },

  p: {
    color: "grey",
  },

  "&:first-child": {
    borderTopLeftRadius: "20px !important",
  },

  "&:last-child": {
    borderBottomRightRadius: "20px !important",
  },

  "&:hover": {
    cursor: "pointer",
    backgroundColor: "$grey300",
  },
});

const CreateDiscussionHeading = styled(H6, {
  color: "grey",
  textDecoration: "underline",
  fontStyle: "italic",

  margin: "4rem  auto",
});
