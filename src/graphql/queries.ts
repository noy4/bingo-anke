// tslint:disable
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      type
      id
      content
      displayName
      playerFrom
      numberOfBingo
      score
      timestamp
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        id
        content
        displayName
        playerFrom
        numberOfBingo
        score
        timestamp
      }
      nextToken
    }
  }
`;
export const listPostsSortedByTimestamp = /* GraphQL */ `
  query ListPostsSortedByTimestamp(
    $type: String
    $timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsSortedByTimestamp(
      type: $type
      timestamp: $timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        content
        displayName
        playerFrom
        numberOfBingo
        score
        timestamp
      }
      nextToken
    }
  }
`;
export const listPostsSortedByScore = /* GraphQL */ `
  query ListPostsSortedByScore(
    $type: String
    $numberOfBingoScore: ModelPostSortByScoreCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsSortedByScore(
      type: $type
      numberOfBingoScore: $numberOfBingoScore
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        content
        displayName
        playerFrom
        numberOfBingo
        score
        timestamp
      }
      nextToken
    }
  }
`;
