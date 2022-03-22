import { LENSHUB_PROXY } from "@/contratcts";
import { LensHub, LensHub__factory } from "@/typechain-types";
import { useEffect, useState } from "react";
import { useSigner } from "wagmi";

const useLensHub = () => {
  const [{ data }, getSigner] = useSigner();
  const [lensHub, setLensHub] = useState<LensHub | null>(null);

  useEffect(() => {
    if (data && !lensHub) {
      const getLensHub = async () => {
        const signer = await getSigner();

        if (!signer) return;

        setLensHub(LensHub__factory.connect(LENSHUB_PROXY, signer));
      };

      getLensHub();
    }
  }, [data]);

  return lensHub;
};

export default useLensHub;
