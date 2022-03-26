import { decodeTxEncodedData, EMPTY_ADDRESS } from "@/utils";
import { ethers } from "ethers";
import { observable } from ".";
import { SuperDenoDAOStore } from "./SuperDenoDAOStore";
import SocialDao from "@/artifacts/contracts/SocialDao.sol/SocialDAO.json";
import { apolloClient } from "@/apollo/client";
import { gql } from "@apollo/client";
import { QUERY_PROFILES_OWNED_BY_ADDRESS } from "@/graphql/PROFILE";
import { LENSHUB_PROXY } from "@/contratcts";
import { LensHub, LensHub__factory } from "@/typechain-types";
import { nanoid } from "nanoid";
import { IPFSClient } from "@/utils/ipfs";
import { QUERY_PUBLICATIONS } from "@/graphql/PUBLICATIONS";
import { toast } from "react-toastify";

export type DaoPostType = "POST" | "SUBJECT" | "DISCUSSION";

interface PostPubication {
  name: string;
  description: string;
  content: string;
  type: DaoPostType;
}

class SocialDAOStoreKlass {
  currentSocialDAOContract = observable<ethers.Contract | null>(null);

  currentDaoContractInfo = observable<any>({});
  currentDaoProfileInfo = observable<any>({});

  transactions = observable<any>([]);
  noOfTransactions = observable<number>(0);

  posts = observable<any>([]);
  subjects = observable<any>([]);
  discussions = observable<any>([]);

  // constructor(private store: Store) {}

  // private get superDenoDaoStore(): SuperDenoDAOStore {
  //   return this.store.get(SuperDenoDAOStore);
  // }

  async fetchPosts(daoProfileId: string) {
    const pubsData = await apolloClient.query({
      query: gql(QUERY_PUBLICATIONS),
      variables: {
        request: {
          profileId: daoProfileId,
          publicationTypes: ["POST", "COMMENT", "MIRROR"],
          limit: 30,
        },
      },
    });

    let posts: object[] = [];
    let subjects: object[] = [];
    let discussions: object[] = [];

    if (!pubsData?.data.publications?.items) return;

    pubsData?.data.publications?.items.map((el: any, i: number) => {
      if (el.__typename === "Post") {
        console.log(el);

        const daoPostTypeAttributeObj = el.metadata.attributes.filter(
          (el: any) => el.traitType === "DAOPostType"
        )[0];

        console.log(daoPostTypeAttributeObj);

        if (!daoPostTypeAttributeObj) {
          return posts.push(el);
        }

        if (daoPostTypeAttributeObj.value === "POST") {
          return posts.push(el);
        } else if (daoPostTypeAttributeObj.value === "SUBJECT") {
          return subjects.push(el);
        } else if (daoPostTypeAttributeObj.value === "DISCUSSION") {
          return discussions.push(el);
        } else {
          return posts.push(el);
        }
      }

      return posts.push(el);
    });

    this.posts.set(posts);
    this.subjects.set(subjects);
    this.discussions.set(discussions);
  }

  async getDAOInfoByName(
    daoName: string,
    signer: ethers.Signer,
    superDenoDao: ethers.Contract
  ) {
    // const superDenoDao = this.superDenoDaoStore.getContract();

    if (!superDenoDao) {
      console.log("superDenoDao is null");
      return;
    }

    const address = await superDenoDao.getDAOAddressByName(daoName);

    if (address === EMPTY_ADDRESS || !address) return;

    const socialDao = new ethers.Contract(address, SocialDao.abi, signer);
    this.currentSocialDAOContract.set(socialDao);

    const info = await socialDao.getInfo();
    // console.log("info", info);

    const profileRes = await apolloClient.query({
      query: gql(QUERY_PROFILES_OWNED_BY_ADDRESS),
      variables: {
        request: {
          ownedBy: address,
          limit: 1,
        },
      },
    });

    // console.log("profileRes", profileRes);

    const infoObj = {
      ...profileRes.data.profiles.items[0],
      address,
      owners: info[0],
      name: info[1],
      constitutions: info[2],
      about: profileRes.data.profiles.items[0]?.bio,
    };

    // console.log(infoObj);

    if (!infoObj) return;

    this.currentDaoContractInfo.set(infoObj);
    this.currentDaoProfileInfo.set(profileRes.data.profiles.items[0]);

    await this.fetchPosts(infoObj.id);
  }

