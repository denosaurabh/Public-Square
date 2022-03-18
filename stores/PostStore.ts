import { CREATE_POST_TYPED_DATA } from "@/graphql/POST";
import { gql } from "@apollo/client";
import { Store } from ".";

export class PostStore {
  constructor(private store: Store) {}

  async createPostTypedData(createPostTypedDataRequest: any) {
    return this.store.apolloClient.mutate({
      mutation: gql(CREATE_POST_TYPED_DATA),
      variables: {
        request: createPostTypedDataRequest,
      },
    });
  }
}
