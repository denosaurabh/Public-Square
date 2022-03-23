import { useStore, useObservable } from "@/stores";
import { AccountStore } from "@/stores/AccountStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Profile = () => {
  const router = useRouter();

  const accountStore = useStore(AccountStore);
  const activeAccountAdr = useObservable(accountStore.activeProfileId);

  useEffect(() => {
    if (!window) return;

    if (activeAccountAdr) {
      router.push(`/profile/${activeAccountAdr}`);
    } else {
      router.push("/");
    }
  }, [, activeAccountAdr]);

  return <></>;
};

export default Profile;
