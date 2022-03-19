import {
  createFollowTypedData,
  createUnfollowTypedData,
  QUERY_DOES_FOLLOW,
} from "@/graphql/FOLLOW";
import useLensHub from "@/hooks/useLensHub";
import { styled } from "@/stitches.config";
import { useStore, useObservable } from "@/stores";
import { AccountStore } from "@/stores/AccountStore";
import { splitSignature } from "ethers/lib/utils";
import { useAccount, useSignTypedData } from "wagmi";
import Button from "./Button";
import omitDeep from "omit-deep";
import useSWR from "swr";
import useFollowNFT from "@/hooks/useFollowNft";

interface FollowProps {
  profileId: string;
  followerAddress: string;
  followModule: null | Record<string, any>;
}

const Follow: React.FC<FollowProps> = ({
  profileId,
  followerAddress,
  followModule,
}) => {
  const [, signTypedData] = useSignTypedData();
  const [{ data: accountData }] = useAccount();

  const accountStore = useStore(AccountStore);
  const activeAccountAdr = useObservable(accountStore.activeAccountAdr);

  const { data: doesFollowReq } = useSWR([
    QUERY_DOES_FOLLOW,
    {
      request: {
        followInfos: [
          {
            followerAddress: accountData?.address,
            profileId,
          },
        ],
      },
    },
  ]);

  console.log("doesFollowReq", doesFollowReq);

  const follows = doesFollowReq?.data.doesFollow[0].follows;

  const lensHub = useLensHub();
  const [followNft, setFollowNft] = useFollowNFT();

  const follow = async () => {
    const followRequest = [
      {
        profile: activeAccountAdr,
      },
      {
        profile: profileId,
        followModule: followModule,
      },
    ];

    const result = await createFollowTypedData(followRequest);
    const typedData = result.data.createFollowTypedData.typedData;

    const signature = await signTypedData({
      domain: omitDeep(typedData.domain, "__typename"),
      types: omitDeep(typedData.types, "__typename"),
      value: omitDeep(typedData.value, "__typename"),
    });

    if (!signature.data) return;

    const { v, r, s } = splitSignature(signature.data);

    if (!lensHub) return;
    if (!accountData?.address) return;

    const tx = await lensHub.followWithSig({
      follower: accountData?.address,
      profileIds: typedData.value.profileIds,
      datas: typedData.value.datas,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });

    console.log(`followed ${profileId} :D, hash: ${tx.hash}`);
  };

  const unfollow = async () => {
    console.log("unfollowing", profileId);

    const result = await createUnfollowTypedData({
      profile: profileId,
    });

    const typedData = result.data.createUnfollowTypedData.typedData;

    const signature = await signTypedData({
      domain: omitDeep(typedData.domain, "__typename"),
      types: omitDeep(typedData.types, "__typename"),
      value: omitDeep(typedData.value, "__typename"),
    });

    console.log("signature", signature);

    if (!signature.data) return;

    const { v, r, s } = splitSignature(signature.data);

    if (!lensHub) return;

    // load up the follower nft contract
    // const followNftContract = new ethers.Contract(
    //   typedData.domain.verifyingContract,
    //   LENS_FOLLOW_NFT_ABI,
    //   getSigner()
    // );

    const followNftContract = await setFollowNft(
      typedData.domain.verifyingContract
    );

    if (!followNftContract) return;

    const sig = {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    };

    const tx = await followNftContract.burnWithSig(
      typedData.value.tokenId,
      sig
    );
    console.log(tx.hash);

    console.log(`unfollowed ${profileId} :(, hash: ${tx.hash}`);
  };

  const onFollowUnfollowClick = async (follows: boolean) => {
    console.log(!lensHub, activeAccountAdr, !profileId, !accountData?.address);

    if (!lensHub || !activeAccountAdr || !profileId || !accountData?.address) {
      return;
    }

    if (!follows) {
      await follow();
    } else {
      await unfollow();
    }
  };

  return (
    <FollowContainer>
      <Button onClick={() => onFollowUnfollowClick(follows)}>
        {!follows ? "Follow" : "Unfollow"}
      </Button>
    </FollowContainer>
  );
};

export default Follow;

const FollowContainer = styled("div", {});
