import { styled } from "@/stitches.config";
import { ChangeEvent, useState } from "react";
import { Button } from "./Button";
import Input from "./Input";
import { useStore, useObservable } from "@/stores";
import { ProfilesStore } from "@/stores/ProfilesStore";
import { nanoid } from "nanoid";
import { IPFSClient } from "@/utils/ipfs";
import { useSignTypedData } from "wagmi";
import { createCommentTypedData } from "@/graphql/COMMENT";
import omitDeep from "omit-deep";
import { splitSignature } from "ethers/lib/utils";
import useLensHub from "@/hooks/useLensHub";
import { SemiBoldText } from "./Text";
import { TextArea } from "./TextArea";
import { toast } from "react-toastify";
import Editor from "./Editor";

interface CreateCommentI {
  publicationId: string;
  css?: Record<string, unknown>;
}

const CreateComment: React.FC<CreateCommentI> = ({ publicationId, css }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [description, setDescription] = useState("");

  const [, signTypedData] = useSignTypedData();

  const activeAccountAdr = useObservable(ProfilesStore.activeProfileId);

  const lensHub = useLensHub();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
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
          freeCollectModule: {
            followerOnly: false,
          },
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

      toast.success("Comment posted successfully!");

      setName("");
      setComment("");
      setDescription("");
    } catch (err) {
      console.log(err);
      toast.error("Failed posting a comment!");
    }
  };

  return (
    <CommentContainer onSubmit={onFormSubmit} css={css}>
      <SemiBoldText>Post a comment</SemiBoldText>

      <div>
        <Input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          css={{
            fontSize: "$xxl !important",
            margin: "0",
            padding: 0,
            input: { margin: "0 1rem", padding: 0 },
          }}
        />

        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          css={{
            fontSize: "$xl !important",
            margin: "0",
            padding: 0,
            input: { margin: "1rem", padding: 0 },
          }}
        />
      </div>

      <Editor
        placeholder="your comment content goes here .."
        // value={comment}
        onChange={(val) => setComment(val)}
        css={{ height: "20rem" }}
      />

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
  // margin: "5rem 0",
});
