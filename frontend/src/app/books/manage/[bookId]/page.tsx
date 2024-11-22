"use client";

import InputCard, { InputCardProps } from "@/components/InputCard";
import { useToast } from "@/hooks/use-toast";
import { deleteBook, getBook, IBook, updateBook } from "@/services/bookService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BookDetailPage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const { bookId } = useParams();
  const [book, setBook] = useState<IBook | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await getBook(bookId as string);
      setBook(response);
    };

    fetchBook();
  }, [bookId]);

  const handleInputChange = (key: keyof IBook, value: string | number) => {
    if (book) {
      setBook((prev) => ({
        ...prev!,
        [key]: value,
      }));
    }
  };

  const handleSubmit = async (isDelete: boolean = false) => {
    if (book) {
      inputCardProps.isEnable = false;

      try {
        if (isDelete) {
          await deleteBook(book._id!);

          toast({
            title: "Book deleted successfully",
            description: "The book has been deleted successfully.",
          });
          router.push("/books");
          return;
        }

        await updateBook(book);

        toast({
          title: "Book updated successfully",
          description: "The book has been updated successfully.",
        });
        router.push("/books");
      } catch {
        if (isDelete) {
          toast({
            title: "Failed to delete book",
            description: "An error occurred while deleting the book.",
          });
          return;
        }
        toast({
          title: "Failed to update book",
          description: "An error occurred while updating the book.",
        });
      }

      inputCardProps.isEnable = true;
    }
  };

  const inputCardProps: InputCardProps = {
    title: "Book Management",
    description: "You can update the book by filling the form below.",
    onSubmit: () => handleSubmit(false),
    isEnable: book ? !book.title || !book.author || book.quantity <= 0 : false,
    inputs: [
      {
        id: "title",
        label: "Title",
        placeholder: "The title of the book",
        value: book ? book.title : "",
        onChange: (value) => handleInputChange("title", value),
      },
      {
        id: "author",
        label: "Author",
        placeholder: "The book author's name",
        value: book ? book.author : "",
        onChange: (value) => handleInputChange("author", value),
      },
      {
        id: "quantity",
        label: "Quantity",
        placeholder: "The number of books",
        type: "number",
        value: book ? book.quantity : 1,
        onChange: (value) => handleInputChange("quantity", Number(value)),
      },
    ],
    primaryButton: "Update",
    secondaryButton: "Delete",
    secondaryButtonOnClick: () => handleSubmit(true),
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <InputCard {...inputCardProps} />
    </div>
  );
};

export default BookDetailPage;
