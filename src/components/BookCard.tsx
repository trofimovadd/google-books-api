import React from "react";
import { BookInfo } from "../types/BookResponse";

export interface BookProps {
    book: BookInfo;
}

const BookCard: React.FC<BookProps> = (props: BookProps) => {
    const info = props.book.volumeInfo;
    const cover = info.imageLinks;
    console.log(props.book.volumeInfo)

    return (
        <>
            <div className="card">
                {cover == undefined || cover == null ? <img src={require("../assets/no_cover_book.jpg")} alt="" />
                    : <img src={cover.thumbnail} alt="" />}
                <div className="info">
                    <div className="title">{info.title}</div>
                    {info.categories == null || info.categories.length == 0 ? null : (
                        <div className="category">{info.categories[0]}</div>
                    )}
                    {info.authors == null || info.authors.length == 0 ? null : (
                        <div className="authors">{info.authors}</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default BookCard;
