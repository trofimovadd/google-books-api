import React, { useState, useEffect } from "react";
import "./styles.css";
import BookCard from "./BookCard";
import { IBook, IBooksResponse } from "./BookCard";
import Loader from "./Loader";
import { IHomePageState } from "../reducers/getBooks";
import { addNextPage, fetchBooks, updateCategory, updateSearch, updateSortingBy } from "../actions/actionCreators";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../reducers/reducers";

export const HomePage: React.FC = () => {
    const state = useSelector((state: RootState) => state.booksState)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchBooks());
    }, []);

    return (
        <>
            <div className="header">
                <h1>Find your book</h1>
                <div className="search">
                    <input
                        type="text"
                        placeholder="type your book's name..."
                        value={state.searchString}
                        onChange={(e) => dispatch(updateSearch(e.target.value))}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") dispatch(fetchBooks());
                        }}
                    />
                    <button onClick={() => {
                        dispatch(fetchBooks())
                    }}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>

                <div className="filters">
                    <span>Categories: </span>
                    <select onChange={(e) => {
                        dispatch(updateCategory(e.target.value))
                        dispatch(fetchBooks())
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
                    <select onChange={(e) => {
                        dispatch(updateSortingBy(e.target.value))
                        dispatch(fetchBooks())
                    }}
                        value={state.sortingBy}>
                        <option value="relevance">relevance</option>
                        <option value="newest">newest</option>
                    </select>
                </div>
            </div>

            <div className="content">
                {state.isLoading ? null : <div className="found">Found {state.totalItems} results</div>}
                <div className="cards">
                    {state.books?.map((book: IBook) => {
                        return <BookCard book={book}></BookCard>;
                    })}
                </div>

                {state.isLoading ? <Loader /> : state.books?.length ?
                    <button
                        className="loadMore"
                        onClick={() => {
                            dispatch(addNextPage())
                            dispatch(fetchBooks())
                        }}>
                        Load more</button> : null}
            </div>
        </>
    );
};

export default HomePage;
