import { styled } from "@/stitches.config";
import { useState } from "react";
import { Button } from "./Button";
import { useStore, useObservable } from "@/stores";
import { AccountStore } from "@/stores/AccountStore";
import { useSignTypedData } from "wagmi";
import omitDeep from "omit-deep";
import { splitSignature } from "ethers/lib/utils";
import useLensHub from "@/hooks/useLensHub";
import { createMirrorTypedData } from "@/graphql/MIRROR";

interface CreateCommentI {
  publicationId: string;
}

const CreateMirror: React.FC<CreateCommentI> = ({ publicationId }) => {
  const [, signTypedData] = useSignTypedData();

  const accountStore = useStore(AccountStore);
  const activeAccountAdr = useObservable(accountStore.activeAccountAdr);

  const lensHub = useLensHub();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mirrorReq = {
      profileId: activeAccountAdr,
      publicationId,
      referenceModule: {
        followerOnlyReferenceModule: false,
      },
    };

    const result = await createMirrorTypedData(mirrorReq);
    const typedData = result.data.createMirrorTypedData.typedData;

    const signature = await signTypedData({
      domain: omitDeep(typedData.domain, "__typename"),
      types: omitDeep(typedData.types, "__typename"),
      value: omitDeep(typedData.value, "__typename"),
    });

    if (!signature.data) return;

    const { v, r, s } = splitSignature(signature.data);

    if (!lensHub) return;

    const tx = await lensHub.mirrorWithSig({
      profileId: typedData.value.profileId,
      profileIdPointed: typedData.value.profileIdPointed,
      pubIdPointed: typedData.value.pubIdPointed,
      referenceModule: typedData.value.referenceModule,
      referenceModuleData: typedData.value.referenceModuleData,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });

    console.log("mirrored post with hash", tx.hash);
  };

  return (
    <MirrorContainer onSubmit={onFormSubmit}>
      <Button type="submit">Mirror</Button>
    </MirrorContainer>
  );
};

export default CreateMirror;

const MirrorContainer = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",

  width: "40rem",
  margin: "5rem auto",
});
