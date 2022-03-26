import { useStore, useObservable } from "@/stores";
import { ProfilesStore } from "@/stores/ProfilesStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Profile = () => {
  const router = useRouter();

  const activeAccountAdr = useObservable(ProfilesStore.activeProfileId);

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
