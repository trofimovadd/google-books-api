import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../reducers/reducers";
import BooksResponse, { BookInfo } from "../types/BookResponse";
import {
  ActionTypes,
  ClearBooks,
  BooksLoading,
  BooksFailure,
  NextBooksSuccess,
  UpdateSearch,
  UpdateCategory,
  UpdateSortingBy,
  BooksSuccess,
} from "./actionTypes";

const clearBooks = (): ClearBooks => {
  return {
    type: ActionTypes.CLEAR_BOOKS,
  };
};

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

const getBooksSuccess = (
  items: BookInfo[],
  totalItems: number
): BooksSuccess => {
  const filteredBooks = items?.filter((b) => b?.volumeInfo);
  return {
    type: ActionTypes.GET_BOOKS_SUCCESS,
    payload: {
      items: filteredBooks ? filteredBooks : [],
      totalItems: totalItems,
    },
  };
};

const getNextBooksSuccess = (items: BookInfo[]): NextBooksSuccess => {
  const filteredBooks = items?.filter((b) => b?.volumeInfo);
  return {
    type: ActionTypes.GET_NEXT_BOOKS_SUCCESS,
    payload: { items: filteredBooks ? filteredBooks : [] },
  };
};

const getBooks = (
  search: string,
  category: string,
  sortingBy: string,
  page: number
) => {
  const categoryParam = category ? ":" + category : "";
  const maxResults = 30;

  const params = {
    params: {
      key: "AIzaSyDdYteQCR8RpyES-XzoCactqKtx3-A6fh8",
      maxResults: maxResults,
      startIndex: maxResults * (page - 1),
      ...{ q: search + categoryParam },
      ...(sortingBy ? { orderBy: sortingBy } : {}),
    },
  };

  return axios
    .get<BooksResponse>("https://www.googleapis.com/books/v1/volumes", params)
    .then((response) => {
      console.log(response.data.items);
      return response;
    });
};

export const fetchBooks = () => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const bookState = getState().booksState;
    if (!bookState.searchString) {
      return;
    }

    dispatch(getBooksLoading());
    dispatch(clearBooks());
    getBooks(bookState.searchString, bookState.category, bookState.sortingBy, 1)
      .then((response) => {
        dispatch(
          getBooksSuccess(response.data.items, response.data.totalItems)
        );
      })
      .catch((error) => {
        dispatch(getBooksFailure(error));
        console.log(error);
      });
  };
};

export const fetchNextBooks = () => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const bookState = getState().booksState;
    dispatch(getBooksLoading());
    getBooks(
      bookState.searchString,
      bookState.category,
      bookState.sortingBy,
      bookState.page + 1
    )
      .then((response) => {
        dispatch(getNextBooksSuccess(response.data.items));
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

export type Action =
  | ClearBooks
  | BooksLoading
  | BooksFailure
  | BooksSuccess
  | UpdateSearch
  | UpdateCategory
  | UpdateSortingBy
  | NextBooksSuccess;
