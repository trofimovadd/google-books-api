import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../reducers/reducers";
import BooksResponse, { BookInfo } from "../types/BookResponse";

export enum ActionTypes {
  GET_BOOKS_LOADING = "GET_BOOKS_LOADING",
  GET_BOOKS_FAILURE = "GET_BOOKS_FAILURE",
  GET_BOOKS_SUCCESS = "GET_BOOKS_SUCCESS",

  UPDATE_SEARCH = "UPDATE_SEARCH",
  UPDATE_CATEGORY = "UPDATE_CATEGORY",
  UPDATE_SORTING_BY = "UPDATE_SORTING_BY",

  ADD_NEXT_PAGE = "ADD_NEXT_PAGE",
}

interface BooksLoading {
  type: ActionTypes.GET_BOOKS_LOADING;
}

interface BooksFailure {
  type: ActionTypes.GET_BOOKS_FAILURE;
  payload: { e: any };
}

interface BooksSuccess {
  type: ActionTypes.GET_BOOKS_SUCCESS;
  payload: { items: BookInfo[]; totalItems: number };
}

interface UpdateSearch {
  type: ActionTypes.UPDATE_SEARCH;
  payload: { search: string };
}

interface UpdateCategory {
  type: ActionTypes.UPDATE_CATEGORY;
  payload: { category: string };
}

interface UpdateSortingBy {
  type: ActionTypes.UPDATE_SORTING_BY;
  payload: { sortingBy: string };
}

interface AddNextPage {
  type: ActionTypes.ADD_NEXT_PAGE;
}

const getBooksLoading = (): BooksLoading => {
  return {
    type: ActionTypes.GET_BOOKS_LOADING,
  };
};

const getBooksFailure = (e: any): BooksFailure => {
  return {
    type: ActionTypes.GET_BOOKS_FAILURE,
    payload: { e },
  };
};

const getBooksSuccess = (data: BooksResponse): BooksSuccess => {
  return {
    type: ActionTypes.GET_BOOKS_SUCCESS,
    payload: {
      items: data.items,
      totalItems: data.totalItems,
    },
  };
};

export const fetchBooks = () => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(getBooksLoading());

    const bookState = getState().booksState;
    const search = bookState.searchString;
    const page = bookState.page;
    const category = bookState.category;
    const sortingBy = bookState.sortingBy;

    axios
      .get<BooksResponse>("https://www.googleapis.com/books/v1/volumes", {
        params: {
          key: "AIzaSyDdYteQCR8RpyES-XzoCactqKtx3-A6fh8",
          maxResults: 30,
          startIndex: 30 * (page - 1),
          ...(search
            ? { q: search + (category ? ":" + category : "") }
            : category
            ? { q: "subject:" + category }
            : {}),
          ...(sortingBy ? { orderBy: sortingBy } : {}),
        },
      })
      .then((response) => {
        console.log(response.data.items);
        dispatch(getBooksSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getBooksFailure(error));
        console.log(error);
      });
  };
};

export const updateSearch = (search: string): UpdateSearch => {
  return {
    type: ActionTypes.UPDATE_SEARCH,
    payload: { search: search },
  };
};

export const updateCategory = (category: string): UpdateCategory => {
  return {
    type: ActionTypes.UPDATE_CATEGORY,
    payload: { category: category },
  };
};

export const updateSortingBy = (sortingBy: string): UpdateSortingBy => {
  return {
    type: ActionTypes.UPDATE_SORTING_BY,
    payload: { sortingBy: sortingBy },
  };
};

export const addNextPage = (): AddNextPage => {
  return {
    type: ActionTypes.ADD_NEXT_PAGE,
  };
};

export type Action =
  | BooksLoading
  | BooksFailure
  | BooksSuccess
  | UpdateSearch
  | UpdateCategory
  | UpdateSortingBy
  | AddNextPage;