  async postPubication({ name, content, description, type }: PostPubication) {
    const metadata = {
      version: "1.0.0",
      metadata_id: nanoid(),
      description,
      content,
      external_url: null,
      image: null,
      imageMimeType: null,
      name,
      attributes: [
        {
          displayType: "string",
          traitType: "DAOPostType",
          value: type,
        },
      ],
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

    const socialDao = this.currentSocialDAOContract.get();
    console.log("socialDao", socialDao);

    if (!socialDao) {
      console.log("socialDao is null");
      return;
    }

    const profileInt = parseInt(this.currentDaoProfileInfo.get().id, 16);

    let lensHub = new ethers.utils.Interface(LensHub__factory.abi);
    const encodedData = lensHub.encodeFunctionData("post", [
      {
        profileId: profileInt,
        contentURI: "ipfs://" + ipfsResult.path,
        collectModule: "0xb96e42b5579e76197b4d2ea710ff50e037881253",
        collectModuleData: "0x",
        referenceModule: EMPTY_ADDRESS,
        referenceModuleData: "0x",
      },
    ]);

    const tx = await socialDao.submitTransaction(
      LENSHUB_PROXY,
      "0",
      encodedData
    );
    console.log("post", tx);
  }

  async submitProposal(
    abi: string,
    functionName: string,
    args: string,
    address: string,
    value: number
  ) {
    if (!abi || !functionName || !args || !address || !value) {
      console.log("missing params");
      return;
    }

    const socialDao = this.currentSocialDAOContract.get();

    if (!socialDao) {
      console.log("socialDao is null");
      return;
    }

    try {
      const argsObject = JSON.parse(args);

      let contractI = new ethers.utils.Interface(abi);
      const encodedData = contractI.encodeFunctionData(
        functionName,
        argsObject
      );

      const tx = await socialDao.submitTransaction(address, value, encodedData);

      console.log("submitProposal", tx);

      toast.error("Successfully Submitted Proposal" + err);
    } catch (err) {
      toast.error("Error calling contract function" + err);
    }
  }

  async publishOwnerProposal(
    address: string,
    data: { profileId: string; description: string }
  ) {
    const socialDao = this.currentSocialDAOContract.get();
    if (!socialDao) {
      console.log("socialDao is null");
      return;
    }

    try {
      // const ipfsResult = await IPFSClient.add(JSON.stringify(data));
      // console.log(ipfsResult);

      const tx = await socialDao.publishProposalForOwner(address, {
        // dataUri: "https://ipfs://" + ipfsResult.path,
        profileId: data.profileId,
        description: data.description,
      });

      console.log("publishOwnerProposal", tx);

      toast.success("Join Proposal submitted successfully");
    } catch (err) {
      toast.error("Error publishing");
    }
  }

  async confirmTransaction(txNum: number) {
    const socialDao = this.currentSocialDAOContract.get();

    if (!socialDao) {
      console.log("socialDao is null");
      return;
    }

    console.log(txNum);

    const tx = await socialDao.confirmTransaction(txNum);
    console.log("confirm", tx);
  }

  async executeTransaction(txNum: number) {
    const socialDao = this.currentSocialDAOContract.get();

    if (!socialDao) {
      console.log("socialDao is null");
      return;
    }

    const tx = await socialDao.executeTransaction(txNum);
    console.log("execute", tx);
  }

  async revokeTransaction(txNum: number) {
    const socialDao = this.currentSocialDAOContract.get();

    if (!socialDao) {
      console.log("socialDao is null");
      return;
    }

    const tx = await socialDao.revokeConfirmation(txNum);
    console.log("revoke", tx);
  }

  async getNoOfTransactions() {
    const socialDao = this.currentSocialDAOContract.get();

    if (!socialDao) {
      console.log("socialDao is null");
      return;
    }

    const tx = await socialDao.getTransactionCount();
    if (!tx) return;

    const number = parseInt(tx._hex, 16);
    this.noOfTransactions.set(number);
  }

  async getAllTransactions() {
    const socialDao = this.currentSocialDAOContract.get();
    const noOfTxs = await this.noOfTransactions.get();

    if (!socialDao) {
      console.log("socialDao is null");
      return;
    }

    if (!noOfTxs) {
      console.log("no noOfTxs");
      return;
    }

    let transactionNoToBeFetched = noOfTxs - 1;
    let allTransactionsPromises = [];

    while (transactionNoToBeFetched >= 0) {
      allTransactionsPromises.push(
        socialDao.getTransaction(transactionNoToBeFetched)
      );

      transactionNoToBeFetched--;
    }

    const allTransactions = await Promise.all(allTransactionsPromises);

    const valHex = await socialDao.numConfirmationsRequired();
    const totalNoOfConfirmations = parseInt(valHex._hex, 16);

    const transactionsData = allTransactions.map((tx, i) => {
      const value = parseInt(tx.value._hex, 16);
      const numConfirmations = parseInt(tx.numConfirmations._hex, 16);

      const decodedData = decodeTxEncodedData(tx.data);

      return {
        txNo: allTransactions.length - i - 1,
        data: decodedData,
        value,
        to: tx.to,
        executed: tx.executed,
        numConfirmations,
        totalNoOfConfirmations,
      };
    });

    this.transactions.set(transactionsData);
  }

  async updateProfile() {
    try {
      const socialDao = this.currentSocialDAOContract.get();

      if (!socialDao) {
        console.log("socialDao is null");
        return;
      }

      let lensHub = new ethers.utils.Interface(LensHub__factory.abi);

      const profileInt = parseInt(this.currentDaoProfileInfo.get().id, 16);

      if (!profileInt) return;

      // const encodedData = lensHub.encodeFunctionData("post", [
      //   {
      //     profileId: profileInt,
      //     contentURI: "ipfs://" + ipfsResult.path,
      //     collectModule: "0xb96e42b5579e76197b4d2ea710ff50e037881253",
      //     collectModuleData: "0x",
      //     referenceModule: EMPTY_ADDRESS,
      //     referenceModuleData: "0x",
      //   },
      // ]);

      // const tx = await socialDao.submitTransaction(
      //   LENSHUB_PROXY,
      //   "0",
      //   encodedData
      // );

      // console.log(tx);

      toast.success("Proposal for Updaing DAO has been created");
    } catch (err) {
      toast.error("Error updating DAO");
    }
  }

  setCurrentSocialDAOContract(contract: ethers.Contract) {
    this.currentSocialDAOContract.set(contract);
  }
}

export const SocialDAOStore = new SocialDAOStoreKlass();
