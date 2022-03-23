import type { AppProps } from "next/app";
import { globalStyles } from "@/stitches.config";
import { Provider } from "wagmi";
import { createStore, StoreProvider } from "@/stores";
import { useEffect } from "react";
import "micro-observables/batchingForReactDom";
import { SWRConfig } from "swr";
import { apolloClient } from "@/apollo/client";
import { gql } from "@apollo/client";
import PageContainer from "@/layouts/PageContainer";
import { ToastContainer } from "@/components/ToastContainer";

const store = createStore();

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();

  useEffect(() => {
    console.log("Thank you for coming here! @denosaurabh");
  }, []);

  return (
    <StoreProvider store={store}>
      <Provider autoConnect>
        <SWRConfig
          value={{
            refreshInterval: 3000,
            fetcher: (query, variables) =>
              apolloClient.query({
                query: gql(query),
                variables,
              }),
          }}>
          <PageContainer>
            <Component {...pageProps} />
            <ToastContainer />
          </PageContainer>
        </SWRConfig>
      </Provider>
    </StoreProvider>
  );
}

export default MyApp;

/* </StoreProvider> */
