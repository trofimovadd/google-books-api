import { Action } from "../actions/actions"
import { ActionTypes } from "../actions/actionTypes"
import { BookInfo } from "../types/BookResponse"

export interface IHomePageState {
    isLoading: boolean,
    error: string,
    books: BookInfo[],
    totalItems: number,
    page: number,

    searchString: string,
    category: string,
    sortingBy: string,

    oldSearchString: string,
    oldCategory: string,
    oldSortingBy: string,
}

const initialState: IHomePageState = {
    isLoading: false,
    error: "",
    books: [],
    totalItems: 0,
    page: 1,

    searchString: "",
    category: "all",
    sortingBy: "relevance",

    oldSearchString: "",
    oldCategory: "",
    oldSortingBy: "",
}

export const getBooksReducer = (state = initialState, action: Action): IHomePageState => {
    switch (action.type) {
        case ActionTypes.CLEAR_BOOKS:
            return {
                ...state,
                books: [],
            }

        case ActionTypes.EMPTY_SEARCH_ERROR:
            return {
                ...state,
                error: "Please enter book's name",
            }

        case ActionTypes.GET_BOOKS_LOADING:
            return {
                ...state,
                isLoading: true,
            }

        case ActionTypes.GET_BOOKS_SUCCESS:
            return {
                ...state,
                books: action.payload.items,
                totalItems: action.payload.totalItems,
                page: 1,
                isLoading: false,

                oldSearchString: state.searchString,
                oldCategory: state.category,
                oldSortingBy: state.sortingBy,
            }

        case ActionTypes.GET_NEXT_BOOKS_SUCCESS:
            return {
                ...state,
                books: state.books.concat(action.payload.items),
                page: state.page + 1,
                isLoading: false,
            }
        case ActionTypes.GET_BOOKS_FAILURE:
            return {
                ...state,
                isLoading: false,
            }

        case ActionTypes.UPDATE_SEARCH:
            return {
                ...state,
                searchString: action.payload.search,
                error: "",
            }

        case ActionTypes.UPDATE_CATEGORY:
            return {
                ...state,
                category: action.payload.category,
            }

        case ActionTypes.UPDATE_SORTING_BY:
            return {
                ...state,
                sortingBy: action.payload.sortingBy,
            }

        default:
            return state
    }
}