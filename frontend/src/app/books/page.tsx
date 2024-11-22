"use client";

import { ListTable } from "@/components/ListTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { IBook, deleteBook, getBooks } from "@/services/bookService";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Books = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [books, setBooks] = useState<IBook[]>([]);

  const fetchBooks = async () => {
    const response = await getBooks();
    setBooks(response);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleOnRowClick = (bookId: string) => {
    router.push(`/books/manage/${bookId}`);
  };

  const handleDelete = async (bookId: string) => {
    try {
      await deleteBook(bookId);

      toast({
        title: "Book deleted successfully",
        description: "The book has been deleted successfully.",
      });
      fetchBooks();
    } catch {
      toast({
        title: "Failed to delete book",
        description: "An error occurred while deleting the book.",
      });
    }
  }

  const rows = books.map((book, index) => ({
    cellContent: [
      (index + 1).toString(),
      book.title,
      book.author,
      book.quantity.toString(),
      <>
        <Button
          variant={"outline"}
          onClick={() => handleOnRowClick(book._id as string)}
        >
          <Pencil />
        </Button>
        <span className="mx-2"></span>
        <Button
          variant={"outline"}
          onClick={() => handleDelete(book._id as string)}
        >
          <Trash2 />
        </Button>
      </>,
    ],
    onRowClick: () => handleOnRowClick(book._id as string),
  }));

  return (
    <div>
      <Button
        variant={"outline"}
        onClick={() => router.push("/books/manage")}
        className="m-4"
      >
        <CirclePlus />
      </Button>
      <ListTable
        caption="Books"
        headers={["No", "Title", "Author", "Quantity", "Actions"]}
        rows={rows}
        tooltip="Click to see this book's detail"
      />
    </div>
  );
};

export default Books;
