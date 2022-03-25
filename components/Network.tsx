import { useEffect } from "react";
import { useNetwork } from "wagmi";
import { LightSansSerifText } from "./Text";

const Network = () => {
  const [{ data, error, loading }, switchNetwork] = useNetwork();

  useEffect(() => {
    if (!window) return;

    if (switchNetwork && data.chain?.name !== "Mumbai") {
      switchNetwork(80001);
    }
  }, [data]);

  if (loading || !data) return <></>;

  return <LightSansSerifText> {data.chain?.name}</LightSansSerifText>;
};

export default Network;
