import { styled } from "@/stitches.config";
import { day } from "@/utils/dayjs";
import Link from "next/link";
import { Avatar, AvatarImage } from "./Avatar";
import Editor from "./Editor";
import { SmallText, TextDefault } from "./Text";

const Comment: React.FC = (props: any) => {
  const { profile, stats, metadata, id: postId, css, createdAt } = props;
  const { id, handle, picture } = profile;

  return (
    <CommentContainer css={css}>
      <Link href={`/post/${postId}`} passHref>
        <ContentContainer>
          {/* <Avatar>
          <AvatarImage
            src={
              picture?.original.url ||
              `https://source.boringavatars.com/marble/25/${handle}`
            }
            alt="deno"
          />
        </Avatar> */}

          <Editor
            readOnly
            value={metadata.content}
            css={{
              margin: 0,
              padding: 0,
            }}
          />
        </ContentContainer>
      </Link>

      <Link href={`/profile/${id}`} passHref>
        <Profile>
          <Avatar>
            <AvatarImage
              src={
                picture?.original.url ||
                `https://source.boringavatars.com/marble/25/${handle}`
              }
              alt="deno"
            />
          </Avatar>

          <TextDefault>
            {handle.length > 8 ? `${handle.slice(0, 8)}...` : handle}
          </TextDefault>
          {/* <SmallText css={{ marginLeft: "auto" }}>commented</SmallText> */}
          <SmallText css={{ marginLeft: "auto" }}>
            {day(createdAt).fromNow()}
          </SmallText>
        </Profile>
      </Link>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled("div", {
  width: "100%",
  height: "fit-content",

  paddingTop: "1rem",

  color: "$grey600",
  borderBottom: "1px solid $grey300",
});

const ContentContainer = styled("div", {
  borderRadius: "$500",

  padding: "0 1rem 1rem 2rem",

  display: "flex",
  alignItems: "center",
  gap: "1rem",

  "& .post-content-markdown": {
    fontSize: "1.5rem",
  },

  "&:hover": {
    cursor: "pointer",
  },
});

const Profile = styled("div", {
  display: "flex",
  alignItems: "center",

  padding: "1rem 2rem",
  paddingRight: 0,

  "&:hover": {
    cursor: "pointer",
  },
});
