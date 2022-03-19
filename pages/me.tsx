import PageContainer from "@/layouts/PageContainer";
import { useStore, useObservable } from "@/stores";
import { AccountStore } from "@/stores/AccountStore";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();

  const accountStore = useStore(AccountStore);
  const activeAccountAdr = useObservable(accountStore.activeAccountAdr);

  if (activeAccountAdr) {
    router.push(`/profile/${activeAccountAdr}`);
  } else {
    router.push("/");
  }

  return <PageContainer></PageContainer>;
};

export default Profile;
