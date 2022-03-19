import { useStore } from "@/stores";
import { AuthStore } from "@/stores/AuthStore";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import { Button, TextButton } from "./Button";
import { useObservable } from "@/stores";

const AccountButton: React.FC = () => {
  const [{ data }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  const [, signMessage] = useSignMessage();

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

  useEffect(() => {
    if (accountData && !load) {
      loadAuth();
      setLoad(true);
    }
  }, [accountData]);

  if (!connector) return <></>;

  if (!accountData) {
    return (
      <Button key={connector.id} onClick={onAuthClick} color="dark">
        Connect
      </Button>
    );
  }

  return (
    <TextButton onClick={disconnect}>
      {accountData.ens?.name || accountData.address.slice(0, 10)}
    </TextButton>
  );
};

export default AccountButton;
