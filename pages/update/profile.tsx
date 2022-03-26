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
import { ProfilesStore } from "@/stores/ProfilesStore";
import { toast } from "react-toastify";
import { ModuleSelect } from "@/components/ModuleSelect";
import { FOLLOW_MODULES } from "@/contratcts";
import { compareAddress } from "@/utils";
import useUpdateFollowModule from "@/hooks/useUpdateFollowModule";

const UpdateProfile = () => {
  const [uploadedImgData, setUploadedImgData] = useState<string | ArrayBuffer>(
    ""
  );

  const activeAccount = useObservable(ProfilesStore.activeProfile);

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

    if (
      formInput.location ||
      formInput.twitterUrl ||
      formInput.website ||
      formInput.bio
    ) {
      // toast.loading("Updating profile ...");

      try {
        const profileRes = await apolloClient.query({
          query: gql(QUERY_PROFILE_BY_ID),
          variables: {
            request: {
              handles: [formInput.handle],
              limit: 1,
            },
          },
        });

        console.log(profileRes);
        const profile = profileRes.data.profiles.items[0];

        if (!profile) {
          console.log("profile not found");
          return;
        }

        if (!activeAccount) {
          console.log("activeAccount not found");
          return;
        }

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
    }
  };

  const onInputChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  return (
    <>
      <H1 italic font="serif">
        Update your Profile
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
          Update Profile
        </UpdateButton>
      </Container>

      <AddFollowModule />
    </>
  );
};

export default UpdateProfile;

const AddFollowModule = () => {
  const [formInput, setFormInput] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const [updateProfileFollowModule] = useUpdateFollowModule();

  const [followModule, setFollowModule] = useState(
    FOLLOW_MODULES["EmptyFollowModuleSettings"]
  );

  const [moduleInputValues, setModuleInputValues] = useState({
    Follow: {
      amount: {
        currency: "0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e",
        value: "",
      },
      recipient: "",
    },
  });

  const onCollectModuleChange = (val: string) => {
    if (!val) return;

    const module = Object.values(FOLLOW_MODULES).filter((m) =>
      compareAddress(m.address, val)
    )[0];
    if (!module) return;

    setFollowModule(module);
  };

  const onModuleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: "Collect" | "Reference",
    key: string,
    innerKey: string
  ) => {
    const { value } = e.target;

    if (innerKey) {
      setModuleInputValues((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          [key]: {
            ...prev[name][key],
            [innerKey]: value,
          },
        },
      }));

      console.table(moduleInputValues);

      return;
    }

    setModuleInputValues((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        [key]: value,
      },
    }));

    console.table(moduleInputValues);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const values = Object.values(formInput);
    const promises = values.filter((v) => v);

    let modifiedFollowData = {};

    if (followModule.type === "followerOnlyReferenceModule") {
      modifiedFollowData = {
        recipient: moduleInputValues.Follow.recipient,
        amount: {
          currency: moduleInputValues.Follow.amount.currency,
          value: moduleInputValues.Follow.amount.value,
        },
      };
    }

    const followData = {
      [followModule.type]:
        followModule.type === "emptyFollowModule"
          ? true
          : moduleInputValues.Follow,
    };

    await updateProfileFollowModule(followData);
    // await updateProfileFollowModule(modifiedFollowData);

    // if (!promises.length) {
    //   console.log("no promises");
    //   return;
    // }
  };

  return (
    <>
      <H1 italic font="serif" css={{ marginTop: "10rem" }}>
        Add Follow Module
      </H1>
      {/* <Text italic font="sansSerif" css={{ margin: "1rem 0" }}>
        This follow feature is special, it will let you to add a subscription
        based module to your profile. more info soon....
      </Text> */}

      <ModuleSelect
        name="Follow"
        value={followModule}
        onSelectChange={onCollectModuleChange}
        modules={FOLLOW_MODULES}
        onInputChange={onModuleInputChange}
        inputValues={moduleInputValues}
      />

      {/* <Text italic font="sansSerif" css={{ margin: "1rem 0" }}>
        Your don&apos;t have to fill out all of them, just just any many as you
        wish.
      </Text>

      <Container onSubmit={onFormSubmit}>
        <Box>
          <NoBorderTextArea
            name={"1"}
            value={formInput["1"]}
            onChange={onInputChange}
            required
            placeholder="Your first promise"
          />
          <NoBorderTextArea
            name={"2"}
            value={formInput["2"]}
            onChange={onInputChange}
            placeholder="Your second promise"
          />
          <NoBorderTextArea
            name={"3"}
            value={formInput["3"]}
            onChange={onInputChange}
            placeholder="Your third promise"
          />
        </Box>
        <Box>
          <NoBorderTextArea
            name={"4"}
            value={formInput["4"]}
            onChange={onInputChange}
            placeholder="Your fourth promise"
          />
          <NoBorderTextArea
            name={"5"}
            value={formInput["5"]}
            onChange={onInputChange}
            placeholder="Your fifth promise"
          />
          <NoBorderTextArea
            name={"6"}
            value={formInput["6"]}
            onChange={onInputChange}
            placeholder="Your sixth promise"
          />
        </Box>
 */}
      <UpdateButton type="submit" onClick={onFormSubmit}>
        Update Follow Module
      </UpdateButton>
      {/* </Container> */}
    </>
  );
};

const Container = styled("form", {
  display: "flex",
  flexDirection: "column",

  outline: "1px solid $grey300",
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
  color: "$grey500",
});

const UpdateButton = styled("button", {
  backgroundColor: "transparent",
  border: "1px solid $grey300",

  // borderLeft: 0,
  // borderRight: 0,
  // borderBottom: 0,

  borderRadius: "0 0 20px 20px",

  height: "5rem",
  width: "100%",

  color: "$grey600",

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

  borderRight: "1px solid $grey300",

  height: "35rem",

  "&:last-child": {
    borderRight: 0,
  },
});
