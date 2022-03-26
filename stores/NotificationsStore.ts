import { getNotifications } from "@/graphql/NOTIFICATIONS";
import { observable } from ".";
import { ProfilesStore } from "./ProfilesStore";

export class NotificationsStore {
  notifications = observable<object[]>([]);

  // constructor(private store: Store) {}

  // private get accountStore() {
  //   return this.store.get(ProfilesStore);
  // }

  async fetchNotifications() {
    const id = ProfilesStore.activeProfileId.get();

    const notifications = await getNotifications(id);
    this.notifications.set(notifications);
  }
}
