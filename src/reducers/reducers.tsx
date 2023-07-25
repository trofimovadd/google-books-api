import { combineReducers } from 'redux'
import { IHomePageState, getBooksReducer } from './getBooksReducer';

export interface RootState {
    booksState: IHomePageState,
} 

export const rootReducer = combineReducers<RootState>({
    booksState: getBooksReducer
});