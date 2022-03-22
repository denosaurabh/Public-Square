import { Avatar, AvatarImage } from "@/components/Avatar";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import Post from "@/components/Post";
import { SemiBoldText, Text } from "@/components/Text";
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

const CreatePost = () => {
  const [, signTypedData] = useSignTypedData();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const accountStore = useStore(AccountStore);
  const activeAccountAdr = useObservable(accountStore.activeAccountAdr);

  const lensHub = useLensHub();

  const onCreatePostClick = async () => {
    console.log(name, content, activeAccountAdr);

    if (!content || !name || !activeAccountAdr) return;

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
      profileId: activeAccountAdr,
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
          <Button onClick={onCreatePostClick}>Create Post</Button>
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
