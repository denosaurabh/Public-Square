import { useEffect, useState } from "react";
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
import { LightSansSerifText, LinkText } from "./Text";
import Link from "next/link";
import { TextButton } from "./Button";

import { toast } from "react-toastify";
import { smallAddress } from "@/utils";

import { WalletStore } from "@/stores/WalletStore";
import { ProfilesStore } from "@/stores/ProfilesStore";

const Accounts = () => {
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

  // const [accountChoice, setAccountChoice] = useState("metamask");

  // const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);

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

    if (accountData && !load) {
      loadAuth(accountData, load);
      setLoad(true);
    }
  }, [accountData, load]);

  useEffect(() => {
    if (!window) return;

    if (signer && !authSigner) {
      WalletStore.signer.set(signer);
    }
  }, [signer, authSigner]);

  useEffect(() => {
    if (!window) return;

    const fetchAndUpdateProfiles = async () => {
      // await accountStore.updateDataFromLocalStore(data?.profiles.items[0].id);
      await ProfilesStore.fetchProfiles();
    };

    // if (data?.profiles?.items[0]?.id) {
    if (accountData?.address && !allProfiles.length) {
      fetchAndUpdateProfiles();
    } else {
      console.log("no address");
    }
    // }
  }, [accountData, allProfiles]);

  const onSelectValChange = (val: string) => {
    if (val) {
      const profile = allProfiles.filter((profile) => profile.id === val);

      if (profile.length) {
        ProfilesStore.setActiveAccount(profile[0]);
      }

      ProfilesStore.setActiveAccountAdr(val);
    }
  };

  return (
    <>
      {allProfiles?.length && activeProfile ? (
        <Select
          defaultValue={activeProfileId}
          value={activeProfileId}
          onValueChange={onSelectValChange}>
          <SelectTrigger>
            <SelectValue>{activeProfile?.handle}</SelectValue>
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
            </SelectViewport>
          </SelectContent>
        </Select>
      ) : (
        <Link href="/create/profile" passHref>
          <LinkText as={LightSansSerifText}>Create Profile</LinkText>
        </Link>
      )}

      {accountData ? (
        <TextButton onClick={disconnectAuth}>
          {accountData?.ens?.name || smallAddress(accountData.address)}
        </TextButton>
      ) : (
        <TextButton onClick={() => onAuthClick("metamask")}>Connect</TextButton>
      )}
    </>
  );
};

export default Accounts;
