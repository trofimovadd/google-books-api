import { GET_BOOKS_FAILURE, GET_BOOKS_LOADING, GET_BOOKS_SUCCESS } from "../actions/actionTypes"
import { IBook } from "../components/BookCard"

export type IAction = {
    type: string,
    payload: object,
}

export interface IHomePageState {
    isLoading: boolean,
    books: IBook[],
    totalItems: number,
}

const initialState: IHomePageState = {
    isLoading: false,
    books: [],
    totalItems: 0,
}

export const getBooksReducer = (state = initialState, action: IAction): IHomePageState => {
    switch (action.type) {
        case GET_BOOKS_LOADING:
            console.log("getBooksSuccess 3 GET_BOOKS_LOADING")

            return {
                ...state,
                isLoading: true,
            }

        case GET_BOOKS_SUCCESS:
            console.log("getBooksSuccess 2 books: " + JSON.stringify(action.payload))
            return {
                ...state,
                books: action.payload as IBook[],
                isLoading: false,
            }

        case GET_BOOKS_FAILURE:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}