import type { AppProps } from "next/app";
import { globalStyles } from "@/stitches.config";
import { useEffect } from "react";
import "micro-observables/batchingForReactDom";
import { SWRConfig } from "swr";
import { apolloClient } from "@/apollo/client";
import { ApolloProvider, gql } from "@apollo/client";
import PageContainer from "@/layouts/PageContainer";
import { ToastContainer } from "@/components/ToastContainer";
import { Provider, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import SEO from "@/components/seo";
// import WalletConnect from "@walletconnect/web3-provider";
// import { sequence } from "0xsequence";
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
// import { SequenceConnect } from "@/utils/sequenceConnect";

// const store = createStore();

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  // const [sequenceProvider, setSequenceProvider] = useState({
  //   walletconnect: {
  //     package: WalletConnect,
  //     options: {
  //       infuraId: "c352645ba30f49f4b714a51948a1c4b7",
  //     },
  //   },
  // });

  const connectors = [
    new InjectedConnector({ chains: defaultChains }),
    // new SequenceConnect({ chains: defaultChains }),
  ];

  useEffect(() => {
    console.log("Thank you for coming here! @denosaurabh");

    if (!window) return;

    // if (window && !window?.ethereum?.isSequence) {
    //   setSequenceProvider({
    //     ...sequenceProvider,
    //     sequence: {
    //       package: sequence,
    //       options: {
    //         appName: "Public Square",
    //         defaultNetwork: "mumbai",
    //       },
    //     },
    //   });
    // }
  }, []);

  return (
    <Provider autoConnect connectors={connectors}>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (query, variables) =>
            apolloClient.query({
              query: gql(query),
              variables,
            }),
        }}>
        <ApolloProvider client={apolloClient}>
          <PageContainer>
            <SEO />
            <Component {...pageProps} />
            <ToastContainer />
          </PageContainer>
        </ApolloProvider>
      </SWRConfig>
    </Provider>
  );
}

export default MyApp;

/* </StoreProvider> */
