import { styled } from "@/stitches.config";
import { H1, H3 } from "@/components/Heading";
import { SuperDenoDAOStore } from "@/stores/SuperDenoDAOStore";
import { useObservable } from "@/stores";
import { useEffect, useState } from "react";
import { SUPER_DENO_DAO } from "@/contratcts";
import SuperDeno from "@/artifacts/contracts/SocialDao.sol/SuperDeno.json";
import { useContract, useSigner } from "wagmi";
import Profile from "@/components/Profile";
import { LightSansSerifText, TextDefault } from "@/components/Text";

const SocialDaos = () => {
  const [{ data: signer, error, loading }, getSigner] = useSigner();

  const contract = useContract({
    addressOrName: SUPER_DENO_DAO,
    contractInterface: SuperDeno.abi,
    signerOrProvider: signer,
  });

  // const socialDaoStore = useStore(SuperDenoDAOStore);
  const allDaos = useObservable(SuperDenoDAOStore.allDaos);

  useEffect(() => {
    if (!window) return;

    const getNames = async () => {
      if (!contract || !signer) return;

      const allNames = await SuperDenoDAOStore.getAllDaosNames(contract);
      await SuperDenoDAOStore.fetchDaosByNames(allNames);
      //   await socialDaoStore.getContract();
    };

    // if (!daosNames.length) {
    console.log("getting daos names");
    getNames();
    // }
  }, [, contract, signer]);

  console.log("allDaos", allDaos);

  return (
    <>
      <H1 italic sansSerif>
        Social Daos
      </H1>
      <TextDefault
        italic
        sansSerif
        css={{ padding: 0, margin: 0, marginBottom: "4rem" }}>
        There Social Daos are special. There are simply lens profiles controlled
        by multiple accounts, proposing propsals for anything and so opening
        many possibilies. More about this soon....
      </TextDefault>

      <DaosContainer>
        {allDaos.length ? (
          allDaos.map((dao, i) => {
            return <Profile {...dao} key={i} />;
          })
        ) : (
          <LightSansSerifText>Loading....</LightSansSerifText>
        )}

        {/* {!allDaos.length ? (
        <LightSansSerifText>No Daos</LightSansSerifText>
      ) : null} */}
      </DaosContainer>
    </>
  );
};

export default SocialDaos;

const DaosContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  // flexDirection: "column",
  gap: "1.5rem",
});
