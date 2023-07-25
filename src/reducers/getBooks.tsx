import { Action, ActionTypes } from "../actions/actionCreators"
import { IBook } from "../components/BookCard"

export interface IHomePageState {
    isLoading: boolean,
    books: IBook[],
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
        case ActionTypes.GET_BOOKS_LOADING:
            return {
                ...state,
                isLoading: true,
                ...(state.page == 1 ? { books: [] } : {}),
            }

        case ActionTypes.GET_BOOKS_SUCCESS:
            console.log("getBooksSuccess 2 books: " + JSON.stringify(action.payload))
            const books = state.page == 1 ? action.payload.items : state.books.concat(action.payload.items)

            return {
                ...state,
                books: books.filter((b) => b?.volumeInfo),
                totalItems: action.payload.totalItems,
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

        case ActionTypes.ADD_NEXT_PAGE:
            return {
                ...state,
                page: state.page + 1
            }

        default:
            return state
    }
}