import { apolloClient } from "@/apollo/client";
import { LocalStore } from "@/utils/localStorage";
import { gql } from "@apollo/client";
import { QUERY_PROFILE_BY_ID } from "@/graphql/PROFILE";
import { observable } from ".";
import { WalletStore } from "./WalletStore";

class ProfilesStoreKlass {
  allProfiles = observable<Record<string, any>[]>([]);

  activeProfile = observable<Record<string, any> | null>(null);
  activeProfileId = observable<string>("");

  localStoreAccount = new LocalStore<{ activeAccountAdr: string }>("@account");

  constructor() {
    this.activeProfileId.subscribe((activeAccountAdr) => {
      if (activeAccountAdr) {
        this.localStoreAccount.update({ activeAccountAdr });
      } else {
        this.localStoreAccount.update({ activeAccountAdr: "" });
      }
    });
  }

  // private get authStore(): WalletStore {
  //   return this.store.get(WalletStore);
  // }

  get activeId() {
    return this.activeProfileId.get();
  }

  async fetchProfiles() {
    const address = WalletStore.address.get();

    if (!address) {
      console.error("no address for fetchProfiles");
      return;
    }

    if (
      this.allProfiles.get().length > 0 &&
      this.activeProfile.get() &&
      this.activeProfileId.get()
    ) {
      console.log("profiles already fetched");
      return;
    }

    const data = await apolloClient.query({
      query: gql(QUERY_PROFILE_BY_ID),
      variables: {
        request: {
          ownedBy: address,
          // profileIds: [this.activeAccountAdr.get],
          limit: 30,
        },
      },
    });

    const profiles = data?.data?.profiles?.items;
    console.log("profiles", profiles);

    if (profiles?.length) {
      this.allProfiles.set(profiles);

      const localActiveAccountId =
        this.localStoreAccount.get()?.activeAccountAdr;

      if (localActiveAccountId) {
        this.setActiveAccountAdr(localActiveAccountId);

        this.setActiveAccount(
          profiles.filter((p: any) => p.id === localActiveAccountId)[0]
        );

        return;
      }

      if (!this.activeProfile.get() || !this.activeProfileId.get()) {
        const currentProfile = profiles[0];

        this.activeProfile.set(currentProfile);
        this.activeProfileId.set(currentProfile.id);
        this.localStoreAccount.update({ activeAccountAdr: currentProfile.id });
      }
    } else {
      this.localStoreAccount.set({ activeAccountAdr: "" });
    }
  }

  setActiveAccount(accountData: Record<string, any>) {
    this.activeProfile.set(accountData);
  }

  setActiveAccountAdr(address: string) {
    this.activeProfileId.set(address);
  }

  async updateDataFromLocalStore() {
    const localData = this.localStoreAccount.get();
    // const adr = this.authStore.address.get;

    if (localData?.activeAccountAdr) {
      this.activeProfileId.set(localData?.activeAccountAdr);

      const data = await apolloClient.query({
        query: gql(QUERY_PROFILE_BY_ID),
        variables: {
          request: {
            // ownedBy: [],
            profileIds: [localData?.activeAccountAdr],
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

  clearProfiles() {
    this.allProfiles.set([]);

    this.activeProfile.set(null);
    this.activeProfileId.set("");

    this.localStoreAccount.del();
  }
}

export const ProfilesStore = new ProfilesStoreKlass();
