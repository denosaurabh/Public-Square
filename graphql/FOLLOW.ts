import { apolloClient } from "@/apollo/client";
import { gql } from "@apollo/client";

const CREATE_FOLLOW_TYPED_DATA = `
  mutation($request: FollowRequest!) { 
    createFollowTypedData(request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          FollowWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          profileIds
          datas
        }
      }
    }
 }
`;

export const createFollowTypedData = (followRequestInfo) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_FOLLOW_TYPED_DATA),
    variables: {
      request: {
        follow: followRequestInfo,
      },
    },
  });
};

const CREATE_UNFOLLOW_TYPED_DATA = `
mutation($request: UnfollowRequest!) { 
  createUnfollowTypedData(request: $request) {
    id
    expiresAt
    typedData {
      domain {
        name
        chainId
        version
        verifyingContract
      }
      types {
        BurnWithSig {
          name
          type
        }
      }
      value {
        nonce
        deadline
        tokenId
      }
    }
  }
}`;

export const createUnfollowTypedData = (request) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_UNFOLLOW_TYPED_DATA),
    variables: {
      request,
    },
  });
};

export const QUERY_DOES_FOLLOW = `
  query($request: DoesFollowRequest!) {
    doesFollow(request: $request) { 
      followerAddress
      profileId
      follows
    }
  }
`;
