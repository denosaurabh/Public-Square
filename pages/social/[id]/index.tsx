import { Avatar, AvatarGroup, AvatarImage } from "@/components/Avatar";
import { Button } from "@/components/Button";
import Follow from "@/components/follow";
import FollowPromises from "@/components/FollowPromises";
import { H1 } from "@/components/Heading";
import Post from "@/components/Post";
import SocialDAOTab from "@/components/SocialDaoTab";
import {
  LightSansSerifText,
  LinkSmallText,
  SemiBoldText,
  SmallText,
  TextDefault,
} from "@/components/Text";
import { SUPER_DENO_DAO } from "@/contratcts";
import { EXPLORE_PUBLICATIONS } from "@/graphql/DISCOVERY";
import { styled } from "@/stitches.config";
import { PostsContainer } from "@/components/PostsContainer";
import { cleanUrl, EMPTY_ADDRESS } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useContract, useSigner } from "wagmi";
import SuperDeno from "@/artifacts/contracts/SocialDao.sol/SuperDeno.json";
import SocialDao from "@/artifacts/contracts/SocialDao.sol/SocialDAO.json";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Constitution from "@/components/SocialDAO/constitution";
import { useStore, useObservable } from "@/stores";
import { SocialDAOStore } from "@/stores/SocialDaoStore";
import { LineBox } from "@/components/LineBox";
import { SuperDenoDAOStore } from "@/stores/SuperDenoDAOStore";

const SocialDAO = () => {
  const router = useRouter();
  const { id: daoName } = router.query;

  const [{ data: signer }] = useSigner();

  // const contract = useContract({
  //   addressOrName: SUPER_DENO_DAO,
  //   contractInterface: SuperDeno.abi,
  //   signerOrProvider: signer,
  // });

  // const [info, setInfo] = useState<any>({
  //   address: "",
  //   name: "",
  //   constitution: ["", "", ""],
  //   owners: [],
  // });

  // const socialDao = useStore(SocialDAOStore);
  const info = useObservable(SocialDAOStore.currentDaoContractInfo);
  // const contract = useObservable(SocialDAOStore.currentSocialDAOContract);

  useEffect(() => {
    if (!window) return;

    const getDaoInfo = async () => {
      if (!window) return;
      if (!daoName || !signer) return;

      const contract = await SuperDenoDAOStore.getContract();

      if (!contract) return;

      await SocialDAOStore.getDAOInfoByName(`${daoName}`, signer, contract);

      //   if (!contract || !signer) return;

      //   const address = await contract.getDAOAddressByName(daoName);
      //   console.log("address", address);

      //   if (address === EMPTY_ADDRESS || !address) return;

      //   const socialDao = new ethers.Contract(address, SocialDao.abi, signer);

      //   const info = await socialDao.getInfo();
      //   console.log("info", info);

      //   if (info.length) {
      //     setInfo({
      //       address,
      //       owners: info[0],
      //       name: info[1],
      //       constitution: info[2],
      //     });
      //   }

      //   // setNames(names);
      //   //   await socialDaoStore.getContract();
      //   //   await socialDaoStore.getAllDaosNames(contract);
      // };

      // // if (!daosNames.length) {
      // console.log("getting daos names");
      // getDaoInfo();
    };

    if (signer) {
      getDaoInfo();
    }
  }, [, signer]);

  // useEffect(() => {
  //   if (socialDao) {
  //     // socialDao.currentDaoProfileInfo.set(null);
  //     // socialDao.currentDaoContractInfo.set(null);
  //   }
  // }, []);

  // let profileDataRes = {
  //   data: {
  //     profiles: {
  //       items: [
  //         {
  //           handle: "Science",
  //           bio: "Synthetic diamond is diamond produced in a technological process. Claims of diamond synthesis were documented between 1879 and 1928 but none have been confirmed. In the 1940s, research began in the United States, Sweden and the Soviet Union to grow diamond using chemical vapor deposition (CVD) and high-pressure high-temperature (HPHT) processes. The first reproducible synthesis was in 1953. CVD and HPHT still dominate the production of synthetic diamonds,",
  //           picture: null,
  //           id: "",
  //           followModule: [],
  //           ownedBy: "0x438E2EC928a5975113Da95E0114Cc3B075bA5aDC",
  //           website: "https://www.science.com",
  //           twitterUrl: "https://twitter.com/science",
  //           location: "",
  //         },
  //       ],
  //     },
  //   },
  // };

  // const { data } = profileDataRes;

  // const {
  //   handle,
  //   bio,
  //   picture,
  //   id: profileId,
  //   followModule,
  //   ownedBy,
  // } = data?.profiles.items[0];

  // const onUpdateClick = async () => {
  //   if (!contract || !signer) return;

  //   const address = await contract.getDAOAddressByName(daoName);
  //   console.log("address", address);

  //   const socialDao = new ethers.Contract(address, SocialDao.abi, signer);

  //   const tx = await socialDao.setLensProfileAndInfo("hellothisisdao", [
  //     "ipfs://hellothisisdao_uri",
  //   ]);
  //   console.log("tx", tx);
  // };

  if (!info?.name) return <LightSansSerifText>Loading...</LightSansSerifText>;

  return (
    <Container>
      <TopContainer>
        <LeftBox>
          <Avatar
            css={{ width: "120px", height: "120px", marginBottom: "1rem" }}>
            <AvatarImage
              src={
                info.picture?.original.url ||
                `https://source.boringavatars.com/marble/25/${info.handle}`
              }
              alt="deno"
            />
          </Avatar>

          <AvatarGroup gap="-0.5rem">
            {[...Array(info.owners.length)].map((v, i) => (
              <Avatar key={i}>
                <AvatarImage
                  src={`https://source.boringavatars.com/marble/25/${i}`}
                  alt="deno"
                />
              </Avatar>
            ))}
          </AvatarGroup>
          <LightSansSerifText css={{ textAlign: "center" }}>
            {info.owners.length} owner{info.owners.length > 1 ? "s" : ""}
          </LightSansSerifText>
        </LeftBox>
        <CenterBox>
          <H1>{info.name}</H1>

          {info.bio ? (
            <TextDefault css={{ margin: 0 }}>{info.bio}</TextDefault>
          ) : (
            <TextDefault sansSerif>no bio....</TextDefault>
          )}

          <ButtonsContainer>
            {/* <Follow
              profileId={info.profileId}
              followerAddress={info.ownedBy}
              followModule={info.followModule}
            /> */}
            {/* <Button>Join</Button> */}
            <Constitution constitutions={info.constitutions} />
          </ButtonsContainer>
        </CenterBox>
      </TopContainer>

      <SocialDAOTab />
    </Container>
  );
};

export default SocialDAO;

const Container = styled("div", { marginTop: "5rem" });

const TopContainer = styled(LineBox, {
  display: "flex",
  gap: "2rem",

  width: "100%",

  padding: "2rem",
  margin: "0 auto",

  borderRadius: "$500",
});

const LeftBox = styled("div", {});
const CenterBox = styled("div", {});

const ButtonsContainer = styled("div", {
  display: "flex",
  gap: "1rem",

  marginTop: "2rem",
});
