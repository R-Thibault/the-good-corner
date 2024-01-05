import { gql } from "@apollo/client";

export const queryAllAds = gql`
  query Ads($where: AdsWhere, $skip: Int, $take: Int) {
    items: allAds(where: $where, skip: $skip, take: $take) {
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
    count: allAdsCount(where: $where)
  }
`;
