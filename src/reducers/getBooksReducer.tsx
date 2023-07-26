import { Action } from "../actions/actions"
import { ActionTypes } from "../actions/actionTypes"
import { BookInfo } from "../types/BookResponse"

export interface IHomePageState {
    isLoading: boolean,
    books: BookInfo[],
    totalItems: number,
    page: number,
    searchString: string,
    category: string,
    sortingBy: string,
}

const initialState: IHomePageState = {
    isLoading: false,
    books: [],
    totalItems: 0,
    page: 1,
    searchString: "",
    category: "",
    sortingBy: "",
}

export const getBooksReducer = (state = initialState, action: Action): IHomePageState => {
    switch (action.type) {
        case ActionTypes.CLEAR_BOOKS:
            return {
                ...state,
                books: [],
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
                page: 1,
            }

        case ActionTypes.UPDATE_CATEGORY:
            return {
                ...state,
                category: action.payload.category,
                page: 1,
                books: [],
            }

        case ActionTypes.UPDATE_SORTING_BY:
            return {
                ...state,
                sortingBy: action.payload.sortingBy,
                page: 1,
                books: [],
            }

        default:
            return state
    }
}