import { combineReducers } from 'redux'
import { IHomePageState, getBooksReducer } from './getBooks';

export interface RootState {
    booksState: IHomePageState,
} 

export const rootReducer = combineReducers<RootState>({
    booksState: getBooksReducer
});