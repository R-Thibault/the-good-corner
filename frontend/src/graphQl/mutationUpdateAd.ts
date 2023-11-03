import { gql } from "@apollo/client";

export const mutationUpdateAd = gql`
  mutation mutationUpdateAd($data: AdUpdateInput!, $id: ID!) {
    item: updateAd(data: $data, id: $id) {
      id
    }
  }
`;
