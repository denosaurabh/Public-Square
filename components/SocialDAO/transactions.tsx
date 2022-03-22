import { styled } from "@/stitches.config";
import { useStore, useObservable } from "@/stores";
import { SocialDAOStore } from "@/stores/SocialDaoStore";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../Button";
import ContentInput from "../ContentInput";
import { H3, H5 } from "../Heading";
import Input from "../Input";
import { TextArea } from "../TextArea";
import "draft-js/dist/Draft.css";
import { Text } from "../Text";
import { smallAddress } from "@/utils";

const Transactions = () => {
  const [showAddPost, setShowAddPost] = useState(false);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const socialDao = useStore(SocialDAOStore);
  const currentSocialDAOContract = useObservable(
    socialDao.currentSocialDAOContract
  );
  const noOfTransactions = useObservable(socialDao.noOfTransactions);
  const transactions = useObservable(socialDao.transactions);
  const info = useObservable(socialDao.currentDaoContractInfo);

  const onPostClick = async () => {
    if (!name || !content) return;

    await socialDao.postPubication(name, content);
  };

  useEffect(() => {
    const getDaoTXsInfo = async () => {
      await socialDao.getNoOfTransactions();
      await socialDao.getAllTransactions();
    };

    if (currentSocialDAOContract) {
      getDaoTXsInfo();
    }
  }, [currentSocialDAOContract]);

  return (
    <TransactionContainer>
      <PublishButton onClick={() => setShowAddPost(!showAddPost)}>
        {!showAddPost ? "Publish New Post" : "Cancel"}
      </PublishButton>

      {showAddPost && (
        <ContentInputContainer>
          <Input
            placeholder="Your Post Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextArea
            placeholder="enter content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Button onClick={onPostClick}>Post</Button>
        </ContentInputContainer>
      )}
      <TotalTxHeading>
        Total <span>{noOfTransactions}</span> Transactions has been made so
        far...
      </TotalTxHeading>

      {transactions.map((tx: TransactionProps, i) => (
        <Transaction key={i} {...tx} />
      ))}

      <Text>transactions controlled by {info.owners.join(", ")}</Text>
    </TransactionContainer>
  );
};

export default Transactions;

interface TransactionProps {
  txNo: number;
  to: string;
  value: number;
  data: string[];
  executed: boolean;
  numConfirmations: number;
}

const Transaction: React.FC<TransactionProps> = ({
  txNo,
  to,
  value,
  data,
  executed,
  numConfirmations,
}) => {
  const socialDao = useStore(SocialDAOStore);

  const onConfirmTxClick = async () => {
    await socialDao.confirmTransaction(txNo);
  };

  const onExecuteTxClick = async () => {
    await socialDao.executeTransaction(txNo);
  };

  return (
    <TransactionBox>
      <Text>
        <span>to: </span> {smallAddress(to, 10)}
      </Text>
      <Text>
        <span>value: </span> {value}
      </Text>
      <Text>
        <span>executed: </span> {executed ? "yes" : "no"}
      </Text>
      <Text>
        <span>confirmations: </span> {numConfirmations}
      </Text>

      {numConfirmations && <Text>Transaction has been confirmed</Text>}
      {executed && <Text>Transaction has been executed</Text>}
      {/* <H5>{data}</H5> */}

      <ActionBox>
        <Button onClick={onConfirmTxClick}>Confirm Tx</Button>
        <Button onClick={onExecuteTxClick} disabled={executed}>
          Execute Tx
        </Button>
      </ActionBox>
    </TransactionBox>
  );
};

const TransactionContainer = styled("div", {});

const ContentInputContainer = styled("div", {
  marginTop: "5rem",
});

const PublishButton = styled(Button, {
  margin: "3rem auto",
});

const TotalTxHeading = styled(H5, {
  margin: "6rem 0 !important",

  color: "grey",
  span: { color: "black", fontSize: "150%" },
});

const TransactionBox = styled("div", {
  display: "flex",
  flexDirection: "column",

  width: "30rem",
  height: "fit-content",

  border: "1px solid #D3D3D3",
  borderRadius: "14px",

  margin: "4rem",

  p: {
    display: "flex",

    padding: "1rem 2rem",
    margin: "0",

    fontWeight: "500",

    span: {
      fontWeight: "400",
      marginRight: "auto",
    },

    borderBottom: "1px solid #D3D3D3",
  },
});

const ActionBox = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",

  padding: "1rem",
});
