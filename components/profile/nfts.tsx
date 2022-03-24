import { QUERY_NFTS } from "@/graphql/NFTs";
import { QUERY_PUBLICATIONS } from "@/graphql/PUBLICATIONS";
import { PostsContainer } from "@/style/posts";
import { useRouter } from "next/router";
import useSWR from "swr";
import NFT from "../NFT";
import Post from "../Post";
import { LightSansSerifText } from "../Text";

const NFTs: React.FC = ({ ownerAddress }) => {
  const router = useRouter();

  const { data: nftsDataRes } = useSWR([
    QUERY_NFTS,
    {
      request: {
        ownerAddress,
        chainIds: [80001],
        limit: 30,
      },
    },
  ]);

  console.log("nftsDataRes", nftsDataRes);

  if (!nftsDataRes) return <LightSansSerifText>loading....</LightSansSerifText>;

  const nfts = nftsDataRes?.data.nfts.items;

  return (
    <PostsContainer>
      {nfts ? (
        nfts.map((nft: any, i) => {
          return <NFT {...nft} key={i} />;
        })
      ) : (
        <LightSansSerifText>loading....</LightSansSerifText>
      )}

      {!nfts.length ? <LightSansSerifText>No NFTs</LightSansSerifText> : null}
    </PostsContainer>
  );
};

export default NFTs;
