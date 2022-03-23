import { Avatar, AvatarImage } from "@/components/Avatar";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import Post from "@/components/Post";
import {
  BoldText,
  LightSansSerifText,
  SemiBoldText,
  Text,
} from "@/components/Text";
import { createPostTypedData } from "@/graphql/POST";
import useLensHub from "@/hooks/useLensHub";
import { styled } from "@/stitches.config";
import { useStore, useObservable } from "@/stores";
import { AccountStore } from "@/stores/AccountStore";
import { IPFSClient } from "@/utils/ipfs";
import { splitSignature } from "ethers/lib/utils";
import { nanoid } from "nanoid";
import { ChangeEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSignTypedData } from "wagmi";
import omitDeep from "omit-deep";
import { MarkDownContainer } from "@/style/markdown";
import { TextArea } from "@/components/TextArea";
import {
  Amount,
  COLLECT_MODULES,
  Module,
  ModulesI,
  REFERENCE_MODULES,
} from "@/contratcts";

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

const CreatePost = () => {
  const [, signTypedData] = useSignTypedData();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const [collectModule, setCollectModule] = useState(
    COLLECT_MODULES["EmptyCollectModuleSettings"]
  );
  const [referenceModule, setReferenceModule] = useState(
    REFERENCE_MODULES["null"]
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

  const accountStore = useStore(AccountStore);

  const activeProfileId = useObservable(accountStore.activeProfileId);
  const activeProfile = useObservable(accountStore.activeProfile);

  const lensHub = useLensHub();

  const onCreatePostClick = async () => {
    console.log(name, content, activeProfileId);

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

    console.log("creating post");

    const metadata = {
      version: "1.0.0",
      metadata_id: nanoid(),
      description: content,
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
      collectModule: {
        emptyCollectModule: true,
      },
      referenceModule: {
        followerOnlyReferenceModule: false,
      },
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
            type="name"
            placeholder="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />

          <TextArea
            placeholder="I am an artist...."
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

interface ModuleSelectProps {
  name: "Collect" | "Reference";
  modules: ModulesI;
  value: Module;
  onSelectChange: (value: string) => void;
  onInputChange: (e: any, name: string, key: string, innerKey: string) => void;
  inputValues: { [key: string]: Amount } | {};
}

const ModuleSelect: React.FC<ModuleSelectProps> = ({
  name,
  modules,
  value,
  onSelectChange,
  onInputChange,
  inputValues,
}) => {
  return (
    <ModuleBox>
      <BoldText>{name} Module</BoldText>
      <LightSansSerifText>
        This is a {name} module. Here you can add any functionality to when
        someone tries to {name} this post
      </LightSansSerifText>

      <Select
        defaultValue={value.address}
        value={value.address}
        onValueChange={onSelectChange}>
        <SelectTrigger css={{ width: "40rem", marginBottom: "3rem" }}>
          <SelectValue>{value.name}</SelectValue>
        </SelectTrigger>

        <SelectContent css={{ width: "40rem" }}>
          <SelectViewport>
            {Object.values(modules).map((module, i) => {
              const { name, address } = module;

              return (
                <SelectItem value={address} key={name}>
                  <SelectItemText>{name}</SelectItemText>
                </SelectItem>
              );
            })}
          </SelectViewport>
        </SelectContent>
      </Select>

      <LightSansSerifText>{value.message}</LightSansSerifText>

      <ModuleInputs>
        {typeof value.dataType === "object" ? (
          <>
            {Object.keys(value.dataType).map((key: string, i, arr) => {
              if (typeof value.dataType[`${key}`] === "object") {
                const vals = Object.keys(value.dataType[`${key}`]).map(
                  (innerKey: string, innerI, innerArr) => {
                    return (
                      <LineInput
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          onInputChange(e, name, key, innerKey)
                        }
                        name={innerKey}
                        key={innerI}
                        type={value.dataType[key][innerKey].toLowerCase()}
                        placeholder={innerKey}
                        value={inputValues[name][key][innerKey]}
                        required
                      />
                    );
                  }
                );

                return vals;
              }

              if (typeof value.dataType[`${key}`] === "string") {
                return (
                  <LineInput
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onInputChange(e, name, key)
                    }
                    key={key}
                    type={value.dataType[key].toLowerCase()}
                    placeholder={key}
                    value={inputValues[name][key]}
                    required
                  />
                );
              }

              // return <Input key={i} type="" />;
            })}
          </>
        ) : (
          <></>
        )}
      </ModuleInputs>
    </ModuleBox>
  );
};

const Container = styled("div", { marginTop: "5rem" });

const TopContainer = styled("div", {
  display: "flex",
  gap: "2rem",

  width: "100%",
  margin: "0 auto",
});

const LeftBox = styled("div", {});
const RightBox = styled("div", {});

const ModuleBox = styled("div", {});

const LineInput = styled(Input, {
  border: "1px solid #ccc",
  borderRadius: 0,
});

const ModuleInputs = styled("form", {
  marginBottom: "6rem",
});
