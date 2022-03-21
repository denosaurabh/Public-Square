import { styled } from "@/stitches.config";
import { H3 } from "@/components/Heading";
import { SuperDenoDAOStore } from "@/stores/SuperDenoDAOStore";
import { useStore, useObservable } from "@/stores";
import { useEffect, useState } from "react";
import { SUPER_DENO_DAO } from "@/contratcts";
import SuperDeno from "@/artifacts/contracts/SocialDao.sol/SuperDeno.json";
import { useContract, useSigner } from "wagmi";
import Link from "next/link";

const SocialDaos = () => {
  const [{ data: signer, error, loading }, getSigner] = useSigner();

  const [names, setNames] = useState<string[]>([]);

  const contract = useContract({
    addressOrName: SUPER_DENO_DAO,
    contractInterface: SuperDeno.abi,
    signerOrProvider: signer,
  });

  const socialDaoStore = useStore(SuperDenoDAOStore);
  const daosNames = useObservable(socialDaoStore.daoNames);

  useEffect(() => {
    if (!window) return;

    const getNames = async () => {
      if (!contract || !signer) return;
      if (names.length) return;

      const allNames = await contract.allDaoNames();
      setNames(allNames);
      //   await socialDaoStore.getContract();
      //   await socialDaoStore.getAllDaosNames(contract);
    };

    // if (!daosNames.length) {
    console.log("getting daos names");
    getNames();
    // }
  }, [, contract, signer]);

  return (
    <DaosContainer>
      {names.map((name, i) => {
        return (
          <Link href={`/social/${name}`} passHref key={i}>
            <H3>{name}</H3>
          </Link>
        );
      })}
    </DaosContainer>
  );
};

export default SocialDaos;

const DaosContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});
