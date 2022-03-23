import { useStore } from "@/stores";
import { AuthStore } from "@/stores/AuthStore";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useSigner, useSignMessage } from "wagmi";
import { Button, TextButton } from "./Button";
import { useObservable } from "@/stores";
import { smallAddress } from "@/utils";

const AccountButton: React.FC = () => {
  const [{ data }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  const [, signMessage] = useSignMessage();
  const [{ data: signer, error, loading }, getSigner] = useSigner();

  const authStore = useStore(AuthStore);
  const accessToken = useObservable(authStore.accessToken);

  const connector = data.connectors.filter((c) => c.name === "MetaMask")[0];

  const [load, setLoad] = useState(false);

  const loadAuth = async () => {
    if (!window) return;

    authStore.updateFromLocalStorage();
    authStore.refreshAuth();

    if (accessToken) return;

    if (accountData?.address) {
      console.log("accountData", accountData);

      authStore?.address.set(accountData.address);
      const challange = await authStore?.getChallange();

      if (challange) {
        const sign = await signMessage({
          message: challange?.data.challenge.text,
        });

        if (sign.data) {
          authStore?.signature.set(sign.data);

          // authenticating
          await authStore?.authenticate();
        }
      }
    }
  };

  const onAuthClick = async () => {
    connect(connector);
  };

  const disconnectAuth = async () => {
    disconnect();

    authStore.logout();
  };

  useEffect(() => {
    if (accountData && !load) {
      loadAuth();
      setLoad(true);
    }
  }, [, accountData]);

  useEffect(() => {
    if (signer) {
      authStore.signer.set(signer);
    }
  }, [signer]);

  if (!connector) return <></>;

  if (!accountData) {
    return (
      <Button key={connector.id} onClick={onAuthClick} color="dark">
        Connect
      </Button>
    );
  }

  return (
    <TextButton onClick={disconnectAuth}>
      {accountData.ens?.name || smallAddress(accountData.address)}
    </TextButton>
  );
};

export default AccountButton;
