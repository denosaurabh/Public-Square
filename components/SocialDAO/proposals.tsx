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
import { LightSansSerifText, LinkSmallText, Text, TextDefault } from "../Text";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Tabs";
import Editor from "../Editor";

const Proposals = () => {
  return (
    <TransactionContainer>
      <Tabs defaultValue="transactions">
        <TabsList aria-label="View Proposals Tabs" css={{ width: "100%" }}>
          <TabsTrigger value="transactions">Current Proposals</TabsTrigger>
          {/* <Text size="md" css={{ margin: "auto 2rem" }}>
            Create New Proposals
          </Text> */}
          <TabsTrigger value="postpublication">Post Publication</TabsTrigger>
          <TabsTrigger value="advance">Advance Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <AllTransaction />
        </TabsContent>
        <TabsContent value="postpublication">
          <PostPublication />
        </TabsContent>
        <TabsContent value="advance">
          <Advance />
        </TabsContent>
      </Tabs>
    </TransactionContainer>
  );
};

export default Proposals;

const AllTransaction = () => {
  const currentSocialDAOContract = useObservable(
    SocialDAOStore.currentSocialDAOContract
  );
  const noOfTransactions = useObservable(SocialDAOStore.noOfTransactions);
  const transactions = useObservable(SocialDAOStore.transactions);
  const info = useObservable(SocialDAOStore.currentDaoContractInfo);

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

  return (
    <>
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
        {info.owners.map((address: string, i: number) => {
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
    </>
  );
};

const PostPublication = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<DaoPostType>("POST");

  const onPostClick = async () => {
    if (!name || !content) return;

    await SocialDAOStore.postPubication({ name, content, description, type });
  };

  const onSelectValChange = (val: DaoPostType) => {
    if (!val) return;
    setType(val);
  };

  return (
    <ContentInputContainer>
      <Input
        placeholder="Your Post Title"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        css={{ fontSize: "$xxl !important" }}
      />
      <Input
        placeholder="Short Description"
        value={description}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        css={{ fontSize: "$xl !important", marginBottom: "2rem" }}
      />
      <Editor
        placeholder="Your post content goes here..."
        // value={content}
        onChange={(val) => setContent(val)}
        css={{ minHeight: "50rem", padding: "0 2rem" }}
      />

      <Select
        defaultValue={type}
        value={type}
        onValueChange={onSelectValChange}>
        <SelectTrigger css={{ minWidth: "20rem", textAlign: "center" }}>
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
            </SelectItem>
            <SelectItem value={"DISCUSSION"}>
              <SelectItemText>Dsicussion</SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </Select>

      <Button color="action" onClick={onPostClick} css={{ marginTop: "3rem" }}>
        Create
      </Button>
    </ContentInputContainer>
  );
};

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
          <TextDefault
            key={i}
            css={{
              color: "$grey200",
              "&:last-child": {
                borderBottom: 0,
              },
            }}>
            <span>{key}: </span> {data[key]}
          </TextDefault>
        ))}
      </StyledDialogContent>
    </Dialog>
  );
};

const Advance = () => {
  const [abi, setAbi] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [args, setArgs] = useState("");

  const [address, setAddress] = useState("");
  const [value, setValue] = useState(0);

  const onCallClick = async (e) => {
    e.preventDefault();

    await SocialDAOStore.submitProposal(
      abi,
      functionName,
      args,
      address,
      value
    );
  };

  return (
    <>
      <Label size="h1" sansSerif italic>
        Advance Proposals
      </Label>
      <Text css={{ marginBottom: "5rem" }} size="md">
        If you are a developer and want to publish advance proposals, that you
        can&apos;t create with UI. You can create them over here. You should
        have a good understanding of Smart Contracts, Javascript and ethers JS
        library to use this feature.
        <br />
        <br />
        Uses `ethers.Interface` under the hood.
        <a
          href="https://docs.ethers.io/v5/api/utils/abi/interface"
          target="_blank"
          rel="noreferrer">
          https://docs.ethers.io/v5/api/utils/abi/interface
        </a>
      </Text>

      <Propose onSubmit={onCallClick}>
        <LineInput
          type="string"
          placeholder="Contract ABI code"
          value={abi}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAbi(e.target.value)
          }
          required
          // css={{ fontSize: "$xxl !important" }}
        />

        <LineInput
          type="string"
          placeholder="Contract Function name"
          value={functionName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFunctionName(e.target.value)
          }
          required
          // css={{ fontSize: "$xxl !important" }}
        />

        <LineInput
          type="string"
          placeholder="Contract Args, should be a JSON object"
          value={args}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setArgs(e.target.value)
          }
          required
          // css={{ fontSize: "$xxl !important" }}
        />

        <LineInput
          type="string"
          placeholder="Contract address"
          value={address}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAddress(e.target.value)
          }
          required
          // css={{ fontSize: "$xxl !important" }}
        />

        <LineInput
          type="number"
          min="0"
          max="1000"
          placeholder="Transaction amount, can be 0 if none"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          required
          // css={{ fontSize: "$xxl !important" }}
        />

        <Button color="action" css={{ marginTop: "4rem" }}>
          Submit Proposal
        </Button>
      </Propose>
    </>
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

const Propose = styled("form", {
  display: "flex",
  flexDirection: "column",

  gap: "1rem",
});

const LineInput = styled(Input, {
  border: "1px solid $grey300",
  borderRadius: "$500",
});
