import { apolloClient } from "@/apollo/client";
import { gql } from "@apollo/client";

export const QUERY_PROFILE_BY_ID = `
query ($request: ProfileQueryRequest!) {
  profiles(request: $request) {
    items {
      id
      name
      bio
      location
      website
      twitterUrl
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      handle
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      ownedBy
      depatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          amount {
            asset {
              symbol
              name
              decimals
              address
            }
            value
          }
          recipient
        }
        __typename
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
`;

export const QUERY_PROFILES_OWNED_BY_ADDRESS = `
query ($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        id
        name
        bio
        location
        website
        twitterUrl
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        depatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          __typename
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }`;

export const CREATE_SET_FOLLOW_MODULE_TYPED_DATA = `
  mutation($request: CreateSetFollowModuleRequest!) { 
    createSetFollowModuleTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          SetFollowModuleWithSig {
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
        followModule
        followModuleData
      }
     }
   }
 }
`;

export const MUTATE_PROFILE = `
    mutation($request: CreateProfileRequest!) { 
        createProfile(request: $request) {
        ... on RelayerResult {
            txHash
        }
        ... on RelayError {
            reason
        }
                __typename
        }
    }
`;

export const UPDATE_PROFILE = `
  mutation($request: UpdateProfileRequest!) { 
    updateProfile(request: $request) {
      id
    }
  }
`;

export const createProfile = (createProfileRequest) => {
  return apolloClient.mutate({
    mutation: gql(MUTATE_PROFILE),
    variables: {
      request: createProfileRequest,
    },
  });
};

export const updateProfile = (profileInfo) => {
  return apolloClient.mutate({
    mutation: gql(UPDATE_PROFILE),
    variables: {
      request: profileInfo,
    },
  });
};

export const createSetFollowModuleTypedData = (setFollowModuleRequest) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_SET_FOLLOW_MODULE_TYPED_DATA),
    variables: {
      request: setFollowModuleRequest,
    },
  });
};
