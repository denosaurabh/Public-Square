import { LocalStore } from "@/utils/localStorage";
import { observable } from ".";

export type themeT = "light" | "dark";

interface SettingsLocalStore {
  theme: themeT;
  publicationsContainerColumns: number;
}

export type Filter = "TOP_COMMENTED" | "TOP_COLLECTED" | "LATEST";

export type Action = "HOME" | "FILTER" | "POST";

class SettingsStoreKlass {
  theme = observable<themeT>("dark");
  focusMode = observable<boolean>(false);
  publicationsContainerColumns = observable<number>(2);

  action = observable<Action>("HOME");

  filter = observable<Filter>("TOP_COMMENTED");
  denoAppId = observable<boolean>(false);

  localStore = new LocalStore<SettingsLocalStore>("@settingsStore");

  constructor() {
    this.theme.subscribe((newTheme) => {
      this.localStore.update({ theme: newTheme });
    });

    this.publicationsContainerColumns.subscribe(
      (updatedPublicationsContainerColumns) => {
        this.localStore.update({
          publicationsContainerColumns: updatedPublicationsContainerColumns,
        });
      }
    );
  }

  toggleTheme() {
    this.theme.set(this.theme.get() === "light" ? "dark" : "light");
  }

  updateFromLocalStorage() {
    const localStore = this.localStore.get();

    if (localStore?.theme) {
      this.theme.set(localStore.theme);
    }

    if (localStore?.publicationsContainerColumns) {
      this.publicationsContainerColumns.set(
        localStore.publicationsContainerColumns
      );
    }
  }

  setPublicationsContainerColumns(columns: number) {
    this.publicationsContainerColumns.set(columns);
  }
}

export const SettingsStore = new SettingsStoreKlass();
