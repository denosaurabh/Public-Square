import { styled } from "@/stitches.config";
import { useObservable } from "@/stores";
import { SocialDAOStore } from "@/stores/SocialDaoStore";
import Link from "next/link";
import { H3, Heading } from "../Heading";
import { LightSansSerifText, TextDefault } from "../Text";

const Subjects: React.FC = () => {
  // const socialDao = useStore(SocialDAOStore);
  const subjects = useObservable(SocialDAOStore.subjects);
  const currentDaoProfileInfo = useObservable(
    SocialDAOStore.currentDaoProfileInfo
  );

  return (
    <SubjectsContainer>
      {subjects ? (
        subjects.map((subject, i) => (
          <Link href={`/subject/${subject.id}`} key={i} passHref>
            <SubjectBox>
              <Heading as="h3" size="h1" sansSerif italic>
                {subject.metadata.name}
              </Heading>
              <TextDefault>{subject.metadata.description}</TextDefault>
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

  border: "1px solid $grey300",

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
