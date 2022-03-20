import { ChangeEvent, useState } from "react";
import { H1 } from "@/components/Heading";
import { Avatar, AvatarImage } from "@/components/Avatar";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { Text } from "@/components/Text";
import { TextArea } from "@/components/TextArea";
import { createProfile } from "@/graphql/PROFILE";
import { styled } from "@/stitches.config";
import { IPFSClient } from "@/utils/ipfs";

const CreateSocialDAO = () => {
  const [uploadedImgData, setUploadedImgData] = useState<string | ArrayBuffer>(
    ""
  );
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

  const onCreateDAOClick = async () => {
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
    <>
      <H1 italic font="serif">
        Create Social DAO
      </H1>
      <Container>
        <TopContainer>
          <LeftBox>
            <AvatarBox>
              <label htmlFor="avatar-upload">
                <Avatar
                  css={{
                    width: "100px",
                    height: "100px",
                    margin: "2rem auto",
                    border: "1px solid grey",
                  }}>
                  <AvatarImage
                    as="div"
                    css={{
                      backgroundImage: `https://source.boringavatars.com/marble/25`,
                      objectFit: "cover",
                      backgroundSize: "cover",
                    }}
                  />
                </Avatar>

                <UploadInputContainer>
                  <UploadInput
                    id="avatar-upload"
                    type="file"
                    onChange={onFileUpload}
                  />

                  <Text>Upload DAO Avatar</Text>
                </UploadInputContainer>
              </label>
            </AvatarBox>
          </LeftBox>
          <RightBox>
            <TextArea
              placeholder="about this social dao"
              value={bio}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setBio(e.target.value)
              }
            />
          </RightBox>
        </TopContainer>

        <Box>
          <LineInput placeholder="dao name, like Metapysics" />
          {/* <LineInput placeholder="location (optional)" /> */}
          {/* <LineInput placeholder="website (optional)" /> */}
        </Box>

        <Box>
          <LineInput placeholder="dao owners wallet addresses, seperate each with comma, if you are the only one for now, enter your wallet address with no comma" />
        </Box>

        <Box css={{ height: "100%" }}>
          <LineInput placeholder="Add Constitution Page one" />
          <LineInput placeholder="Add Constitution Page two" />
          <LineInput placeholder="Add Constitution Page three" />
        </Box>

        <SubmitButton onClick={onCreateDAOClick}>
          Create Social DAO
        </SubmitButton>
      </Container>
    </>
  );
};

export default CreateSocialDAO;

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",

  outline: "1px solid grey",
  borderRadius: "20px",

  height: "70rem",

  marginTop: "5rem",
});

const TopContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",

  width: "100%",
  margin: "0 auto",
});

const LeftBox = styled("div", {
  border: "1px solid grey",
  borderTopLeftRadius: "20px",

  borderTop: 0,
  borderLeft: 0,
  borderRight: 0,

  width: "25%",
});
const RightBox = styled("div", {
  border: "1px solid grey",
  borderTop: 0,
  borderRight: 0,

  borderTopRightRadius: "20px",

  width: "75%",

  textarea: {
    width: "99%",
    border: 0,
  },
});

const AvatarBox = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "",
});

const UploadInputContainer = styled("div", {
  border: "1px solid grey",
  borderBottom: 0,
  borderLeft: 0,
  borderRight: 0,

  borderRadius: "0 0 20px 20px",

  marginTop: "4rem",
  flex: "1",

  textAlign: "center",

  'input[type="file"]': {
    display: "none",
  },
});

const UploadInput = styled(Input, {
  backgroundColor: "transparent",

  border: "1px solid grey",
  borderRadius: "0 0 20px 20px",
});

const Box = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid grey",

  div: {
    flex: 1,

    borderTop: 0,
    borderBottom: 0,

    input: {
      border: 0,
    },

    "&:first-child": {
      borderLeft: 0,
      borderRight: "1px solid grey !important",
    },

    "&:last-child": {
      borderRight: 0,
      borderLeft: "1px solid grey !important",
    },
  },
});

const LineInput = styled(Input, {
  border: "1px solid grey",
  borderRadius: 0,
  backgroundColor: "transparent",

  "&::placeholder": {
    fontFamily: "$sansSerif",
    fontStyle: "italic",
    fontSize: "1.6rem",
  },
});

const SubmitButton = styled("button", {
  backgroundColor: "transparent",
  border: "1px solid grey",

  borderLeft: 0,
  borderRight: 0,
  borderBottom: 0,

  borderRadius: "0 0 20px 20px",

  padding: "1.6rem 0",
  width: "100%",

  fontFamily: "$sansSerif",
  fontSize: "1.8rem",

  marginTop: "auto",
});
