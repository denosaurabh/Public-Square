import { styled } from "@/stitches.config";
import { useRouter } from "next/router";

import { Discussion } from "@/components/SocialDAO/Discussions";
import { TextDefault } from "@/components/Text";
import { Avatar, AvatarImage } from "@/components/Avatar";

const DiscussionPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <DiscussionContainer>
      {/* <Discussion /> */}

      <AllChats>
        <ChatBox />
        <ChatBox />
        <ChatBox />
        <ChatBox />
        <ChatBox />
      </AllChats>
    </DiscussionContainer>
  );
};

export default DiscussionPage;

const ChatBox: React.FC = () => {
  return (
    <ChatBoxStyled>
      <Avatar css={{ width: "25px", height: "25px" }}>
        <AvatarImage
          src={`https://source.boringavatars.com/marble/25/deno`}
          alt="deno"
        />
      </Avatar>

      <TextDefault>
        Hey, I will love to talk about Metaphysics, and let you you know what is
        it?
      </TextDefault>
    </ChatBoxStyled>
  );
};

const DiscussionContainer = styled("div", {
  width: "100%",
  margin: 0,
  // padding: 0
});

const AllChats = styled("div", {
  width: "100%",
  height: "100%",

  displauy: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "left",
  gap: "2rem",

  padding: "4rem",
});

const ChatBoxStyled = styled("div", {
  display: "flex",
  alignItems: "center",

  // backgroundColor: 'grey',
  // borderRadius: '14px',

  padding: "2rem 0.5rem",

  borderBottom: "1px solid grey",
});
