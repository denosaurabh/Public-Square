// import { useStore, useObservable } from "@/stores";
// import { AuthStore } from "@/stores/AuthStore";
// import { useEffect, useState } from "react";
// import { useAccount, useConnect, useSigner, useSignMessage } from "wagmi";
// import { Button, TextButton } from "./Button";
// import { smallAddress } from "@/utils";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectViewport,
//   SelectItem,
//   SelectItemText,
// } from "./Select";
// import { LightSansSerifText } from "./Text";
// import { toast } from "react-toastify";

// const AccountButton: React.FC = () => {
//   const [{ data }, connect] = useConnect();
//   const [{ data: accountData }, disconnect] = useAccount();
//   const [, signMessage] = useSignMessage();
//   const [{ data: signer, error, loading }, getSigner] = useSigner();

//   const [accountChoice, setAccountChoice] = useState("metamask");

//   const [open, setOpen] = useState(false);
//   const [load, setLoad] = useState(false);

//   const authStore = useStore(AuthStore);
//   const accessToken = useObservable(authStore.accessToken);
//   const authSigner = useObservable(authStore.signer);

//   // const connector = data.connectors.filter((c) => c.name === "MetaMask")[0];

//   const onAuthClick = async (val: string) => {
//     try {
//       if (val === "metamask") {
//         await connect(data.connectors[0]);
//       } else if (val === "sequence") {
//         console.log("onAuthClick", val);

//         await connect(data.connectors[1]);
//       }

//       toast.success("Successfully connected to wallet");
//       setOpen(false);
//     } catch (err) {
//       toast.error("Could not connect to wallet! " + err);
//       setOpen(false);
//     }
//   };

//   const onSelectAccountConnectChange = (val: string) => {
//     if (val) {
//       setAccountChoice(val);
//     }
//   };

//   const disconnectAuth = async () => {
//     disconnect();

//     authStore.logout();
//   };

//   useEffect(() => {
//     if (!window) return;

//     const loadAuth = async () => {
//       authStore.updateFromLocalStorage();
//       authStore.refreshAuth();

//       if (accessToken) return;

//       if (accountData?.address) {
//         console.log("accountData", accountData);

//         authStore?.address.set(accountData.address);
//         const challange = await authStore?.getChallange();

//         if (challange) {
//           const sign = await signMessage({
//             message: challange?.data.challenge.text,
//           });

//           if (sign.data) {
//             authStore?.signature.set(sign.data);

//             // authenticating
//             await authStore?.authenticate();
//           }
//         }
//       }

//       setLoad(true);
//     };

//     if (accountData && !load) {
//       loadAuth();
//     }
//   }, [, accountData]);

//   useEffect(() => {
//     if (!window) return;

//     if (signer && !authSigner) {
//       authStore.signer.set(signer);
//     }
//   }, [signer, authSigner]);

//   if (!accountData) {
//     return (
//       <TextButton onClick={() => onAuthClick("metamask")}>Connect</TextButton>
//     );

//     return (
//       <Select
//         defaultValue={accountChoice}
//         value={accountChoice}
//         onValueChange={onSelectAccountConnectChange}
//         onOpenChange={(val) => setOpen(true)}
//         open={open}>
//         <SelectTrigger>
//           <SelectValue>Connect</SelectValue>
//         </SelectTrigger>

//         <SelectContent css={{ backgroundColor: "$grey200" }}>
//           <SelectViewport>
//             <SelectItem
//               value="metamask"
//               key="metamask"
//               onClick={(e) => {
//                 e.preventDefault();
//                 onAuthClick("metamask");
//               }}>
//               <SelectItemText>Metamask</SelectItemText>
//             </SelectItem>

//             {/* <SelectItem
//               value="sequence"
//               key="sequence"
//               onClick={(e) => {
//                 e.preventDefault();
//                 onAuthClick("sequence");
//               }}>
//               <SelectItemText>Sequence</SelectItemText>
//             </SelectItem> */}
//           </SelectViewport>
//         </SelectContent>
//       </Select>
//     );
//   }

//   return (
//     <TextButton onClick={disconnectAuth}>
//       {accountData.ens?.name || smallAddress(accountData.address)}
//     </TextButton>
//   );
// };

// export default AccountButton;

export {};
