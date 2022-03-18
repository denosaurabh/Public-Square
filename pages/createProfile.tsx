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

const CreateProfile = () => {
  const [uploadedImgData, setUploadedImgData] = useState("");
  const [uploadedImg, setUploadedImg] = useState("");

  const [handle, setHandle] = useState("");
  const [bio, setBio] = useState("");

  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const reader = new FileReader();

    reader.addEventListener("load", async () => {
      const uploaded_image = reader.result;

      if (uploaded_image) {
        const res = await IPFSClient.add(uploaded_image);
        console.log(res);
        setUploadedImgData(uploaded_image);

        const url = `https://ipfs.infura.io/ipfs/${res.path}`;
        setUploadedImg(url);
      }
    });

    reader.readAsDataURL(e.target.files[0]);
  };

  const onCreateProfileClick = async () => {
    if (!uploadedImg || !handle) return;

    console.log(uploadedImg, handle);

    const res = await createProfile({
      handle,
      profilePictureUri: uploadedImg,
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
            <label htmlFor="avatar-upload">
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
            </label>

            <Input id="avatar-upload" type="file" onChange={onFileUpload} />
            <Input
              type="name"
              placeHolder="@handle"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            />

            <Button onClick={onCreateProfileClick}>Create</Button>
          </LeftBox>
          <RightBox>
            <Input
              type="name"
              placeHolder="I am an artist...."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </RightBox>
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
