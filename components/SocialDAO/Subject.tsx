import { styled } from "@/stitches.config";
import { useStore, useObservable } from "@/stores";
import { SocialDAOStore } from "@/stores/SocialDaoStore";
import Link from "next/link";
import { H3 } from "../Heading";
import { LightSansSerifText, Text } from "../Text";

const Subjects: React.FC = () => {
  const socialDao = useStore(SocialDAOStore);
  const subjects = useObservable(socialDao.subjects);

  return (
    <SubjectsContainer>
      {subjects ? (
        subjects.map((subject, i) => (
          <Link href={`/post/${subject.id}`} key={i} passHref>
            <SubjectBox>
              <H3 font="serif" italic>
                {subject.metadata.name}
              </H3>
              <Text>{subject.metadata.description}</Text>
            </SubjectBox>
          </Link>
        ))
      ) : (
        <LightSansSerifText>loading....</LightSansSerifText>
      )}

      {!subjects.length ? (
        <LightSansSerifText>No Subjects</LightSansSerifText>
      ) : null}
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
  textDecoration: "none",

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