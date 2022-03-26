import { styled } from "@/stitches.config";
import { useObservable } from "@/stores";
import { DaoPostType, SocialDAOStore } from "@/stores/SocialDaoStore";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../Button";
import ContentInput from "../ContentInput";
import { H3, H5, H6 } from "../Heading";
import Input from "../Input";
import { TextArea } from "../TextArea";
import "draft-js/dist/Draft.css";
import { LightSansSerifText, LinkSmallText, TextDefault } from "../Text";
import { smallAddress } from "@/utils";
import { Dialog, DialogContent, DialogTrigger } from "../Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "../Select";
import Link from "next/link";

const Transactions = () => {
  const [showAddPost, setShowAddPost] = useState(false);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<DaoPostType>("POST");

  // const socialDao = useStore(SocialDAOStore);
  const currentSocialDAOContract = useObservable(
    SocialDAOStore.currentSocialDAOContract
  );
  const noOfTransactions = useObservable(SocialDAOStore.noOfTransactions);
  const transactions = useObservable(SocialDAOStore.transactions);
  const info = useObservable(SocialDAOStore.currentDaoContractInfo);

  const onPostClick = async () => {
    if (!name || !content) return;

    await SocialDAOStore.postPubication({ name, content, description, type });
  };

  useEffect(() => {
    const getDaoTXsInfo = async () => {
      await SocialDAOStore.getNoOfTransactions();
      await SocialDAOStore.getAllTransactions();
    };

    if (currentSocialDAOContract) {
      getDaoTXsInfo();
    }
  }, [currentSocialDAOContract]);

  const confirmingProposals = transactions.filter(
    (e: TransactionProps) =>
      e.numConfirmations < e.totalNoOfConfirmations && !e.executed
  );
  const toBeExecutedProposals = transactions.filter(
    (e: TransactionProps) =>
      e.numConfirmations === e.totalNoOfConfirmations && !e.executed
  );

  const executedProposals = transactions.filter(
    (e: TransactionProps) => e.executed
  );

  const onSelectValChange = (val: DaoPostType) => {
    if (!val) return;
    setType(val);
  };

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
          <Input
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextArea
            placeholder="enter content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Select
            defaultValue={type}
            value={type}
            onValueChange={onSelectValChange}>
            <SelectTrigger>
              <SelectValue>
                {/* {dataRes &&
            data &&
            activeAccount &&
            dataRes?.data?.profiles.items.filter(
              (a) => a.handle === activeAccount
            )[0].handle} */}
                {type}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectViewport>
                <SelectItem value={"POST"}>
                  <SelectItemText>Post</SelectItemText>
                </SelectItem>
                <SelectItem value={"SUBJECT"}>
                  <SelectItemText>Subject</SelectItemText>
                </SelectItem>{" "}
                <SelectItem value={"DISCUSSION"}>
                  <SelectItemText>Dsicussion</SelectItemText>
                </SelectItem>
              </SelectViewport>
            </SelectContent>
          </Select>

          <Button onClick={onPostClick} css={{ marginTop: "3rem" }}>
            Create
          </Button>
        </ContentInputContainer>
      )}
      <TotalTxHeading size="h2">
        Total <span>{noOfTransactions}</span> Transactions has been made so
        far...
      </TotalTxHeading>

      <Label size="h5">Confirming proposals</Label>
      <TransactionsBoxContainer>
        {confirmingProposals.map((tx: TransactionProps, i: number) => (
          <Transaction key={i} {...tx} />
        ))}
        {!confirmingProposals.length && (
          <LightSansSerifText>No confirming proposals</LightSansSerifText>
        )}
      </TransactionsBoxContainer>

      <Label size="h5">To be executed proposals</Label>
      <TransactionsBoxContainer>
        {toBeExecutedProposals.map((tx: TransactionProps, i: number) => (
          <Transaction key={i} {...tx} />
        ))}
        {!toBeExecutedProposals.length && (
          <LightSansSerifText>No To be executed proposals</LightSansSerifText>
        )}
      </TransactionsBoxContainer>

      <Label size="h5">Executed proposals</Label>
      <TransactionsBoxContainer>
        {executedProposals.map((tx: TransactionProps, i: number) => (
          <Transaction key={i} {...tx} />
        ))}
        {!executedProposals.length && (
          <LightSansSerifText>No executed proposals</LightSansSerifText>
        )}
      </TransactionsBoxContainer>

      <TextDefault>
        owned by transactions controlled by:
        {info.owners.map((address, i) => {
          return (
            <Link key={i} href={`/address/${address}`} passHref>
              <a>
                <LinkSmallText css={{ margin: 0, padding: 0 }}>
                  {address}
                </LinkSmallText>
              </a>
            </Link>
          );
        })}
      </TextDefault>
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
  totalNoOfConfirmations: number;
}

