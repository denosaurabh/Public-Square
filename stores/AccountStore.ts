import { observable } from ".";

export class AccountStore {
  activeAccount = observable<Record<string, any> | null>(null);
  activeAccountAdr = observable<string>("");

  setActiveAccount(accountData: Record<string, any>) {
    this.activeAccount.set(accountData);
  }

  setActiveAccountAdr(address: string) {
    this.activeAccountAdr.set(address);
  }
}
