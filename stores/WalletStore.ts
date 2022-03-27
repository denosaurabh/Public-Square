import { apolloClient } from "@/apollo/client";
import {
  MUTATE_REFRESH_AUTHENTICATION,
  MUT_AUTHENTICATION,
  QUERY_CHALLENGE,
} from "@/graphql/AUTH";
import { LocalStore } from "@/utils/localStorage";
import { gql } from "@apollo/client";
import { ethers, Signer } from "ethers";
import { observable } from ".";
import { ProfilesStore } from "./ProfilesStore";

class WalletStoreKlass {
  address = observable<string | null>(null);
  signature = observable<string | null>(null);

  signer = observable<Signer | undefined>(undefined);

  accessToken = observable<string | null>(null);
  refreshToken = observable<string | null>(null);

  localStoresAuth = new LocalStore<{
    accessToken: string;
    refreshToken: string;
  }>("@auth");

  constructor() {
    this.accessToken.subscribe((token) => {
      if (token) {
        this.localStoresAuth.update({ accessToken: token });
      } else {
        this.localStoresAuth.update({ accessToken: "" });
      }
    });

    this.refreshToken.subscribe((token) => {
      if (token) {
        this.localStoresAuth.update({ refreshToken: token });
      } else {
        this.localStoresAuth.update({ refreshToken: "" });
      }
    });
  }

  setSigner(signer: Signer) {
    this.signer.set(signer);
  }

  async refreshAuth() {
    if (!this.refreshToken.get()) {
      throw new Error("no refresh token");
    }

    let data = null;
    try {
      data = await apolloClient.mutate({
        mutation: gql(MUTATE_REFRESH_AUTHENTICATION),
        variables: {
          request: {
            refreshToken: this.refreshToken.get(),
          },
        },
      });
    } catch (err) {
      console.log(err);
    }

    if (!data?.data.refresh) return;

    this.accessToken.set(data.data.refresh.accessToken);
    this.refreshToken.set(data.data.refresh.refreshToken);

    return {
      accessToken: data.data.refresh.accessToken,
      refreshToken: data.data.refresh.refreshToken,
    };
  }

  async authenticate() {
    if (!this.address.get() || !this.signature.get()) {
      console.log(
        "no address or signature",
        this.address.get(),
        this.signature.get()
      );
      return;
    }

    if (this.accessToken.get() && this.refreshToken.get()) {
      console.log(
        "already accessToken or refreshToken",
        this.accessToken.get(),
        this.refreshToken.get()
      );
      return;
    }

    let data = null;
    try {
      data = await apolloClient.mutate({
        mutation: gql(MUT_AUTHENTICATION),
        variables: {
          request: {
            address: this.address.get(),
            signature: this.signature.get(),
          },
        },
      });
    } catch (err) {
      console.log("authenticate error");
      console.log(err);
    }

    if (!data) {
      console.log("no authenticate data");
      return;
    }

    this.accessToken.set(data.data.authenticate.accessToken);
    this.refreshToken.set(data.data.authenticate.refreshToken);

    return data;
  }

  async getChallange() {
    console.log("getChallange", this.accessToken.get(), this.address.get());

    if (this.accessToken.get()) return;
    if (!this.address.get()) return;

    const challange = await apolloClient.query({
      query: gql(QUERY_CHALLENGE),
      variables: {
        request: {
          address: this.address.get(),
        },
      },
    });

    return challange;
  }

  async login(address: string, signer: ethers.Signer) {
    if (this.address.get()) {
      await ProfilesStore.updateDataFromLocalStore();
      await ProfilesStore.fetchProfiles();

      return;
    }

    if (!address) {
      throw new Error("no address given");
    }

    if (!signer) {
      throw new Error("no signer given");
    }

    this.address.set(address);

    console.log("login", address, signer);

    try {
      this.updateFromLocalStorage();
      await this.refreshAuth();
    } catch (err) {
      console.log("refresherror", err);

      const challange = await this.getChallange();
      console.log("challange", challange);

      if (challange?.data?.challenge?.text) {
        const sig = await signer.signMessage(challange.data.challenge.text);

        if (!sig) {
          throw new Error("no signature");
        }

        this.signature.set(sig);

        await this.authenticate();

        await ProfilesStore.updateDataFromLocalStore();
        await ProfilesStore.fetchProfiles();
      } else {
        console.log("no challange");

        await this.authenticate();

        await ProfilesStore.updateDataFromLocalStore();
        await ProfilesStore.fetchProfiles();

        return;
      }
    }
  }

  logout() {
    this.address.set(null);
    this.signature.set(null);

    this.signer.set(undefined);

    this.accessToken.set(null);
    this.refreshToken.set(null);

    this.localStoresAuth.del();

    ProfilesStore.activeProfile.set(null);
    ProfilesStore.activeProfileId.set("");
    ProfilesStore.localStoreAccount.del();

    ProfilesStore.clearProfiles();
  }

  updateFromLocalStorage() {
    const localStorage = this.localStoresAuth.get();

    if (localStorage) {
      this.accessToken.set(localStorage.accessToken);
      this.refreshToken.set(localStorage.refreshToken);
    }
  }
}

export const WalletStore = new WalletStoreKlass();
