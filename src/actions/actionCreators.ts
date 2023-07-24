import { GET_BOOKS_LOADING, GET_BOOKS_FAILURE, GET_BOOKS_SUCCESS } from "./actionTypes";

export const getBooksLoading = (data: any) => {
    return {
        type: GET_BOOKS_LOADING,
        payload: data,
    }
}

export const getBooksFailure = (data: any) => {
    return {
        type: GET_BOOKS_FAILURE,
        payload: data,
    }
}

export const getBooksSuccess = (data: any) => {
    return {
        type: GET_BOOKS_SUCCESS,
        payload: data,
    }
}