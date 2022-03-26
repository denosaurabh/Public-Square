import { getNotifications } from "@/graphql/NOTIFICATIONS";
import { observable } from ".";
import { ProfilesStore } from "./ProfilesStore";

class NotificationsStoreKlass {
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

export const NotificationsStore = new NotificationsStoreKlass();
