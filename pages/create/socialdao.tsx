import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { H1 } from "@/components/Heading";
import { Avatar, AvatarImage } from "@/components/Avatar";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { TextDefault } from "@/components/Text";
import { TextArea } from "@/components/TextArea";
import { createProfile } from "@/graphql/PROFILE";
import { styled } from "@/stitches.config";
import { IPFSClient } from "@/utils/ipfs";
import { SuperDenoDAOStore } from "@/stores/SuperDenoDAOStore";
// import { useStore } from "@/stores";

const CreateSocialDAO = () => {
  const [uploadedImgData, setUploadedImgData] = useState<string | ArrayBuffer>(
    ""
  );
  const [uploadedImg, setUploadedImg] = useState("");
  const [formInput, setFormInput] = useState({
    name: "",
    about: "",
    owners: "",
    constitutionOne: "",
    constitutionTwo: "",
    constitutionThree: "",
  });

  // const socialDaoStore = useStore(SuperDenoDAOStore);

  const onInputChangeEvent = (e: ChangeEvent<Element>) => {
    e.preventDefault();

    const { name, value } = e.target;

    if (name === "name") {
      setUploadedImg(
        `https://source.boringavatars.com/marble/25/${value || "deno"}`
      );
    }

    setFormInput({ ...formInput, [name]: value });
  };

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

  const onFormSubmit = async (e: FormEvent<HTMLFormElement> | SubmitEvent) => {
    e.preventDefault();

    console.log(formInput);

    // socialDaoStore.socialDaoTransactions();
    // return;

    await SuperDenoDAOStore.createSocialDAO({
      ...formInput,
      uploadedImgUrl: uploadedImg,
    });
  };

  return (
    <>
      <H1 italic sansSerif>
        Create Social DAO
      </H1>
      <Container onSubmit={onFormSubmit}>
        <TopContainer>
          <LeftBox>
            <AvatarBox>
              <label htmlFor="avatar-upload">
                <Avatar
                  css={{
                    width: "100px",
                    height: "100px",
                    margin: "2rem auto",
                    border: "1px solid $grey300",
                  }}>
                  <AvatarImage
                    // as="div"
                    src={
                      uploadedImg ||
                      `https://source.boringavatars.com/marble/25/${
                        formInput.name || "deno"
                      }`
                    }
                    alt="deno"
                    // css={{
                    //   // backgroundImage:
                    //   //  !important`,
                    //   objectFit: "cover",
                    //   backgroundSize: "cover",
                    // }}
                  />
                </Avatar>

                <UploadInputContainer>
                  <UploadInput
                    id="avatar-upload"
                    type="file"
                    onChange={onFileUpload}
                  />

                  <TextDefault>Upload DAO Avatar</TextDefault>
                </UploadInputContainer>
              </label>
            </AvatarBox>
          </LeftBox>
          <RightBox>
            <TextArea
              placeholder="about this social dao"
              name="about"
              value={formInput.about}
              onChange={onInputChangeEvent}
              required
            />
          </RightBox>
        </TopContainer>

        <Box>
          <LineInput
            name="name"
            placeholder="name of this social dao, like Metaphysics"
            value={formInput.name}
            onChange={onInputChangeEvent}
            required
          />
        </Box>

        <Box>
          <LineInput
            name="owners"
            value={formInput.owners}
            onChange={onInputChangeEvent}
            placeholder="dao owners wallet addresses, seperate each with comma, if you are the only one for now, enter your wallet address with no comma"
            required
          />
        </Box>

        <Box css={{ height: "100%" }}>
          <LineTextArea
            placeholder="Add Constitution Page one"
            name="constitutionOne"
            value={formInput.constitutionOne}
            onChange={onInputChangeEvent}
            required
          />
          <LineTextArea
            placeholder="Add Constitution Page two"
            name="constitutionTwo"
            value={formInput.constitutionTwo}
            onChange={onInputChangeEvent}
            required
          />
          <LineTextArea
            placeholder="Add Constitution Page three"
            name="constitutionThree"
            value={formInput.constitutionThree}
            onChange={onInputChangeEvent}
            required
          />
        </Box>

        <SubmitButton type="submit" onClick={onFormSubmit}>
          Create Social DAO
        </SubmitButton>
      </Container>
    </>
  );
};

export default CreateSocialDAO;

const Container = styled("form", {
  display: "flex",
  flexDirection: "column",

  outline: "1px solid $grey300",
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
  border: "1px solid $grey300",
  borderTopLeftRadius: "20px",

  borderTop: 0,
  borderLeft: 0,
  borderRight: 0,

  width: "25%",
});
const RightBox = styled("div", {
  border: "1px solid $grey300",
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
  border: "1px solid $grey300",
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

  border: "1px solid $grey300",
  borderRadius: "0 0 20px 20px",
});

const Box = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid $grey300",

  div: {
    flex: 1,

    borderTop: 0,
    borderBottom: 0,

    input: {
      border: 0,
    },

    "&:first-child": {
      borderLeft: 0,
      borderRight: "1px solid $grey300 !important",
    },

    "&:last-child": {
      borderRight: 0,
      borderLeft: "1px solid $grey300 !important",
    },
  },
});

const LineInput = styled(Input, {
  border: "1px solid $grey300",
  borderRadius: 0,
  backgroundColor: "transparent",

  "&::placeholder": {
    fontFamily: "$sansSerif",
    fontStyle: "italic",
    fontSize: "1.6rem",
  },
});

const LineTextArea = styled(TextArea, {
  border: 0,
  borderRadius: 0,
  borderBottom: 0,

  backgroundColor: "transparent",

  "&:first-child": {
    borderLeft: 0,
    borderRight: "1px solid $grey300 !important",
  },

  "&:last-child": {
    borderRight: 0,
    borderLeft: "1px solid $grey300 !important",
  },

  height: "100%",
});

const SubmitButton = styled("button", {
  backgroundColor: "transparent",
  border: "1px solid $grey300",

  color: "$grey600",

  borderLeft: 0,
  borderRight: 0,
  borderBottom: 0,

  borderRadius: "0 0 20px 20px",

  padding: "1.6rem 0",
  width: "100%",

  fontFamily: "$sansSerif",
  fontSize: "1.8rem",

  marginTop: "auto",

  "&:hover": {
    cursor: "pointer",
  },
});
