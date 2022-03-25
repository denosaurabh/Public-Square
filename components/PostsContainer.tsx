import { styled } from "@/stitches.config";
import { chunkify, sliceIntoChunks } from "@/utils";
import { LineBox } from "./LineBox";
import Post from "./Post";
import Tag from "./Tag";
import { Text } from "./Text";

interface PostsContainerProps {
  publications: object[];
  noHeader?: boolean;
  showStats?: boolean;
}

const PostsContainer: React.FC<PostsContainerProps> = ({
  publications,
  noHeader,
  showStats,
}) => {
  if (!publications.length) return <></>;

  const pubsArr = chunkify(publications, 2, true);
  console.log(pubsArr);

  return (
    <AllPostsContainer>
      {!noHeader && (
        <>
          <TopContainer>
            <Tag>Quote of the day</Tag>

            <Text size="md" italic sansSerif undeline>
              12 noon monday, 27 March 2022
            </Text>
          </TopContainer>
          <Text
            italic
            sansSerif
            size="lg"
            css={{
              padding: "3rem 0",
              borderBottom: "1px solid $grey300",
            }}>
            “Every science begins as philosophy and ends as art; it arises in
            hypothesis and flows into achievement.” - Durant
          </Text>
        </>
      )}

      <ContentContainer>
        {pubsArr.map((pubs, i) => {
          return (
            <Posts key={i}>
              {pubs.map((pub) => {
                return <Post {...pub} key={pub.id} />;
              })}
              );
            </Posts>
          );
        })}
      </ContentContainer>
    </AllPostsContainer>
  );
};

export default PostsContainer;

const AllPostsContainer = styled(LineBox, {
  width: "100%",

  minHeight: "100%",
  height: "100%",

  borderRadius: "$500",

  padding: "1rem",
});

const TopContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const ContentContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",

  height: "fit-content",
});

const Posts = styled("div", {
  padding: "1rem 0.5rem",

  minHeight: "100%",
  height: "100%",

  borderRight: "1px solid $grey300",

  "&:last-child": {
    borderRight: "0",
  },
});
