export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const SUPER_DENO_DAO = "0x503644D05f0021ff14F41Ea88fA692562C5ef6ec";

export const LENSHUB_PROXY = "0xd7B3481De00995046C7850bCe9a5196B7605c367";
export const LENSHUB_IMLPEMENTATION =
  "0x7c86e2a63941442462cce73EcA9F07F4Ad023261";

export interface Amount {
  collectLimit?: string;
  amount: {
    currency: string;
    value: string;
  };
  recipient: string;
  referralFee?: string;
}

// Modules
export interface Module {
  type: string;
  name: string;
  address: string;
  message: string;
  dataType: "Boolean" | Amount;
  dataValue?: boolean;
  userMessage: string;
}

export type ModulesI = Record<string, Module>;

export const FOLLOW_MODULES: ModulesI = {
  EmptyFollowModuleSettings: {
    type: "emptyFollowModule",
    name: "Follow",
    address: ZERO_ADDRESS,
    dataType: "Boolean",
    message: "Any user can follow you",
    userMessage: "You can freely follow this person",
  },
  FeeFollowModuleSettings: {
    type: "feeFollowModule",
    name: "Fee Follow",
    address: "0xfb7A602c73Ab80b314588A94574F26E7E459C236",
    dataType: {
      amount: {
        currency: "STRING",
        value: "NUMBER",
      },
      recipient: "ADDRESS",
    },
    message: "Users have to pay a specific amount (in USD) to follow you",
    userMessage:
      "You have to pay this specific amount (in USD) to follow this person",
  },
  // ApprovalFollowModuleSettings: {
  //   type: "approvalFollowModule",
  //   name: "Approve Follower only",
  //   address: "0x8cc1F4C7D3aFf9053eA2d840EAd31f5B68541A38",
  //   dataType: "Boolean",
  // },
};

export const COLLECT_MODULES: ModulesI = {
  FeeCollectModuleSettings: {
    type: "feeCollectModule",
    name: "Fee Collect",
    address: "0x19809De86a0297C1B126f477724bBaa8Fb3Fa147",
    dataType: {
      amount: {
        currency: "STRING",
        value: "NUMBER",
      },
      recipient: "ADDRESS",
      referralFee: "NUMBER",
    },
    message: "Users have to pay value and referral fee to collect your post",
    userMessage: "You have to pay value and referral fee to collect this post",
  },
  LimitedFeeCollectModuleSettings: {
    type: "limitedFeeCollectModule",
    name: "Limited Fee Collect",
    address: "0xe81908aC6a0FdF1D283EA13435c9c3D13dc93E4B",
    dataType: {
      collectLimit: "NUMBER",
      amount: {
        currency: "STRING",
        value: "NUMBER",
      },
      recipient: "ADDRESS",
      referralFee: "NUMBER",
    },
    message:
      "Users have to pay value and referral fee to collect your post but only in a limited amount of collect",
    userMessage:
      "You have to pay value and referral fee to collect this post. There are only limited amount of collects that can be accepted.",
  },
  TimedFeeCollectModuleSettings: {
    type: "timedFeeCollectModule",
    name: "Timed Fee Collect",
    address: "0xbf307F8B9B0B12E116869B600C1aEa33Bbe29dE3",
    dataType: {
      amount: {
        currency: "STRING",
        value: "NUMBER",
      },
      recipient: "ADDRESS",
      referralFee: "NUMBER",
    },
    message:
      "Users can pay an optional referral fee to collect your post but only within 24 hours",
    userMessage:
      "You can pay an optional referral fee to collect your post but only within 24 hours",
  },
  LimitedTimedFeeCollectModuleSettings: {
    type: "limitedTimedFeeCollectModule",
    name: "Limited Timed Fee Collect",
    address: "0x0bA34a3733bE773F3801bf8e767c258aa216D50B",
    dataType: {
      amount: {
        currency: "STRING",
        value: "NUMBER",
      },
      recipient: "ADDRESS",
      referralFee: "NUMBER",
    },
    message:
      "Users have to pay value and referral fee to collect your post but only in a limited amount of collects and within 24 hours",
    userMessage:
      "You have to pay the value and referral fee to collect this post and within 24 hours. There are only a limited amount of posts to be collected",
  },
  RevertCollectModuleSettings: {
    type: "revertCollectModule",
    name: "Revert Collect",
    address: "0x98dfAB2360352D9Da122b5F43a4a4fa5D3Ce25a3",
    dataType: "Boolean",
    message: "No one can collect your post",
    dataValue: true,
    userMessage: "The post creater has disabled Collect for this post",
  },
  FreeCollectModuleSettings: {
    type: "freeCollectModule",
    name: "Empty Module",
    address: "0xb96e42b5579e76197B4d2EA710fF50e037881253",
    dataType: "Boolean",
    message: "Anyone can collect your post",
    dataValue: true,
    userMessage: "You can freely collect this post",
  },
};

export const REFERENCE_MODULES: ModulesI = {
  none: {
    type: "followerOnlyReferenceModule",
    name: "No Reference Module",
    address: ZERO_ADDRESS,
    dataType: "Boolean",
    message: "Anyone can reference your post",
    dataValue: false,
    userMessage: "You can freely reference this post",
  },
  FollowOnlyReferenceModuleSettings: {
    type: "followerOnlyReferenceModule",
    name: "Follower only Reference",
    address: "0x8cc1F4C7D3aFf9053eA2d840EAd31f5B68541A38",
    dataType: "Boolean",
    message: "Users have to be a follower to reference your post",
    dataValue: true,
    userMessage:
      "Creater of the post has only allowed his followers to reference this post",
  },
};
