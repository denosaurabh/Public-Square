import { useNetwork } from "wagmi";
import { SemiBoldText } from "./Text";

const Network = () => {
  const [{ data, error, loading }, switchNetwork] = useNetwork();

  if (loading) return <></>;

  return <SemiBoldText> {data.chain?.name}</SemiBoldText>;
};

export default Network;
