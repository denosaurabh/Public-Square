import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { createPostTypedData } from "@/graphql/POST";
import useLensHub from "@/hooks/useLensHub";
import { styled } from "@/stitches.config";
import { useObservable } from "@/stores";
import { ProfilesStore } from "@/stores/ProfilesStore";
import { IPFSClient } from "@/utils/ipfs";
import { splitSignature } from "ethers/lib/utils";
import { nanoid } from "nanoid";
import { ChangeEvent, useState } from "react";
import { useSignTypedData } from "wagmi";
import omitDeep from "omit-deep";
import Editor from "@/components/Editor";
import { COLLECT_MODULES, REFERENCE_MODULES } from "@/contratcts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "@/components/Select";
import { compareAddress } from "@/utils";
import { H6 } from "@/components/Heading";
import { ModuleSelect } from "@/components/ModuleSelect";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [, signTypedData] = useSignTypedData();

  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const [collectModule, setCollectModule] = useState(
    COLLECT_MODULES["FreeCollectModuleSettings"]
  );
  const [referenceModule, setReferenceModule] = useState(
    REFERENCE_MODULES["none"]
  );

  const [moduleInputValues, setModuleInputValues] = useState({
    Collect: {
      collectLimit: "",
      amount: {
        currency: "",
        value: "",
      },
      recipient: "",
      referralFee: "",
    },
    Reference: {},
  });

  const activeProfileId = useObservable(ProfilesStore.activeProfileId);
  const activeProfile = useObservable(ProfilesStore.activeProfile);

  const lensHub = useLensHub();

  const createPost = async () => {
    console.log(name, content, activeProfileId);

    Number(moduleInputValues?.Collect?.collectLimit);
    Number(moduleInputValues?.Collect?.amount?.value);
    parseFloat(moduleInputValues?.Collect?.referralFee);

    moduleInputValues?.Collect?.referralFee = 0;

    if (collectModule.type !== "limitedFeeCollectModule") {
      delete moduleInputValues?.Collect?.collectLimit;
    }

    const collectModuleObj = {
      [collectModule.type]:
        collectModule.dataType === "Boolean"
          ? collectModule.dataValue
          : moduleInputValues.Collect,
    };

    const referenceModuleObj = {
      [referenceModule.type]:
        referenceModule.dataType === "Boolean"
          ? referenceModule.dataValue
          : moduleInputValues.Reference,
    };

    if (!content || !name || !activeProfileId) return;

    console.log(collectModuleObj);
    console.log(referenceModuleObj);

    console.log("creating post");

    const metadata = {
      version: "1.0.0",
      metadata_id: nanoid(),
      description,
      content,
      external_url: null,
      image: null,
      imageMimeType: null,
      name,
      attributes: [],
      media: [
        // {
        //   item: 'https://scx2.b-cdn.net/gfx/news/hires/2018/lion.jpg',
        //   // item: 'https://assets-global.website-files.com/5c38aa850637d1e7198ea850/5f4e173f16b537984687e39e_AAVE%20ARTICLE%20website%20main%201600x800.png',
        //   type: 'image/jpeg',
        // },
      ],
      appId: "denolensapp",
    };

    const ipfsResult = await IPFSClient.add(JSON.stringify(metadata));
    console.log(ipfsResult);

    const typedDataReq = {
      profileId: activeProfileId,
      contentURI: "ipfs://" + ipfsResult.path,
      collectModule: collectModuleObj,
      referenceModule: referenceModuleObj,
    };

    const result = await createPostTypedData(typedDataReq);
    const typedData = result.data.createPostTypedData.typedData;

    console.log(typedData);

    const signData = await signTypedData({
      domain: omitDeep(typedData.domain, "__typename"),
      types: omitDeep(typedData.types, "__typename"),
      value: omitDeep(typedData.value, "__typename"),
    });
    if (!signData.data) return;

    const { v, r, s } = splitSignature(signData.data);

    if (!lensHub) return;

    console.log("signing", {
      profileId: typedData.value.profileId,
      contentURI: typedData.value.contentURI,
      collectModule: typedData.value.collectModule,
      collectModuleData: typedData.value.collectModuleData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleData: typedData.value.referenceModuleData,
    });

    const tx = await lensHub.postWithSig({
      // const tx = await lensHub.postWithSig({

      profileId: typedData.value.profileId,
      contentURI: typedData.value.contentURI,
      collectModule: typedData.value.collectModule,
      collectModuleData: typedData.value.collectModuleData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleData: typedData.value.referenceModuleData,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });

    console.log("created post with hash: ", tx.hash);

    await tx.wait();

    setName("");
    setDescription("");
    setContent("");

    router.push(`/profile/${activeProfileId}`);
  };

  const onCreatePostClick = async () => {
    toast.promise(createPost, {
      pending: "Publishing...",
      success: "Post Published!",
      error: "Error publishing",
    });
  };

  const onCollectModuleChange = (val: string) => {
    if (!val) return;

    const module = Object.values(COLLECT_MODULES).filter((m) =>
      compareAddress(m.address, val)
    )[0];
    if (!module) return;

    setCollectModule(module);
  };

  const onReferenceModuleChange = (val: string) => {
    if (!val) return;

    const module = Object.values(REFERENCE_MODULES).filter((m) =>
      compareAddress(m.address, val)
    )[0];
    if (!module) return;

    setReferenceModule(module);
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

  return (
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
            type="text"
            placeholder="Title"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            css={{ fontSize: "$xxl !important" }}
          />

          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            css={{ fontSize: "$xl !important", marginBottom: "2rem" }}
          />

          <Editor
            placeholder="Content of your post goes here.... Press '/' to get more commands. Scroll Down to post and get more options "
            // value={content}
            onChange={(val) => setContent(val)}
            css={{ minHeight: "100vh" }}
          />

          {/* <TextArea /> */}

          {/* <MarkDownContainer>
            <ReactMarkdown
              className="post-content-markdown"
              remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </MarkDownContainer> */}

          <ModuleSelect
            name="Collect"
            value={collectModule}
            onSelectChange={onCollectModuleChange}
            modules={COLLECT_MODULES}
            onInputChange={onModuleInputChange}
            inputValues={moduleInputValues}
          />

          <ModuleSelect
            name="Reference"
            value={referenceModule}
            onSelectChange={onReferenceModuleChange}
            modules={REFERENCE_MODULES}
            onInputChange={onModuleInputChange}
            inputValues={moduleInputValues}
          />

          <Button onClick={onCreatePostClick} css={{ marginTop: "4rem" }}>
            Create Post
          </Button>
        </LeftBox>
      </TopContainer>
    </Container>
  );
};

export default CreatePost;

const Container = styled("div", { marginTop: "5rem" });

const TopContainer = styled("div", {
  display: "flex",
  gap: "2rem",

  width: "100%",
  margin: "0 auto",
});

const LeftBox = styled("div", {});
const RightBox = styled("div", {});
