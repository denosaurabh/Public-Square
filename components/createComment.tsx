import { styled } from "@/stitches.config";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MarkDownContainer } from "@/style/markdown";
import { useStore, useObservable } from "@/stores";
import { AccountStore } from "@/stores/AccountStore";
import { nanoid } from "nanoid";
import { IPFSClient } from "@/utils/ipfs";
import { useSignTypedData } from "wagmi";
import { createCommentTypedData } from "@/graphql/COMMENT";
import omitDeep from "omit-deep";
import { splitSignature } from "ethers/lib/utils";
import useLensHub from "@/hooks/useLensHub";

interface CreateCommentI {
  publicationId: string;
}

const CreateComment: React.FC<CreateCommentI> = ({ publicationId }) => {
  const [comment, setComment] = useState("");

  const [, signTypedData] = useSignTypedData();

  const accountStore = useStore(AccountStore);
  const activeAccountAdr = useObservable(accountStore.activeAccountAdr);

  const lensHub = useLensHub();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(comment, activeAccountAdr);

    const commentMetadata = {
      version: "1.0.0",
      metadata_id: nanoid(),
      description: comment,
      content: comment,
      external_url: null,
      image: null,
      imageMimeType: null,
      name: "comment",
      attributes: [],
      media: [],
      appId: "deno-lensapp",
    };

    const ipfsResult = await IPFSClient.add(JSON.stringify(commentMetadata));

    const commentReq = {
      profileId: activeAccountAdr,
      publicationId,
      contentURI: "ipfs://" + ipfsResult.path,
      collectModule: {
        emptyCollectModule: true,
      },
      referenceModule: {
        followerOnlyReferenceModule: false,
      },
    };

    const result = await createCommentTypedData(commentReq);
    const typedData = result.data.createCommentTypedData.typedData;

    const signature = await signTypedData({
      domain: omitDeep(typedData.domain, "__typename"),
      types: omitDeep(typedData.types, "__typename"),
      value: omitDeep(typedData.value, "__typename"),
    });

    if (!signature.data) return;

    const { v, r, s } = splitSignature(signature.data);

    if (!lensHub) return;

    const tx = await lensHub.commentWithSig({
      profileId: typedData.value.profileId,
      contentURI: typedData.value.contentURI,
      profileIdPointed: typedData.value.profileIdPointed,
      pubIdPointed: typedData.value.pubIdPointed,
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

    console.log("posted comment with hash", tx.hash);
  };

  return (
    <CommentContainer onSubmit={onFormSubmit}>
      <textarea
        placeholder="my comment .."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <MarkDownContainer>
        <ReactMarkdown
          className="post-content-markdown"
          remarkPlugins={[remarkGfm]}>
          {comment}
        </ReactMarkdown>
      </MarkDownContainer>

      <Button type="submit">Comment</Button>
    </CommentContainer>
  );
};

export default CreateComment;

const CommentContainer = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",

  width: "40rem",
  margin: "5rem auto",
});
