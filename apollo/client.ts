import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: "https://api-mumbai.lens.dev" });

const authLink = new ApolloLink((operation, forward) => {
  const localData = localStorage.getItem("@auth");
  const token = JSON.parse(
    localData ? localData : '{"accessToken": ""}'
  )?.accessToken;

  operation.setContext({
    headers: {
      "x-access-token": token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const apolloClientWithoutAuth = new ApolloClient({
  ssrMode: true,
  link: httpLink,
  cache: new InMemoryCache(),
});
