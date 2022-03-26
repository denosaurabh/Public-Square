import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverText,
  PopoverTrigger,
} from "./Popover";
import EnvelopeSvg from "@/icons/envelope.svg";
import { gql, useMutation, useQuery } from "@apollo/client";
// import { GET_NOTIFICATIONS } from "@/graphql/NOTIFICATIONS";
import { id } from "ethers/lib/utils";
import { useObservable } from "@/stores";
import { ProfilesStore } from "@/stores/ProfilesStore";
import { useEffect } from "react";
import { NotificationsStore } from "@/stores/NotificationsStore";
import {
  MUTATE_NOTIFICATIONS,
  QUERY_NOTIFICATIONS,
} from "@/graphql/NOTIFICATIONS";
import { LightSansSerifText, Text } from "./Text";

const Notifications = () => {
  const id = useObservable(ProfilesStore.activeProfileId);

  const { data: notifications, loading } = useQuery(gql(QUERY_NOTIFICATIONS), {
    variables: {
      request: {
        profileId: id,
        limit: 20,
      },
    },
  });

  if (loading || !notifications) {
    return <LightSansSerifText>loading...</LightSansSerifText>;
  }

  return (
    <Popover>
      <PopoverTrigger
        css={{ padding: "1rem", "&:hover": { cursor: "pointer" } }}>
        <EnvelopeSvg />
      </PopoverTrigger>
      <PopoverContent css={{ padding: "1rem 2rem" }}>
        <Text css={{ color: "$grey200" }}>No new notifications</Text>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
