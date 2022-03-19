import { apolloClient } from "@/apollo/client";
import { LocalStore } from "@/utils/localStorage";
import { gql } from "@apollo/client";
import { QUERY_PROFILE_BY_ID } from "@/graphql/PROFILE";
import { observable } from ".";

export class AccountStore {
  activeAccount = observable<Record<string, any> | null>(null);
  activeAccountAdr = observable<string>("");

  localStoreAccount = new LocalStore<{ activeAccountAdr: string }>("@account");

  constructor() {
    this.activeAccountAdr.subscribe((activeAccountAdr) => {
      if (activeAccountAdr) {
        this.localStoreAccount.update({ activeAccountAdr });
      } else {
        this.localStoreAccount.update({ activeAccountAdr: "" });
      }
    });
  }

  setActiveAccount(accountData: Record<string, any>) {
    this.activeAccount.set(accountData);
  }

  setActiveAccountAdr(address: string) {
    this.activeAccountAdr.set(address);
  }

  async updateDataFromLocalStore() {
    const localData = this.localStoreAccount.get();

    if (localData?.activeAccountAdr) {
      this.activeAccountAdr.set(localData.activeAccountAdr);

      const data = await apolloClient.query({
        query: gql(QUERY_PROFILE_BY_ID),
        variables: {
          request: {
            profileIds: [localData.activeAccountAdr],
            limit: 1,
          },
        },
      });

      const profile = data?.data?.profiles?.items?.[0];

      if (profile) {
        this.setActiveAccount(profile);
      }
    }
  }
}
