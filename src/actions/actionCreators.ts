import { GET_BOOKS_LOADING, GET_BOOKS_FAILURE, GET_BOOKS_SUCCESS } from "./actionTypes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { IBooksResponse } from "../components/BookCard";
import { Dispatch } from "@reduxjs/toolkit";

export const getBooksLoading = () => {
    return {
        type: GET_BOOKS_LOADING
    }
}

export const getBooksFailure = (e: any) => {
    return {
        type: GET_BOOKS_FAILURE,
        payload: e,
    }
}

export const getBooksSuccess = (data: IBooksResponse) => {
    console.log("getBooksSuccess 1 data: " + JSON.stringify(data))
    return {
        type: GET_BOOKS_SUCCESS,
        payload: data.items,
    }
}

export const fetchBooks = (search: string) => {
    return (dispatch: Dispatch) => {

        dispatch(getBooksLoading())

        axios.get<IBooksResponse>("https://www.googleapis.com/books/v1/volumes", {
            params: {
                key: "AIzaSyDdYteQCR8RpyES-XzoCactqKtx3-A6fh8",
                maxResults: 30,
                ...(search ? { q: search } : {}),
            },
        })
        .then((response) => {
            console.log(response.data.items);
            dispatch(getBooksSuccess(response.data))
        })
        .catch((error) => {
            dispatch(getBooksFailure(error))
            console.log(error)
        });
    }
}