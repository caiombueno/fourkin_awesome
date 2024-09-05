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

const GET_RESTAURANT_DETAILS_QUERY: DocumentNode = gql`
query GetRestaurantDetails($id: String) {
        business(id: $id) {
          id
          name
          price
          rating
          reviews {
            id
            rating
            text
            user {
              id
              image_url
              name
            }
          }
          categories {
            title
            alias
          }
          hours {
            is_open_now
          }
          location {
            formatted_address
          }
        }
      }
`;

const GET_RESTAURANT_SUMMARY: DocumentNode = gql`
query GetRestaurantSummary($id: String) {
        business(id: $id) {
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

`;

interface RestaurantDataSourceQueryDocuments {
  getRestaurantSummaryList: DocumentNode;
  getRestaurantDetails: DocumentNode;
  getRestaurantSummary: DocumentNode;
};

const queries: RestaurantDataSourceQueryDocuments = {
  getRestaurantSummaryList: GET_RESTAURANT_SUMMARY_LIST_QUERY,
  getRestaurantDetails: GET_RESTAURANT_DETAILS_QUERY,
  getRestaurantSummary: GET_RESTAURANT_SUMMARY,
};

export default queries;