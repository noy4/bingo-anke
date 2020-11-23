// tslint:disable
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      type
      id
      group
      contents
      displayName
      from
      bingoCount
      score
      startTime
      experimentEndTime
      evaluationEndTime
      bonusEndTime
      unusedGalapons
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
        group
        contents
        displayName
        from
        bingoCount
        score
        startTime
        experimentEndTime
        evaluationEndTime
        bonusEndTime
        unusedGalapons
      }
      nextToken
    }
  }
`;
export const listPostsSortedByBingoCountAndScore = /* GraphQL */ `
  query ListPostsSortedByBingoCountAndScore(
    $type: String
    $bingoCountScore: ModelPostSortByBingoCountAndScoreCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsSortedByBingoCountAndScore(
      type: $type
      bingoCountScore: $bingoCountScore
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        group
        contents
        displayName
        from
        bingoCount
        score
        startTime
        experimentEndTime
        evaluationEndTime
        bonusEndTime
        unusedGalapons
      }
      nextToken
    }
  }
`;
