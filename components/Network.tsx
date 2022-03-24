import { useNetwork } from "wagmi";
import { LightSansSerifText } from "./Text";

const Network = () => {
  const [{ data, error, loading }, switchNetwork] = useNetwork();

  if (loading || !data) return <></>;

  return <LightSansSerifText> {data.chain?.name}</LightSansSerifText>;
};

export default Network;
