import { gql } from "@apollo/client";

export const queryAd = gql`
  query Ad($id: ID!) {
    item: oneAd(id: $id) {
      id
      title
      description
      imgUrl
      location
      price
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;
