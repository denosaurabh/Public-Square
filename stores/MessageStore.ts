import { Hypercore } from "@/hypercore";
import { toast } from "react-toastify";
import { observable } from ".";
import { WalletStore } from "./WalletStore";

class MessageStoreKlass {
  // messages = observable()
  myCore = observable<object | null>(null);

  constructor() {}

  createCore() {
    const address = WalletStore?.address.get();

    if (!address) return;

    const myCore = Hypercore(address, {
      valueEncoding: "json",
      persist: false,
      storage: null,
    });

    this.myCore.set(myCore);
  }

  async addMessage(message: string) {
    const core = this.myCore.get();
    const address = WalletStore?.address.get();

    if (!core || !address) {
      console.log("no core or address");
      toast.error("No Hypercore or user address found!");
      return;
    }

    const res = await core.append(
      JSON.stringify({
        name: message,
        by: WalletStore.address.get(),
      })
    );

    console.log(res);

    return res;
  }

  getMessage(coreUrl: string) {
    const discoveryCore = Hypercore(coreUrl);

    const extension = discoveryCore.registerExtension("discovery", {
      // Set the encoding type for messages
      encoding: "binary",
      onmessage: (message, peer) => {
        // Recieved messages will be automatically decoded
        console.log("Got key from peer!", message);

        const otherCore = Hypercore(message, {
          valueEncoding: "json",
          persist: false,
        });

        // Render the peer's data from their core
        otherCore.get(0, console.log);
      },
    });

    // When you find a peer tell them about your core
    discoveryCore.on("peer-add", (peer) => {
      console.log("Got a peer!");
      extension.send(myCore.key, peer);
    });
  }
}

export const MessageStore = new MessageStoreKlass();
