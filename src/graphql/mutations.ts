// tslint:disable
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
