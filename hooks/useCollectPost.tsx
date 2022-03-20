import { createMirrorTypedData } from "@/graphql/MIRROR";
import { useStore, useObservable } from "@/stores";
import { AccountStore } from "@/stores/AccountStore";
import { useAccount, useSignTypedData } from "wagmi";
import useLensHub from "./useLensHub";
import omitDeep from "omit-deep";
import { splitSignature } from "ethers/lib/utils";
import { createCollectTypedData } from "@/graphql/COLLECT";

const useCollectPost = (publicationId: string) => {
  const [, signTypedData] = useSignTypedData();
  const [{ data, error, loading }] = useAccount();

  const accountStore = useStore(AccountStore);
  const activeAccountAdr = useObservable(accountStore.activeAccountAdr);

  const lensHub = useLensHub();

  const collectPost = async (e?: { preventDefault: () => void }) => {
    e?.preventDefault();

    if (!data?.address) return;

    const collectReq = {
      publicationId,
      //   profileId: activeAccountAdr,
    };

    const result = await createCollectTypedData(collectReq);
    console.log("createMirrorTypedData", result);

    const typedData = result.data.createCollectTypedData.typedData;

    const signature = await signTypedData({
      domain: omitDeep(typedData.domain, "__typename"),
      types: omitDeep(typedData.types, "__typename"),
      value: omitDeep(typedData.value, "__typename"),
    });

    if (!signature.data) return;

    const { v, r, s } = splitSignature(signature.data);

    if (!lensHub) return;

    console.log("collecting post with hash", data?.address);

    console.log("collecting post with hash", typedData, data.address);

    const tx = await lensHub.collectWithSig({
      pubId: typedData.value.pubId,
      profileId: typedData.value.profileId,
      data: typedData.value.data,
      collector: data.address,

      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });

    console.log("collected the post with hash", tx.hash);
  };

  return [collectPost];
};

export default useCollectPost;
