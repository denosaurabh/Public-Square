import { LENSHUB_PROXY } from "@/contratcts";
import { LensHub, LensHub__factory } from "@/typechain-types";
import { useEffect, useState } from "react";
import { useSigner } from "wagmi";

// import dynamic from "next/dynamic";
import { ethers } from "ethers";
// import { LENS_HUB_ABI } from "@/abi/LensHub";

// const { LensHub, LensHub__factory } = dynamic(() =>
//   import("@/typechain-types").then((mod) => {
//     return {
//       LensHub: mod.LensHub,
//       LensHub__factory: mod.LensHub__factory,
//     };
//   })
// );

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

// const useLensHub = () => {
//   const [{ data }, getSigner] = useSigner();
//   const [lensHub, setLensHub] = useState<ethers.Contract | null>(null);

//   useEffect(() => {
//     if (data && !lensHub) {
//       const getLensHub = async () => {
//         const signer = await getSigner();

//         if (!signer) return;

//         const lensHub = new ethers.Contract(
//           LENSHUB_PROXY,
//           LENS_HUB_ABI,
//           signer
//         );
//       };

//       setLensHub(lensHub);

//       getLensHub();
//     }
//   }, [data]);

//   return lensHub;
// };

export default useLensHub;
