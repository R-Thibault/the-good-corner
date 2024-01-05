import { gql } from "@apollo/client";

export const queryMe = gql`
  query Me {
    item: me {
      id
      email
    }
  }
`;
