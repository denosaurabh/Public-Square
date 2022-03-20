import { apolloClient } from "@/apollo/client";
import { gql } from "@apollo/client";

export const CREATE_COLLECT_TYPED_DATA = `
mutation($request: CreateCollectRequest!) { 
    createCollectTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          CollectWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
				pubId
        data
      }
     }
   }
 }
`;

export const createCollectTypedData = (
  createCollectTypedDataRequest: Record<string, any>
) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_COLLECT_TYPED_DATA),
    variables: {
      request: createCollectTypedDataRequest,
    },
  });
};
