import { ethers } from "ethers";

import SuperDeno from "@/artifacts/contracts/SocialDao.sol/SuperDeno.json";
import SocialDAO from "@/artifacts/contracts/SocialDao.sol/SocialDAO.json";

import { observable } from ".";
import { WalletStore } from "./WalletStore";
import { SUPER_DENO_DAO } from "@/contratcts";
import {
  createProfile,
  QUERY_PROFILES_OWNED_BY_ADDRESS,
  QUERY_PROFILE_BY_ID,
  UPDATE_PROFILE,
} from "@/graphql/PROFILE";
import {
  LensHub__factory,
  MockProfileCreationProxy__factory,
} from "@/typechain-types";
import { EMPTY_ADDRESS } from "@/utils";
import { CreateProfileDataStruct } from "@/typechain-types/LensHub";
import { apolloClient } from "@/apollo/client";
import { gql } from "@apollo/client";
import { toast } from "react-toastify";

interface CreateDaoInput {
  name: string;
  about: string;
  owners: string;
  constitutionOne: string;
  constitutionTwo: string;
  constitutionThree: string;
  uploadedImgUrl: string;
}

class SuperDenoDAOStoreKlass {
  superDenoDaoAddress: string = SUPER_DENO_DAO;
  superDenoDao: ethers.Contract | null = null;
  daoNames = observable<string[]>([]);
  allDaos = observable<object[]>([]);

  // constructor(private store: Store) {}

  // private get authStore(): WalletStore {
  //   return this.store.get(WalletStore);
  // }

  getContract() {
    if (
      WalletStore.signer.get()
      // && !this.superDenoDao
    ) {
      this.superDenoDao = new ethers.Contract(
        this.superDenoDaoAddress,
        SuperDeno.abi,
        WalletStore.signer.get()
      );

      return this.superDenoDao;
    }
  }

  async fetchDaosByNames(names: string[]) {
    if (!names.length) {
      return;
    }

    const daosRes = await apolloClient.query({
      query: gql(QUERY_PROFILE_BY_ID),
      variables: {
        request: {
          handles: names,
          limit: 30,
        },
      },
    });

    if (!daosRes.data.profiles.items.length) {
      return;
    }

    this.allDaos.set(daosRes.data.profiles.items);
  }

  async createSocialDAO(input: CreateDaoInput) {
    this.getContract();

    if (!this.superDenoDao) return;

    const {
      name,
      about,
      owners,
      constitutionOne,
      constitutionTwo,
      constitutionThree,
      uploadedImgUrl,
    } = input;

    if (
      !name ||
      !about ||
      !owners ||
      !constitutionOne ||
      !constitutionTwo ||
      !constitutionThree ||
      !uploadedImgUrl
    ) {
      return;
    }

    const ownersArr = input.owners.split(",");
    console.log(ownersArr, ownersArr.length);

    const tx = await this.superDenoDao.createSocialDAO(
      ownersArr,
      ownersArr.length,
      // 1,
      name,
      //   about,
      [constitutionOne, constitutionTwo, constitutionThree]
    );

    // const res = await createProfile({
    //   handle: name,
    //   profilePictureUri: uploadedImgUrl,
    //   followModule: {
    //     emptyFollowModule: true,
    //   },
    // });

    console.log(tx);

    const res = await tx.wait();
    console.log(res);

    toast.success("Step 1 / 4! DAO created through Super Deno");

    const socialDaoAddress = await this.superDenoDao.getDAOAddressByName(name);
    console.log(socialDaoAddress);

    if (!socialDaoAddress || socialDaoAddress === EMPTY_ADDRESS) {
      console.log("dao not found");
      toast.error("DAO not found!");

      return;
    }

    toast.success("Step 2 / 4. Fetched DAO");

    const inputStruct: CreateProfileDataStruct = {
      to: socialDaoAddress,
      handle: name,
      imageURI: uploadedImgUrl,
      followModule: EMPTY_ADDRESS,
      followModuleData: [],
      followNFTURI: "ipfs://yrynry",
    };

    const signer = WalletStore.signer.get();

    if (!signer) {
      console.log("no signer");
      toast.error("Signer not found!");

      return;
    }

    const lensHub = MockProfileCreationProxy__factory.connect(
      "0x9BB48d8F9c4596b98C8bB1fB6D67aaE238F81CC2",
      signer
    );

    const profileRes = await lensHub.proxyCreateProfile(inputStruct);
    console.log(profileRes);
    await profileRes.wait();

    toast.success("Step 3 / 4. Lens Profile Created!");

    const profileData = await apolloClient.query({
      query: gql(QUERY_PROFILES_OWNED_BY_ADDRESS),
      variables: {
        request: {
          ownedBy: socialDaoAddress,
          limit: 1,
        },
      },
    });

    console.log(profileData);

    if (!profileData.data.profiles.items[0]) {
      console.log("no profile found");
      return;
    }

    const { id, name: profileName } = profileData.data.profiles.items[0];

    console.log(profileData, id);

    // await apolloClient.mutate({
    //   mutation: gql(UPDATE_PROFILE),
    //   variables: {
    //     request: {
    //       profileId: id,
    //       name,
    //       bio: about,
    //     },
    //   },
    // });

    const socialDAO = new ethers.Contract(
      socialDaoAddress,
      SocialDAO.abi,
      signer
    );

    const updatedSocialDAO = await socialDAO.setLensProfileAndInfo(id, [
      `social/${id}`,
    ]);

    console.log(updatedSocialDAO);
    toast.success("Success! DAO created.");
  }

  async socialDaoTransactions() {
    const address = "0xB1eDe3F5AC8654124Cb5124aDf0Fd3885CbDD1F7";

    const signer = WalletStore.signer.get();

    if (!signer) return;

    const socialDao = new ethers.Contract(address, SocialDAO.abi, signer);
    const noOfTransaction = await socialDao.getTransactionCount();

    console.log(noOfTransaction);
  }

  async getAllDaosNames(superDeno: ethers.Contract) {
    if (!superDeno) return;

    console.log("getAllDaosNames");

    const daos = await superDeno.allDaoNames();
    console.log(daos);

    this.daoNames.set(daos);

    await this.fetchDaosByNames(daos);

    return daos;
  }

  async getDaoByAddress(name: string) {
    const superDeno = this.getContract();
    if (!superDeno) return;

    const socialDaoAddress = await superDeno.getDAOAddressByName(name);

    return socialDaoAddress;
  }

  async superDenoInfo() {
    const superDeno = this.getContract();
    if (!superDeno) return;

    const info = await superDeno.superDenoInfo();
    return info;
  }
}

export const SuperDenoDAOStore = new SuperDenoDAOStoreKlass();
