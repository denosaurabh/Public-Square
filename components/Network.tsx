import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNetwork } from "wagmi";
import { LightSansSerifText } from "./Text";

const Network = () => {
  const [{ data, error, loading }, switchNetwork] = useNetwork();
  const [switching, setSwitching] = useState(false);

  useEffect(() => {
    if (!window) return;

    if (switchNetwork && data.chain?.name !== "Mumbai" && !switching) {
      try {
        switchNetwork(80001);
        setSwitching(true);

        toast.success("Successfully switched network to polygon");
      } catch (err) {
        toast.error("Please add Polygon Mumabai network to your Metamask");
      }
    }
  }, [data]);

  if (loading || !data) return <></>;

  return <LightSansSerifText> {data.chain?.name}</LightSansSerifText>;
};

export default Network;
