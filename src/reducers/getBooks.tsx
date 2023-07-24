import { GET_BOOKS_FAILURE, GET_BOOKS_LOADING, GET_BOOKS_SUCCESS } from "../actions/actionTypes"

export interface IAction {
    type: string,
    payload: object,
}

const initialState = {
    isLoading: false,
    books: [],
    totalItems: 0,
}

export const getBooks = {}

// export const getBooks = (state = initialState, action: IAction) => {
//     switch (action.type) {
//         case GET_BOOKS_LOADING:
//             return {
//                 ...state,
//                 books: action.payload,
//             }

//         case GET_BOOKS_SUCCESS:
//             return {
//                 ...state,
//                 books: action.payload,
//             }

//         case GET_BOOKS_FAILURE:
//             return {
//                 ...state,
//                 books: action.payload,
//             }
//     }
// }