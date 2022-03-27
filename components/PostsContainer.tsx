import { styled } from "@/stitches.config";
import { SettingsStore } from "@/stores/SettingsStore";
import { chunkify, sliceIntoChunks } from "@/utils";
import { useObservable } from "@/stores";
import { LineBox } from "./LineBox";
import Post from "./Post";
import Tag from "./Tag";
import { LightSansSerifText, Text } from "./Text";
import { now } from "@/utils/dayjs";
import Comment from "@/components/Comment";

interface PostsContainerProps {
  publications: object[];
  noHeader?: boolean;
  showStats?: boolean;
  css?: Record<string, any>;
}

const PostsContainer: React.FC<PostsContainerProps> = ({
  publications,
  noHeader,
  showStats,
  css,
}) => {
  const noOfColumns = useObservable(SettingsStore.publicationsContainerColumns);

  if (!publications.length) {
    return <LightSansSerifText>No Posts....</LightSansSerifText>;
  }

  const pubsArr = chunkify(publications, noOfColumns, true);
  console.log(pubsArr);

  return (
    <AllPostsContainer css={css}>
      {!noHeader && (
        <>
          <TopContainer>
            <Tag>Quote of the day</Tag>

            <Text size="md" italic sansSerif undeline>
              {now}
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

      <ContentContainer
        css={{
          // width: "100%",
          // overflowX: "hidden",
          gridTemplateColumns: `repeat(${noOfColumns}, 1fr)`,
        }}>
        {pubsArr.map((pubs, i) => {
          return (
            <Posts key={i} css={{ maxWidth: "100%", overflow: "hidden" }}>
              {pubs.map((pub) => {
                if (pub.__typename === "Post") {
                  return <Post {...pub} key={pub.id} />;
                } else if (pub.__typename === "Comment") {
                  return <Comment {...pub} key={pub.id} />;
                } else {
                  return <Post {...pub} key={pub.id} />;
                }
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
