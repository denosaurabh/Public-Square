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

const Accounts = () => {
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });

  const { data: dataRes } = useSWR([
    QUERY_PROFILES_OWNED_BY_ADDRESS,
    {
      request: {
        ownedBy: accountData?.address,
        limit: 30,
      },
    },
  ]);

  const accountStore = useStore(AccountStore);
  const activeAccount = useObservable(accountStore.activeAccount);
  const activeAccountAdr = useObservable(accountStore.activeAccountAdr);

  useEffect(() => {
    if (dataRes?.data?.profiles.items[0]) {
      accountStore.setActiveAccount(dataRes?.data?.profiles.items[0]);
      accountStore.setActiveAccountAdr(dataRes?.data?.profiles.items[0].id);
    }
  }, [dataRes]);

  if (!dataRes) return <></>;

  const { data, loading, error } = dataRes;

  if (!data) return <></>;

  const currentProfile = data?.profiles.items[0];
  //   accountStore.setActiveAccount(currentProfile.id);

  const onSelectValChange = (val: string) => {
    if (val) {
      const profile = data.profiles.items.filter(
        (profile) => profile.id === val
      );

      if (profile.length) {
        accountStore.setActiveAccount(profile[0]);
      }

      accountStore.setActiveAccountAdr(val);
    }
  };

  return (
    <Select
      defaultValue={currentProfile.id}
      value={activeAccountAdr}
      onValueChange={onSelectValChange}>
      <SelectTrigger>
        <SelectValue>
          {/* {dataRes &&
            data &&
            activeAccount &&
            dataRes?.data?.profiles.items.filter(
              (a) => a.handle === activeAccount
            )[0].handle} */}
          {activeAccount?.handle} {activeAccountAdr}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectViewport>
          {dataRes &&
            dataRes.data?.profiles.items.map((profile) => {
              return (
                <SelectItem value={profile.id} key={profile.id}>
                  <SelectItemText>
                    {profile.handle} {profile.id}
                  </SelectItemText>
                </SelectItem>
              );
            })}
        </SelectViewport>
      </SelectContent>
    </Select>
  );
};

export default Accounts;
