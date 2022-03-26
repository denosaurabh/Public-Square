import { createMirrorTypedData } from "@/graphql/MIRROR";
import { useStore, useObservable } from "@/stores";
import { ProfilesStore } from "@/stores/ProfilesStore";
import { useSignTypedData } from "wagmi";
import useLensHub from "./useLensHub";
import omitDeep from "omit-deep";
import { splitSignature } from "ethers/lib/utils";
import { toast } from "react-toastify";

const useMirrorPost = (publicationId: string) => {
  const [, signTypedData] = useSignTypedData();

  const activeAccountAdr = useObservable(ProfilesStore.activeProfileId);

  const lensHub = useLensHub();

  const mirrorPost = async (mirrorData: object) => {
    // e?.preventDefault();

    try {
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

      toast.success("Mirrored this post!");
    } catch (e) {
      toast.error("Failed mirroring this post!");
    }
  };

  return [mirrorPost];
};

export default useMirrorPost;
