import axiosInstance from "@/utils/axiosInstance";

export interface IBook {
  _id?: string;
  title: string;
  author: string;
  quantity: number;
}

export const getBooks = async (): Promise<IBook[]> => {
  const response = await axiosInstance.get("/books");
  return response.data as IBook[];
}

export const getBook = async (bookId: string): Promise<IBook> => {
  const response = await axiosInstance.get(`/books/${bookId}`);
  return response.data as IBook;
}

export const addBook = async (book: IBook): Promise<IBook> => {
  const response = await axiosInstance.post("/books", book);
  return response.data as IBook;
}

export const updateBook = async (book: IBook): Promise<IBook> => {
  const response = await axiosInstance.put(`/books/${book._id}`, book);
  return response.data as IBook;
}

export const deleteBook = async (bookId: string): Promise<void> => {
  await axiosInstance.delete(`/books/${bookId}`);
  return;
}