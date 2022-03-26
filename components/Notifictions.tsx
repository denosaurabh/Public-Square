import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverText,
  PopoverTrigger,
} from "./Popover";
import PlusSvg from "@/icons/plus.svg";
import { gql, useMutation, useQuery } from "@apollo/client";
// import { GET_NOTIFICATIONS } from "@/graphql/NOTIFICATIONS";
import { id } from "ethers/lib/utils";
import { useStore, useObservable } from "@/stores";
import { ProfilesStore } from "@/stores/ProfilesStore";
import { useEffect } from "react";
import { NotificationsStore } from "@/stores/NotificationsStore";

const Notifications = () => {
  //   const authStore = useStore(WalletStore);
  //   const id = useObservable(authStore.activeProfileId);

  //   const notificationsStore = useStore(NotificationsStore);
  //   const notifications = useObservable(notificationsStore.notifications);

  //   useEffect(() => {
  //     if (id) {
  //       notificationsStore.fetchNotifications();
  //     }
  //   }, [id]);

  //   console.log(notifications);

  return (
    <Popover>
      <PopoverTrigger>{/* <PlusSvg /> */}</PopoverTrigger>
      <PopoverContent></PopoverContent>
    </Popover>
  );
};

export default Notifications;
