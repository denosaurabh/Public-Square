import { styled } from "@/stitches.config";
import { TextDefault } from "./Text";

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
      <TextDefault>
        <h6>{name}</h6>
      </TextDefault>
      <TextDefault>
        <span>chainId: </span>
        {chainId}
      </TextDefault>
      <TextDefault>CollectionName: {collectionName}</TextDefault>
      <TextDefault>ERCType: {ercType}</TextDefault>

      <TextDefault as="a" href={contentURI}>
        Raw Data Link
      </TextDefault>
      {/* <Text>{name}</Text> */}
    </NFTBox>
  );
};

export default NFT;

const NFTBox = styled("div", {
  width: "25rem",
  height: "30rem",

  //   padding: "2rem",

  border: "1px solid $grey300",
  borderRadius: 20,

  display: "flex",
  flexDirection: "column",

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

    borderBottom: "1px solid $grey300",
  },

  a: {
    marginTop: "2rem",
    textAlign: "center",
  },
});
