import { LocalStore } from "@/utils/localStorage";
import { observable } from ".";

export type themeT = "light" | "dark";

interface SettingsLocalStore {
  theme: themeT;
}

class SettingsStoreKlass {
  theme = observable<themeT>("dark");
  focusMode = observable<boolean>(false);

  localStore = new LocalStore<SettingsLocalStore>("@settingsStore");

  constructor() {
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

export const SettingsStore = new SettingsStoreKlass();
