import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import BookCard from "./BookCard";
import { IBook, IBooksResponse } from "./BookCard";
import Loader from "./Loader";

const HomePage: React.FC = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState<IBooksResponse>();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        searchBook();
    }, []);

    const searchBook = () => {
        setLoading(true);

        setTimeout(() => {
            axios
                .get<IBooksResponse>("https://www.googleapis.com/books/v1/volumes", {
                    params: {
                        key: "AIzaSyDdYteQCR8RpyES-XzoCactqKtx3-A6fh8",
                        maxResults: 30,
                        ...("q" ? { q: search } : {}),
                    },
                })
                .then((response) => {
                    console.log(response.data.items);
                    setData(response.data);
                })
                .catch((error) => console.log(error))
                .finally(() => {
                    setLoading(false);
                });
        }, 2000);
    };
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
                            if (e.key === "Enter") searchBook();
                        }}
                    />
                    <button onClick={searchBook}>
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
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="found">Found {} results</div>
                        <div className="cards">
                            {data?.items.map((book: IBook) => {
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
