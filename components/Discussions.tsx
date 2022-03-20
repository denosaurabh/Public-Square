import { styled } from "@/stitches.config";
import { Avatar, AvatarGroup, AvatarImage } from "./Avatar";
import { H3, H6 } from "./Heading";
import { LightSansSerifText } from "./Text";

const Discussions: React.FC = () => {
  return (
    <DiscussionsContainer>
      {[...Array(6)].map((_, i) => (
        <DiscussionBox key={i}>
          <LightSansSerifText>1.</LightSansSerifText>
          <H3 font="serif" italic>
            Metaphysics
          </H3>

          <AvatarGroup gap="-0.5rem">
            {[...Array(Math.round(Math.random() * 10))].map((v, i) => (
              <Avatar key={i}>
                <AvatarImage
                  src={`https://source.boringavatars.com/marble/25/${i}`}
                  alt="deno"
                />
              </Avatar>
            ))}
          </AvatarGroup>

          <LightSansSerifText>+10 members</LightSansSerifText>
        </DiscussionBox>
      ))}

      <CreateDiscussionHeading as="a" href="/">
        Create your own discussion
      </CreateDiscussionHeading>
    </DiscussionsContainer>
  );
};

export default Discussions;

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
    backgroundColor: "#E7EBF9",
  },
});

const CreateDiscussionHeading = styled(H6, {
  color: "grey",
  textDecoration: "underline",
  fontStyle: "italic",

  margin: "4rem  auto",
});
