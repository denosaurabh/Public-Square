import { QUERY_PROFILES_OWNED_BY_ADDRESS } from "@/graphql/PROFILE";
import { useStore } from "@/stores";
import { AccountStore } from "@/stores/AccountStore";
import useSWR from "swr";
import { useAccount } from "wagmi";
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
import { useEffect } from "react";
import { LightSansSerifText, LinkText } from "./Text";
import { AuthStore } from "@/stores/AuthStore";
import Link from "next/link";

const Accounts = () => {
  const accountStore = useStore(AccountStore);
  const authStore = useStore(AuthStore);

  const address = useObservable(authStore.address);
  const allProfiles = useObservable(accountStore.allProfiles);

  const activeProfile = useObservable(accountStore.activeProfile);
  const activeProfileId = useObservable(accountStore.activeProfileId);

  useEffect(() => {
    const fetchAndUpdateProfiles = async () => {
      // await accountStore.updateDataFromLocalStore(data?.profiles.items[0].id);
      await accountStore.fetchProfiles();
    };

    // if (data?.profiles?.items[0]?.id) {
    if (address) {
      fetchAndUpdateProfiles();
    } else {
      console.log("no address");
    }
    // }
  }, [address]);

  if (!allProfiles.length) {
    return (
      <Link href="/create/profile" passHref>
        <LinkText as={LightSansSerifText}>Create Profile</LinkText>
      </Link>
    );
  }

  const onSelectValChange = (val: string) => {
    if (val) {
      const profile = allProfiles.filter((profile) => profile.id === val);

      if (profile.length) {
        accountStore.setActiveAccount(profile[0]);
      }

      accountStore.setActiveAccountAdr(val);
    }
  };

  if (!activeProfile) return <></>;

  return (
    <Select
      defaultValue={activeProfileId}
      value={activeProfileId}
      onValueChange={onSelectValChange}>
      <SelectTrigger>
        <SelectValue>
          {/* {dataRes &&
            data &&
            activeAccount &&
            dataRes?.data?.profiles.items.filter(
              (a) => a.handle === activeAccount
            )[0].handle} */}
          {activeProfile?.handle} {activeProfileId}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectViewport>
          {allProfiles ? (
            allProfiles.map((profile) => {
              return (
                <SelectItem value={profile.id} key={profile.id}>
                  <SelectItemText>
                    {profile.handle} {profile.id}
                  </SelectItemText>
                </SelectItem>
              );
            })
          ) : (
            <LightSansSerifText>Create account</LightSansSerifText>
          )}
        </SelectViewport>
      </SelectContent>
    </Select>
  );
};

export default Accounts;
