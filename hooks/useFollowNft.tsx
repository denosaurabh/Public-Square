import { FollowNFT, FollowNFT__factory } from "@/typechain-types";
import { useState } from "react";
import { useSigner } from "wagmi";

const useFollowNFT = () => {
  const [{ data }, getSigner] = useSigner();
  const [followNft, setFollowNft] = useState<FollowNFT | null>(null);

  const setFollowNftFn = async (
    verifyingContract: string
  ): Promise<FollowNFT | null> => {
    if (data && !followNft) {
      const signer = await getSigner();

      if (!signer) return null;

      const followNftFactory = FollowNFT__factory.connect(
        verifyingContract,
        signer
      );

      setFollowNft(followNftFactory);
      return followNftFactory;
    }

    return null;
  };

  return [followNft, setFollowNftFn];
};

export default useFollowNFT;
