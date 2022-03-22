import { styled } from "@/stitches.config";
import { H3 } from "../Heading";
import { Text } from "../Text";

const Subjects: React.FC = () => {
  return (
    <SubjectsContainer>
      {[...Array(6)].map((_, i) => (
        <SubjectBox key={i}>
          <H3 font="serif" italic>
            Metaphysics
          </H3>
          <Text>
            The fundamental nature of reality, the first principles of being,
            identity and change, space and time, causality, necessity, and
            possibility.
          </Text>
        </SubjectBox>
      ))}
    </SubjectsContainer>
  );
};

export default Subjects;

const SubjectsContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",

  margin: "5rem 0",
});

const SubjectBox = styled("div", {
  width: "25rem",
  height: "25rem",

  padding: "2rem",

  border: "1px solid #D3D3D3",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  textAlign: "center",

  h3: {
    marginBottom: "1rem",
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
  },
});
