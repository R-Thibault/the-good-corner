import { gql } from "@apollo/client";

export const mutationSignup = gql`
  mutation Mutation($data: UserCreateInput!) {
    item: signup(data: $data) {
      id
    }
  }
`;
