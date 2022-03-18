import { Avatar, AvatarImage } from "@/components/Avatar";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Post from "@/components/Post";
import { SemiBoldText, Text } from "@/components/Text";
import { createProfile } from "@/graphql/PROFILE";
import PageContainer from "@/layouts/PageContainer";
import { styled } from "@/stitches.config";
import { IPFSClient } from "@/utils/ipfs";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CreateProfile = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const onCreatePostClick = async () => {
    if (!content || !name) return;

    const res = await createProfile({
      handle: name,
      followModule: {
        emptyFollowModule: true,
      },
    });

    console.log(res);
  };

  return (
    <PageContainer>
      <Container>
        <TopContainer>
          <LeftBox>
            {/* <label htmlFor="avatar-upload">
              <Avatar css={{ width: "100px", height: "100px" }}>
                <AvatarImage
                  as="div"
                  css={{
                    backgroundImage: `url(${
                      uploadedImgData || "/img/dinosaur.png"
                    })`,
                    objectFit: "cover",
                    backgroundSize: "cover",
                  }}
                />
              </Avatar>
            </label> */}

            {/* <Input id="avatar-upload" type="file" onChange={onFileUpload} /> */}
            {/* <Input
              type="name"
              placeHolder="@handle"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /> */}
            <Input
              type="name"
              placeHolder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              placeHolder="I am an artist...."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <MarkDownContainer>
              <ReactMarkdown
                className="post-content-markdown"
                remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </MarkDownContainer>
            <Button onClick={onCreatePostClick}>Create Post</Button>
          </LeftBox>
        </TopContainer>
      </Container>
    </PageContainer>
  );
};

export default CreateProfile;

const Container = styled("div", { marginTop: "5rem" });

const TopContainer = styled("div", {
  display: "flex",
  gap: "2rem",

  width: "80%",
  margin: "0 auto",
});

const LeftBox = styled("div", {});
const RightBox = styled("div", {});

const MarkDownContainer = styled("div", {
  margin: "4rem 0",

  "& .post-content-markdown": {
    fontSize: "1.5rem",
  },
});
