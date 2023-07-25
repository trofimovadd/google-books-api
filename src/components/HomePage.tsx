import React, { useState, useEffect } from "react";
import "./styles.css";
import BookCard from "./BookCard";
import { IBook, IBooksResponse } from "./BookCard";
import Loader from "./Loader";
import { IHomePageState } from "../reducers/getBooks";
import { fetchBooks } from "../actions/actionCreators";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../reducers/reducers";

export const HomePage: React.FC = () => {
    const [search, setSearch] = useState("");

    // const state = useAppSelector((state) => state)
    const state = useSelector((state: RootState) => state.booksState)
    console.log("BookSize: " + (state.books?.length))
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchBooks(search));
    }, []);

    return (
        <>
            <div className="header">
                <h1>Find your book</h1>
                <div className="search">
                    <input
                        type="text"
                        placeholder="type your book's name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") dispatch(fetchBooks(search));;
                        }}
                    />
                    <button onClick={() => {
                        dispatch(fetchBooks(search))
                    }}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>

                <div className="filters">
                    <span>Categories: </span>
                    <select>
                        <option>all</option>
                        <option>art</option>
                        <option>biography</option>
                        <option>computers</option>
                        <option>history</option>
                        <option>medical</option>
                        <option>poetry</option>
                    </select>

                    <span>Sorting by </span>
                    <select>
                        <option>relevance</option>
                        <option>newest</option>
                    </select>
                </div>
            </div>

            <div className="content">
                {state.isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="found">Found { } results</div>
                        <div className="cards">
                            {state.books?.map((book: IBook) => {
                                return <BookCard book={book}></BookCard>;
                            })}
                        </div>
                        <button className="loadMore">Load more</button>
                    </>
                )}
            </div>
        </>
    );
};

export default HomePage;
