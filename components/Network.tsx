import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import { LightSansSerifText } from "./Text";

const Network = () => {
  const [{ data, error, loading }, switchNetwork] = useNetwork();
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    if (!window) return;

    if (switchNetwork && data.chain?.name !== "Mumbai" && !switching) {
      switchNetwork(80001);
      setSwitching(true);
    }
  }, [data]);

  if (loading || !data) return <></>;

  return <LightSansSerifText> {data.chain?.name}</LightSansSerifText>;
};

export default Network;
