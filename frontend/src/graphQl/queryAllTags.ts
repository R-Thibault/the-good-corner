import { gql } from "@apollo/client";

export const queryAllTags = gql`
  query Tags {
    items: allTags {
      id
      name
    }
  }
`;
