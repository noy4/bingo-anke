/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePostInput = {
  type: string,
  id?: string | null,
  content: string,
  displayName: string,
  playerFrom: string,
  numberOfBingo: number,
  score: number,
  timestamp: number,
};

export type ModelPostConditionInput = {
  type?: ModelStringInput | null,
  content?: ModelStringInput | null,
  displayName?: ModelStringInput | null,
  playerFrom?: ModelStringInput | null,
  numberOfBingo?: ModelIntInput | null,
  score?: ModelIntInput | null,
  timestamp?: ModelIntInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdatePostInput = {
  type?: string | null,
  id: string,
  content?: string | null,
  displayName?: string | null,
  playerFrom?: string | null,
  numberOfBingo?: number | null,
  score?: number | null,
  timestamp?: number | null,
};

export type DeletePostInput = {
  id?: string | null,
};

export type ModelPostFilterInput = {
  type?: ModelStringInput | null,
  id?: ModelIDInput | null,
  content?: ModelStringInput | null,
  displayName?: ModelStringInput | null,
  playerFrom?: ModelStringInput | null,
  numberOfBingo?: ModelIntInput | null,
  score?: ModelIntInput | null,
  timestamp?: ModelIntInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelPostSortByScoreCompositeKeyConditionInput = {
  eq?: ModelPostSortByScoreCompositeKeyInput | null,
  le?: ModelPostSortByScoreCompositeKeyInput | null,
  lt?: ModelPostSortByScoreCompositeKeyInput | null,
  ge?: ModelPostSortByScoreCompositeKeyInput | null,
  gt?: ModelPostSortByScoreCompositeKeyInput | null,
  between?: Array< ModelPostSortByScoreCompositeKeyInput | null > | null,
  beginsWith?: ModelPostSortByScoreCompositeKeyInput | null,
};

export type ModelPostSortByScoreCompositeKeyInput = {
  numberOfBingo?: number | null,
  score?: number | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost:  {
    __typename: "Post",
    type: string,
    id: string | null,
    content: string,
    displayName: string,
    playerFrom: string,
    numberOfBingo: number,
    score: number,
    timestamp: number,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost:  {
    __typename: "Post",
    type: string,
    id: string | null,
    content: string,
    displayName: string,
    playerFrom: string,
    numberOfBingo: number,
    score: number,
    timestamp: number,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost:  {
    __typename: "Post",
    type: string,
    id: string | null,
    content: string,
    displayName: string,
    playerFrom: string,
    numberOfBingo: number,
    score: number,
    timestamp: number,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost:  {
    __typename: "Post",
    type: string,
    id: string | null,
    content: string,
    displayName: string,
    playerFrom: string,
    numberOfBingo: number,
    score: number,
    timestamp: number,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      type: string,
      id: string | null,
      content: string,
      displayName: string,
      playerFrom: string,
      numberOfBingo: number,
      score: number,
      timestamp: number,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListPostsSortedByTimestampQueryVariables = {
  type?: string | null,
  timestamp?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsSortedByTimestampQuery = {
  listPostsSortedByTimestamp:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      type: string,
      id: string | null,
      content: string,
      displayName: string,
      playerFrom: string,
      numberOfBingo: number,
      score: number,
      timestamp: number,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListPostsSortedByScoreQueryVariables = {
  type?: string | null,
  numberOfBingoScore?: ModelPostSortByScoreCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsSortedByScoreQuery = {
  listPostsSortedByScore:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      type: string,
      id: string | null,
      content: string,
      displayName: string,
      playerFrom: string,
      numberOfBingo: number,
      score: number,
      timestamp: number,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreatePostSubscription = {
  onCreatePost:  {
    __typename: "Post",
    type: string,
    id: string | null,
    content: string,
    displayName: string,
    playerFrom: string,
    numberOfBingo: number,
    score: number,
    timestamp: number,
  } | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost:  {
    __typename: "Post",
    type: string,
    id: string | null,
    content: string,
    displayName: string,
    playerFrom: string,
    numberOfBingo: number,
    score: number,
    timestamp: number,
  } | null,
};

export type OnDeletePostSubscription = {
  onDeletePost:  {
    __typename: "Post",
    type: string,
    id: string | null,
    content: string,
    displayName: string,
    playerFrom: string,
    numberOfBingo: number,
    score: number,
    timestamp: number,
  } | null,
};