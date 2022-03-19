import { apolloClient } from "@/apollo/client";
import {
  MUTATE_REFRESH_AUTHENTICATION,
  MUT_AUTHENTICATION,
  QUERY_CHALLENGE,
} from "@/graphql/AUTH";
import { LocalStore } from "@/utils/localStorage";
import { gql } from "@apollo/client";
import { observable } from ".";

export class AuthStore {
  address = observable<string | null>(null);
  signature = observable<string | null>(null);

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

  async refreshAuth() {
    if (!this.refreshToken.get()) return;

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

    return data;
  }

  async authenticate() {
    if (!this.address.get() || !this.signature.get()) return;

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
      console.log(err);
    }

    if (!data) return;

    this.accessToken.set(data.data.authenticate.accessToken);
    this.refreshToken.set(data.data.authenticate.refreshToken);

    return data;
  }

  getChallange() {
    if (this.accessToken.get()) return;

    if (!this.address.get()) return;

    const challange = apolloClient.query({
      query: gql(QUERY_CHALLENGE),
      variables: {
        request: {
          address: this.address.get(),
        },
      },
    });
    return challange;
  }

  updateFromLocalStorage() {
    const localStorage = this.localStoresAuth.get();

    if (localStorage) {
      this.accessToken.set(localStorage.accessToken);
      this.refreshToken.set(localStorage.refreshToken);
    }
  }
}
