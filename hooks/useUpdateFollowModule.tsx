import { createSetFollowModuleTypedData } from "@/graphql/PROFILE";
import { useStore, useObservable } from "@/stores";
import { ProfilesStore } from "@/stores/ProfilesStore";
import { splitSignature } from "ethers/lib/utils";
import omitDeep from "omit-deep";
import { toast } from "react-toastify";
import { useSignTypedData } from "wagmi";
import useLensHub from "./useLensHub";

const useUpdateFollowModule = () => {
  const [, signTypedData] = useSignTypedData();

  const activeAccountAdr = useObservable(ProfilesStore.activeProfileId);

  const lensHub = useLensHub();

  const setFollowModule = async (followModuleData) => {
    try {
      console.log(followModuleData);

      // hard coded to make the code example clear
      const setFollowModuleRequest = {
        profileId: activeAccountAdr,
        followModule: followModuleData,
      };

      const result = await createSetFollowModuleTypedData(
        setFollowModuleRequest
      );
      const typedData = result.data.createSetFollowModuleTypedData.typedData;

      const signature = await signTypedData({
        domain: omitDeep(typedData.domain, "__typename"),
        types: omitDeep(typedData.types, "__typename"),
        value: omitDeep(typedData.value, "__typename"),
      });

      if (!signature.data) return;

      const { v, r, s } = splitSignature(signature.data);

      if (!lensHub) return;

      const tx = await lensHub.setFollowModuleWithSig({
        profileId: typedData.value.profileId,
        followModule: typedData.value.followModule,
        followModuleData: typedData.value.followModuleData,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      });

      console.log(tx.hash);
      toast.success("Follow module updated");
    } catch (err) {
      console.log(err);
      toast.error("Updating Follow module failed!");
    }
  };

  return [setFollowModule];
};

export default useUpdateFollowModule;
