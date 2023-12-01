import { gql } from "@apollo/client";

export const mutationCreateCategory = gql`
  mutation CreateCategory($name: String!) {
    item: createCategory(name: $name) {
      id
      name
    }
  }
`;
