import { gql } from "@apollo/client";

export const mutationSignin = gql`
  mutation Mutation($password: String!, $email: String!) {
    item: signin(password: $password, email: $email) {
      id
    }
  }
`;
