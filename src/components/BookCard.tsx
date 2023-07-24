import React from "react";

export interface IBooksResponse {
    items: IBook[];
}

export interface IBook {
    volumeInfo: IBookVolumeInfo;
}

export interface IBookVolumeInfo {
    title: string;
    authors: string[];
    categories: string[];
    imageLinks: IBookImages;
}

export interface IBookImages {
    smallThumbnail: string;
    thumbnail: string;
}

export interface IBookProps {
    book: IBook;
}

const BookCard: React.FC<IBookProps> = (props: IBookProps) => {
    const info = props.book.volumeInfo;
    const cover = info.imageLinks;
    console.log(props.book.volumeInfo)

    return (
        <>
        <div className="card">
            {cover == undefined || cover == null ? null : (
                <img src={cover.thumbnail} alt=""/>
            )}
            <div className="info">
            <div className="title">{info.title}</div>
            {info.categories == null || info.categories.length == 0 ? null : (
                <div className="category">{info.categories[0]}</div>
            )}
            {info.authors == null ||info.authors.length == 0 ? null : (
                <div className="authors">{info.authors}</div>
            )}
            </div>
        </div>
        </>
    );
};

export default BookCard;
