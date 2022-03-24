import { H6 } from "../Heading";
import { apolloClient } from "@/apollo/client";
import { Avatar, AvatarImage } from "@/components/Avatar";
import { H1 } from "@/components/Heading";
import Input from "@/components/Input";
import { TextDefault } from "@/components/Text";
import { TextArea } from "@/components/TextArea";
import {
  createProfile,
  QUERY_PROFILE_BY_ID,
  updateProfile,
} from "@/graphql/PROFILE";
import { styled } from "@/stitches.config";
import { IPFSClient } from "@/utils/ipfs";
import { gql } from "@apollo/client";
import { useObservable, useStore } from "@/stores/index";
import { ChangeEvent, useEffect, useState } from "react";
import { AccountStore } from "@/stores/AccountStore";
import { toast } from "react-toastify";
import { SocialDAOStore } from "@/stores/SocialDaoStore";

const Settings = () => {
  const [uploadedImgData, setUploadedImgData] = useState<string | ArrayBuffer>(
    ""
  );

  const socialDAO = useStore(SocialDAOStore);
  const activeAccount = useObservable(socialDAO.currentDaoProfileInfo);

  const [formInput, setFormInput] = useState({
    handle: "",
    bio: "",
    location: "",
    website: "",
    twitterUrl: "",
  });

  const [uploadedImg, setUploadedImg] = useState(
    `https://source.boringavatars.com/marble/25/${formInput.handle || "deno"}`
  );

  useEffect(() => {
    if (activeAccount) {
      setFormInput({
        handle: activeAccount.handle,
        bio: activeAccount?.bio || "",
        location: activeAccount?.location || "",
        website: activeAccount?.website || "",
        twitterUrl: activeAccount?.twitterUrl || "",
      });

      console.log(activeAccount.picture.original.url);
      setUploadedImg(activeAccount.picture.original.url);
    }
  }, [activeAccount]);

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

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!uploadedImg || !formInput.handle) return;

    console.log(uploadedImg, formInput.handle);

    // const res = await createProfile({
    //   handle: formInput.handle,
    //   profilePictureUri: uploadedImg,
    //   followModule: {
    //     emptyFollowModule: true,
    //   },
    // });

    // console.log(res);

    // if (formInput.location || formInput.twitterUrl || formInput.website) {
    //   // toast.loading("Updating profile ...");

    try {
      //     const profileRes = await apolloClient.query({
      //       query: gql(QUERY_PROFILE_BY_ID),
      //       variables: {
      //         request: {
      //           handles: [formInput.handle],
      //           limit: 1,
      //         },
      //       },
      //     });

      //     console.log(profileRes);
      //     const profile = profileRes.data.profiles.items[0];

      //     if (!profile) {
      //       console.log("profile not found");
      //       return;
      //     }

      //     if (!activeAccount) {
      //       console.log("activeAccount not found");
      //       return;
      //     }

      const updatedProfile = await updateProfile({
        profileId: activeAccount?.id,
        name: activeAccount?.handle,

        bio: formInput.bio,
        location: formInput.location,
        twitterUrl: formInput.twitterUrl,
        website: formInput.website,
      });

      console.log(updatedProfile);

      toast.success("Profile updated succcessfully");
    } catch (err) {
      toast.error("Error updating profile");
    }
  };

  const onInputChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  return (
    <SettingsContainer>
      <H1 italic font="serif">
        Update your DAO
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
                    border: "1px solid #D3D3D3",
                  }}>
                  <AvatarImage
                    as="div"
                    css={{
                      backgroundImage: `url(${
                        uploadedImgData ||
                        `https://source.boringavatars.com/marble/25/${
                          formInput.handle || "deno"
                        }`
                      })`,
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

                  <TextDefault>Upload Avatar</TextDefault>
                </UploadInputContainer>
              </label>
            </AvatarBox>
          </LeftBox>
          <RightBox>
            <TextArea
              placeholder="I am an artist...."
              name="bio"
              value={formInput.bio}
              onChange={onInputChange}
              required
            />
          </RightBox>
        </TopContainer>

        <Box>
          <LineInput
            name="handle"
            value={formInput.handle}
            placeholder="your handle, like @deno"
            // onChange={onInputChange}
          />
          <LineInput
            name="location"
            value={formInput.location}
            placeholder="location (optional)"
            onChange={onInputChange}
          />
          <LineInput
            name="website"
            value={formInput.website}
            placeholder="website (optional)"
            onChange={onInputChange}
          />
        </Box>

        <Box>
          <LineInput
            name="twitterUrl"
            value={formInput.twitterUrl}
            placeholder="twitter Url (optional)"
            onChange={onInputChange}
          />
        </Box>

        <UpdateButton type="submit" onClick={onFormSubmit}>
          Propose Update DAO
        </UpdateButton>
      </Container>
    </SettingsContainer>
  );
};

export default Settings;

const SettingsContainer = styled("div", {
  marginTop: "5rem",
});

const Container = styled("form", {
  display: "flex",
  flexDirection: "column",

  outline: "1px solid grey",
  borderRadius: "20px",

  height: "fit-content",

  marginTop: "5rem",
});

const TopContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",

  width: "100%",
  margin: "0 auto",
});

const LeftBox = styled("div", {
  border: "1px solid #D3D3D3",
  borderTopLeftRadius: "20px",

  borderTop: 0,
  borderLeft: 0,
  borderRight: 0,

  width: "25%",
});
const RightBox = styled("div", {
  border: "1px solid #D3D3D3",
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
  border: "1px solid #D3D3D3",
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

  border: "1px solid #D3D3D3",
  borderRadius: "0 0 20px 20px",
});

const Box = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid #D3D3D3",

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
  border: "1px solid #D3D3D3",
  borderRadius: 0,
  backgroundColor: "transparent",
});

const UpdateButton = styled("button", {
  backgroundColor: "transparent",
  border: "1px solid #D3D3D3",

  borderLeft: 0,
  borderRight: 0,
  borderBottom: 0,

  borderRadius: "0 0 20px 20px",

  height: "5rem",
  width: "100%",

  fontFamily: "$sansSerif",
  fontSize: "1.8rem",

  marginTop: "auto",

  "&:hover": {
    cursor: "pointer",
  },
});

const NoBorderTextArea = styled(TextArea, {
  borderTop: 0,
  borderLeft: 0,
  borderBottom: 0,

  borderRadius: 0,

  borderRight: "1px solid grey",

  height: "35rem",

  "&:last-child": {
    borderRight: 0,
  },
});
