import { styled } from "@/stitches.config";
import { Text } from "./Text";

interface NFTProps {
  contractName: string;
  contractAddress: string;
  symbol: string;
  tokenId: string;
  owners: [
    {
      amount: 1;
      address: string;
    }
  ];
  name: string;
  description: string;
  contentURI: string;
  originalContent: {
    uri: string;
    metaType: string;
  };
  chainId: 1;
  collectionName: string;
  ercType: string;
}

const NFT: React.FC<NFTProps> = ({
  name,
  chainId,
  collectionName,
  ercType,
  contentURI,
}) => {
  return (
    <NFTBox>
      <Text>
        <h6>{name}</h6>
      </Text>
      <Text>
        <span>chainId: </span>
        {chainId}
      </Text>
      <Text>CollectionName: {collectionName}</Text>
      <Text>ERCType: {ercType}</Text>

      <Text as="a" href={contentURI}>
        Raw Data Link
      </Text>
      {/* <Text>{name}</Text> */}
    </NFTBox>
  );
};

export default NFT;

const NFTBox = styled("div", {
  width: "25rem",
  height: "30rem",

  //   padding: "2rem",

  border: "1px solid #D3D3D3",
  borderRadius: 20,

  p: {
    margin: 0,
    padding: "1.5rem 2rem",

    h6: {
      fontSize: "$md",
      fontWeight: 500,
    },

    span: {
      fontSize: "$sm",
      fontWeight: 500,
    },

    borderBottom: "1px solid #D3D3D3",
  },

  a: {
    width: "100%",
    textAlign: "center",
  },
});