const Transaction: React.FC<TransactionProps> = ({
  txNo,
  to,
  value,
  data,
  executed,
  numConfirmations,
  totalNoOfConfirmations,
}) => {
  // const socialDao = useStore(SocialDAOStore);

  const onConfirmTxClick = async () => {
    await SocialDAOStore.confirmTransaction(txNo);
  };

  const onRevokeTxClick = async () => {
    await SocialDAOStore.revokeTransaction(txNo);
  };

  const onExecuteTxClick = async () => {
    await SocialDAOStore.executeTransaction(txNo);
  };

  console.log(data);

  return (
    <TransactionBox>
      <TextDefault>
        <span>TX No: </span> {txNo}
      </TextDefault>
      <TextDefault>
        <span>amount: </span> {value}
      </TextDefault>
      <TextDefault>
        <span>executed: </span> {executed ? "yes" : "no"}
      </TextDefault>
      <TextDefault>
        <span>confirmations: </span> {numConfirmations} /{" "}
        {totalNoOfConfirmations}
      </TextDefault>
      <TextDefault>
        <span>data: </span> <TransactionData data={data} />
      </TextDefault>

      {numConfirmations === totalNoOfConfirmations && (
        <TextDefault>Transaction has been confirmed</TextDefault>
      )}
      {executed && <TextDefault>Transaction has been executed</TextDefault>}

      <ActionBox>
        <Button
          onClick={onConfirmTxClick}
          disabled={numConfirmations === totalNoOfConfirmations}>
          Confirm Tx
        </Button>

        <Button onClick={onExecuteTxClick} disabled={executed}>
          Execute Tx
        </Button>
      </ActionBox>
    </TransactionBox>
  );
};

interface TransactionDataProps {
  data: Record<string, any>;
}

const TransactionData: React.FC<TransactionDataProps> = ({ data }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <u>see</u>
      </DialogTrigger>
      <StyledDialogContent>
        {Object.keys(data).map((key, i) => (
          <TextDefault key={i}>
            <span>{key}: </span> {data[key]}
          </TextDefault>
        ))}
      </StyledDialogContent>
    </Dialog>
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
  span: {
    color: "$grey400",
    fontSize: "150%",
    fontWeight: "500",
  },
});

const TransactionsBoxContainer = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "5rem",

  marginBottom: "5rem",
});

const TransactionBox = styled("div", {
  display: "flex",
  flexDirection: "column",

  width: "30rem",
  height: "fit-content",

  border: "1px solid $grey300",
  borderRadius: "14px",

  p: {
    display: "flex",

    padding: "1rem 2rem",
    margin: "0",

    fontWeight: "500",

    span: {
      fontWeight: "400",
      marginRight: "auto",
    },

    u: {
      "&:hover": {
        cursor: "pointer",
      },
    },

    borderBottom: "1px solid $grey300",
  },
});

const Label = styled(H6, {
  margin: "2rem 1rem",
});

const ActionBox = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",

  padding: "1rem",
});

const StyledDialogContent = styled(DialogContent, {
  display: "flex",
  flexDirection: "column",

  width: "70rem",
  height: "fit-content",

  border: "1px solid $grey300",
  borderRadius: "14px",

  p: {
    display: "flex",

    padding: "1rem 2rem",
    margin: "0",

    fontWeight: "500",

    span: {
      fontWeight: "400",
      marginRight: "auto",
    },

    borderBottom: "1px solid $grey300",
  },
});
