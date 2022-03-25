import { Connector, ConnectorData } from "wagmi";
import { sequence } from "0xsequence";
import { ethers } from "ethers";
import WalletConnect from "@walletconnect/web3-provider";
import Web3Modal from "@0xsequence/web3modal";
import { toast } from "react-toastify";

export class SequenceConnect extends Connector {
  readonly id = "sequence";
  readonly name = "Sequence";
  readonly ready = true;

  wallet: null | sequence.Wallet = null;
  web3Modal: null | Web3Modal = null;
  provider: ethers.providers.Web3Provider | null = null;
  signer: ethers.Signer | null = null;

  constructor(config) {
    super(config);
  }

  // Implement other methods
  async connect() {
    let providerOptions: any = {
      walletconnect: {
        package: WalletConnect,
        options: {
          infuraId: "c352645ba30f49f4b714a51948a1c4b7",
        },
      },
    };

    if (!window?.ethereum?.isSequence) {
      providerOptions = {
        // ...providerOptions,
        sequence: {
          package: sequence,
          options: {
            appName: "Public Square",
            defaultNetwork: "mumbai",
          },
        },
      };
    }

    try {
      const web3Modal = new Web3Modal({
        providerOptions,
        cacheProvider: true,
        theme: "dark",
        disableInjectedProvider: true,
      });

      this.web3Modal = web3Modal;

      const wallet = await web3Modal.connect();

      const provider = new ethers.providers.Web3Provider(wallet);

      if (wallet.sequence) {
        (provider as any).sequence = wallet.sequence;
      }

      const signer = provider!.getSigner();

      this.signer = signer;

      // this.wallet = new sequence.Wallet("polygon");

      // const connectDetails = await this.wallet.connect({
      //   app: "Public Square",
      //   authorize: true,
      //   // And pass settings if you would like to customize further
      //   //   networkId: 8001,
      //   settings: {
      //     theme: "dark",
      //     defaultFundingCurrency: "matic",
      //     lockFundingCurrencyToDefault: false,
      //   },
      // });

      // this.wallet?.openWallet();

      // const address = connectDetails.session?.accountAddress;
      // // const provider = await this.getProvider();

      const address = signer.getAddress();
      const chainId: number = await signer.getChainId();

      toast.success("Successfully connected to Sequence wallet");

      return {
        acccount: address,
        chain: {
          id: chainId,
          unsupported: false,
        },
        provider,
      };
    } catch (err) {
      toast.error("Could not connect to Sequence! " + err);
    }
  }

  async getAccount() {
    const account = await this.signer?.getAddress();

    return account;
  }

  async disconnect() {
    this.web3Modal?.clearCachedProvider();

    if (this.provider && (this.provider as any).sequence) {
      const wallet = (this.provider as any).sequence as sequence.Wallet;
      wallet.disconnect();
    }

    this.provider = null;
  }

  async getChainId() {
    return this.signer?.getChainId();
  }

  async getProvider() {
    const provider = await this.provider;
    return provider;
  }

  async getSigner() {
    return this.signer;
  }

  async isAuthorized() {
    const isAuthed = !!this.signer;
    return isAuthed;
  }

  onAccountsChanged(accounts: string[]) {
    console.log("account change");
  }

  onChainChanged(chainId: number | string) {
    console.log("account change");
  }

  onDisconnect() {
    console.log("account change");
  }
}
