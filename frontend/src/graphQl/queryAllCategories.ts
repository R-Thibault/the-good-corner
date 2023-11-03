import { gql } from "@apollo/client";

export const queryAllCategories = gql`
  query Category {
    items: allCategories {
      id
      name
    }
  }
`;
