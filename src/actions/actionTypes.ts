import { BookInfo } from "../types/BookResponse";

export enum ActionTypes {
  CLEAR_BOOKS = "CLEAR_BOOKS",
  EMPTY_SEARCH_ERROR = "EMPTY_SEARCH_ERROR",
  GET_BOOKS_LOADING = "GET_BOOKS_LOADING",
  GET_BOOKS_FAILURE = "GET_BOOKS_FAILURE",
  GET_BOOKS_SUCCESS = "GET_BOOKS_SUCCESS",

  GET_NEXT_BOOKS_SUCCESS = "GET_NEXT_BOOKS_SUCCESS",

  UPDATE_SEARCH = "UPDATE_SEARCH",
  UPDATE_CATEGORY = "UPDATE_CATEGORY",
  UPDATE_SORTING_BY = "UPDATE_SORTING_BY",
}

export interface ClearBooks {
  type: ActionTypes.CLEAR_BOOKS;
}

export interface EmptySearchError {
  type: ActionTypes.EMPTY_SEARCH_ERROR;
}

export interface BooksLoading {
  type: ActionTypes.GET_BOOKS_LOADING;
}

export interface BooksFailure {
  type: ActionTypes.GET_BOOKS_FAILURE;
  payload: { e: any };
}

export interface BooksSuccess {
  type: ActionTypes.GET_BOOKS_SUCCESS;
  payload: { items: BookInfo[]; totalItems: number };
}

export interface NextBooksSuccess {
  type: ActionTypes.GET_NEXT_BOOKS_SUCCESS;
  payload: { items: BookInfo[] };
}

export interface UpdateSearch {
  type: ActionTypes.UPDATE_SEARCH;
  payload: { search: string };
}

export interface UpdateCategory {
  type: ActionTypes.UPDATE_CATEGORY;
  payload: { category: string };
}

export interface UpdateSortingBy {
  type: ActionTypes.UPDATE_SORTING_BY;
  payload: { sortingBy: string };
}
