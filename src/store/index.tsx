import { configureStore } from "@reduxjs/toolkit"
import { getBooks } from "../reducers/getBooks"

export const store = configureStore({
    reducer: getBooks
})