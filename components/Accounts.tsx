import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAccount, useConnect, useSigner, useSignMessage } from "wagmi";
import { useObservable } from "@/stores";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText,
} from "./Select";
import {
  Popover,
  PopoverContent,
  PopoverText,
  PopoverTrigger,
} from "./Popover";

import { TextButton } from "./Button";
import { LightSansSerifText, LinkText } from "./Text";

import PlusSvg from "@/icons/plus.svg";

import { toast } from "react-toastify";
import { smallAddress } from "@/utils";

import { WalletStore } from "@/stores/WalletStore";
import { ProfilesStore } from "@/stores/ProfilesStore";
import { Avatar, AvatarImage } from "./Avatar";
import { gql, useQuery } from "@apollo/client";
import { QUERY_PROFILE_BY_ID } from "@/graphql/PROFILE";

const Accounts = () => {
  const router = useRouter();

  const [{ data }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount();
  const [, signMessage] = useSignMessage();
  const [{ data: signer, error, loading }, getSigner] = useSigner();

  const address = useObservable(WalletStore.address);
  const authSigner = useObservable(WalletStore.signer);
  const accessToken = useObservable(WalletStore.accessToken);

  const allProfiles = useObservable(ProfilesStore.allProfiles);
  const activeProfile = useObservable(ProfilesStore.activeProfile);
  const activeProfileId = useObservable(ProfilesStore.activeProfileId);

  const [load, setLoad] = useState(false);

  const { data: allProfilesData } = useQuery(gql(QUERY_PROFILE_BY_ID), {
    variables: {
      request: {
        ownedBy: address,
        // profileIds: [this.activeAccountAdr.get],
        limit: 30,
      },
    },
    pollInterval: 3000,
  });

  const onAuthClick = async (val: string) => {
    try {
      if (val === "metamask") {
        await connect(data.connectors[0]);
      } else if (val === "sequence") {
        console.log("onAuthClick", val);

        await connect(data.connectors[1]);
      }

      toast.success("Successfully connected to wallet");
      // setOpen(false);
    } catch (err) {
      toast.error("Could not connect to wallet! " + err);
      // setOpen(false);
    }
  };

  // const onSelectAccountConnectChange = (val: string) => {
  //   if (val) {
  //     setAccountChoice(val);
  //   }
  // };

  const disconnectAuth = async () => {
    disconnect();

    WalletStore.logout();
  };

  const loadAuth = async (
    account: { address: string },
    isAlreadyLoaded: boolean
  ) => {
    if (isAlreadyLoaded) {
      return;
    }

    WalletStore.updateFromLocalStorage();
    const refreshData = await WalletStore.refreshAuth();

    // if (refreshData?.accessToken) {
    //   setLoad(true);
    //   return;
    // }

    if (account?.address) {
      // console.log("accountData", accountData);

      WalletStore?.address.set(account.address);

      const challange = await WalletStore?.getChallange();

      if (challange?.data?.challenge?.text) {
        const sign = await signMessage({
          message: challange?.data.challenge.text,
        });

        if (sign?.data) {
          WalletStore?.signature.set(sign.data);

          // authenticating
          await WalletStore?.authenticate();
        }
      }
    }

    setLoad(true);
  };

  useEffect(() => {
    if (!window) return;

    if (accountData?.address && authSigner) {
      WalletStore.login(accountData.address, authSigner);
    }
  }, [accountData, load, authSigner]);

  useEffect(() => {
    if (!window) return;

    if (signer && !authSigner) {
      WalletStore.signer.set(signer);
    }
  }, [signer, authSigner]);

  // useEffect(() => {
  //   if (!window) return;

  //   const fetchAndUpdateProfiles = async () => {
  //     // await accountStore.updateDataFromLocalStore(data?.profiles.items[0].id);
  //     await ProfilesStore.fetchProfiles();
  //   };

  //   // if (data?.profiles?.items[0]?.id) {
  //   if (accountData?.address && !allProfiles.length) {
  //     fetchAndUpdateProfiles();
  //   } else {
  //     console.log("no address");
  //   }
  //   // }
  // }, [accountData, allProfiles]);

  const onSelectValChange = (val: string) => {
    if (val) {
      if (val === "__CREATE_PROFILE__") {
        router.push("/create/profile");

        return;
      }

      const profile = allProfiles.filter((profile) => profile.id === val);

      if (profile.length) {
        ProfilesStore.setActiveAccount(profile[0]);
      }

      ProfilesStore.setActiveAccountAdr(val);
    }
  };

  return (
    <>
      {allProfilesData?.profiles?.items?.length && activeProfile ? (
        <Select
          defaultValue={activeProfileId}
          value={activeProfileId}
          onValueChange={onSelectValChange}>
          <SelectTrigger css={{ padding: "1rem 2rem 1rem 1rem !important" }}>
            <SelectValue>
              <Avatar
                css={{
                  backgroundImage: `url(${activeProfile?.picture?.original?.url})`,
                }}>
                <AvatarImage
                  alt="user"
                  src={activeProfile?.picture?.original?.url}
                />
              </Avatar>
              {activeProfile?.handle}
            </SelectValue>
          </SelectTrigger>

          <SelectContent css={{ backgroundColor: "$grey200" }}>
            <SelectViewport>
              {allProfiles.map((profile, i) => {
                return (
                  <SelectItem value={profile.id} key={i}>
                    <SelectItemText>{profile.handle}</SelectItemText>
                  </SelectItem>
                );
              })}

              <SelectItem
                value={"__CREATE_PROFILE__"}
                css={{ textDecoration: "underline !important" }}>
                <SelectItemText
                  css={{
                    display: "flex",
                    alignItems: "center",
                    // svg: { marginTop: "0.8rem !important" },
                  }}>
                  <PlusSvg width={15} height={15} />
                  Create profile
                </SelectItemText>
              </SelectItem>
            </SelectViewport>
          </SelectContent>
        </Select>
      ) : (
        <Link href="/create/profile" passHref>
          <LinkText as={LightSansSerifText}>Create Profile</LinkText>
        </Link>
      )}

      {accountData ? (
        <Popover>
          <PopoverTrigger
            css={{
              padding: "1.2rem 2rem",
              fontSize: "$sm",
              "&:hover": { cursor: "pointer" },
            }}>
            {accountData?.ens?.name || smallAddress(accountData.address)}
          </PopoverTrigger>
          <PopoverContent>
            <Link href="/account" passHref>
              <PopoverText>Account</PopoverText>
            </Link>

            <Link href="/revenue" passHref>
              <PopoverText>Revenue</PopoverText>
            </Link>

            <Link href="/settings" passHref>
              <PopoverText>Settings</PopoverText>
            </Link>

            <Link href="/status" passHref>
              <PopoverText>Lens Status</PopoverText>
            </Link>

            <PopoverText onClick={disconnectAuth}>Disconnect</PopoverText>
          </PopoverContent>
        </Popover>
      ) : (
        <TextButton onClick={() => onAuthClick("metamask")}>Connect</TextButton>
      )}
    </>
  );
};

export default Accounts;
