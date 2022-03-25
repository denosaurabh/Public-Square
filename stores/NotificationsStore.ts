import { getNotifications } from "@/graphql/NOTIFICATIONS";
import { Store, observable } from ".";
import { AccountStore } from "./AccountStore";

export class NotificationsStore {
  notifications = observable<object[]>([]);

  constructor(private store: Store) {}

  private get accountStore() {
    return this.store.get(AccountStore);
  }

  async fetchNotifications() {
    const id = this.accountStore.activeProfileId.get();

    const notifications = await getNotifications(id);
    this.notifications.set(notifications);
  }
}
