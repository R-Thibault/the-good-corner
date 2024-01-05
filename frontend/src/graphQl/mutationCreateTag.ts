import { gql } from "@apollo/client";

export const mutationCreateTag = gql`
  mutation CreateTag($name: String!) {
    item: createTag(name: $name) {
      id
    }
  }
`;
