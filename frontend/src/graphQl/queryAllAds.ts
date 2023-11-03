import { gql } from "@apollo/client";

export const queryAllAds = gql`
  query Ads($where: AdsWhere) {
    items: allAds(where: $where) {
      author
      category {
        id
        name
      }
      description
      id
      imgUrl
      price
      tags {
        id
        name
      }
      title
    }
  }
`;
