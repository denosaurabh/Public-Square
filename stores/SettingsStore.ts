import { LocalStore } from "@/utils/localStorage";
import { observable, Store } from ".";

export type themeT = "light" | "dark";

interface SettingsLocalStore {
  theme: themeT;
}

export class SettingsStore {
  theme = observable<themeT>("dark");

  localStore = new LocalStore<SettingsLocalStore>("@settingsStore");

  constructor(store: Store) {
    this.theme.subscribe((newTheme) => {
      this.localStore.update({ theme: newTheme });
    });
  }

  toggleTheme() {
    this.theme.set(this.theme.get() === "light" ? "dark" : "light");
  }

  updateFromLocalStorage() {
    const localTheme = this.localStore.get()?.theme;

    if (localTheme) {
      this.theme.set(localTheme);
    }
  }
}
