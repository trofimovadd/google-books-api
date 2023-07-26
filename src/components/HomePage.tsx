import React, { useEffect } from "react";
import "./styles.css";
import BookCard from "./BookCard";
import Loader from "./Loader";
import { fetchBooks, fetchNextBooks, updateCategory, updateSearch, updateSortingBy } from "../actions/actions";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/hooks";
import { RootState } from "../reducers/reducers";
import { BookInfo } from "../types/BookResponse";

export const HomePage: React.FC = () => {
    const state = useSelector((state: RootState) => state.booksState)
    const dispatch = useAppDispatch()

    return (
        <>
            <div className="header">
                <h1>Find your book</h1>
                <div className="search">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Type your book's name..."
                        value={state.searchString}
                        onChange={(e) => dispatch(updateSearch(e.target.value))}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") dispatch(fetchBooks());
                        }}
                    />
                    <button className="btn btn-outline" onClick={() => {
                        dispatch(fetchBooks())
                    }}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>

                <div className="filters">
                    <span>Categories: </span>
                    <select className="form-select form-select-sm text-secondary"
                        onChange={(e) => {
                            dispatch(updateCategory(e.target.value))
                        }}
                        value={state.category}>
                        <option value="all">all</option>
                        <option value="art">art</option>
                        <option value="biography">biography</option>
                        <option value="computers">computers</option>
                        <option value="history">history</option>
                        <option value="medical">medical</option>
                        <option value="poetry">poetry</option>
                    </select>

                    <span>Sorting by </span>
                    <select className="form-select form-select-sm text-secondary"
                        onChange={(e) => {
                            dispatch(updateSortingBy(e.target.value))
                        }}
                        value={state.sortingBy}>
                        <option value="relevance">relevance</option>
                        <option value="newest">newest</option>
                    </select>
                </div>
            </div>

            <div className="content">
                {state.error ? <div className="error">Error: {state.error}</div> : null}
                {state.isLoading ? null : <div className="found">Found {state.totalItems} results</div>}
                <div className="cards">
                    {state.books?.map((book: BookInfo) => {
                        return <BookCard key={book.id} book={book}></BookCard>;
                    })}
                </div>

                {state.isLoading ? <Loader /> : state.books?.length ?
                    <button
                        className="loadMore"
                        onClick={() => {
                            dispatch(fetchNextBooks())
                        }}>
                        Load more</button> : null}
            </div>
        </>
    );
};

export default HomePage;
