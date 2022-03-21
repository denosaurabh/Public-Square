import { EMPTY_ADDRESS } from "@/utils";
import { ethers } from "ethers";
import { observable, Store } from ".";
import { SuperDenoDAOStore } from "./SuperDenoDAOStore";
import SocialDao from "@/artifacts/contracts/SocialDao.sol/SocialDAO.json";
import { apolloClient } from "@/apollo/client";
import { gql } from "@apollo/client";
import { QUERY_PROFILES_OWNED_BY_ADDRESS } from "@/graphql/PROFILE";

export class SocialDAOStore {
  currentSocialDAOContract = observable<ethers.Contract | null>(null);

  currentDaoContractInfo = observable<any>({});
  currentDaoProfileInfo = observable<any>({});

  constructor(private store: Store) {}

  private get superDenoDaoStore(): SuperDenoDAOStore {
    return this.store.get(SuperDenoDAOStore);
  }

  async getDAOInfoByName(daoName: string, signer: ethers.Signer) {
    const superDenoDao = this.superDenoDaoStore.getContract();

    if (!superDenoDao) {
      console.log("superDenoDao is null");
      return;
    }

    const address = await superDenoDao.getDAOAddressByName(daoName);

    if (address === EMPTY_ADDRESS || !address) return;

    const socialDao = new ethers.Contract(address, SocialDao.abi, signer);
    this.currentSocialDAOContract.set(socialDao);

    const info = await socialDao.getInfo();
    console.log("info", info);

    const profileRes = await apolloClient.query({
      query: gql(QUERY_PROFILES_OWNED_BY_ADDRESS),
      variables: {
        request: {
          ownedBy: address,
          limit: 1,
        },
      },
    });

    console.log("profileRes", profileRes);

    const infoObj = {
      ...profileRes.data.profiles.items[0],
      address,
      owners: info[0],
      name: info[1],
      constitutions: info[2],
      about: profileRes.data.profiles.items[0]?.bio,
    };

    this.currentDaoContractInfo.set(infoObj);
    this.currentDaoProfileInfo.set(profileRes.data.profiles.items[0]);
  }

  


  setCurrentSocialDAOContract(contract: ethers.Contract) {
    this.currentSocialDAOContract.set(contract);
  }
}
