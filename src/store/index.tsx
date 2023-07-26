import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { rootReducer } from "../reducers/reducers"

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch