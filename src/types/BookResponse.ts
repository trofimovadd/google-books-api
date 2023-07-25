export interface BooksResponse {
  items: BookInfo[];
  totalItems: number;
}

export interface BookInfo {
  volumeInfo: BookVolumeInfo;
}

export interface BookVolumeInfo {
  title: string;
  authors: string[];
  categories: string[];
  imageLinks: BookImages;
}

export interface BookImages {
  smallThumbnail: string;
  thumbnail: string;
}

export default BooksResponse