import { DocumentNode, gql } from '@apollo/client';

const GET_RESTAURANT_SUMMARY_LIST_QUERY: DocumentNode = gql`
  query GetRestaurantSummaryList($location: String, $limit: Int, $offset: Int) {
    search(location: $location, limit: $limit, offset: $offset, term: "restaurants",) {
      total
      business {
        id
        name
        price
        rating
        photos
        categories {
          title
        }
        hours {
          is_open_now
        }
      }
    }
  }
`;

interface RestaurantDataSourceQueryDocuments {
  getRestaurantSummaryList: DocumentNode;
};

const queries: RestaurantDataSourceQueryDocuments = {
  getRestaurantSummaryList: GET_RESTAURANT_SUMMARY_LIST_QUERY,
};

export default queries;