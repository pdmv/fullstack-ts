"use client";

import InputCard, { InputCardProps } from "@/components/InputCard";
import { useToast } from "@/hooks/use-toast";
import { addBook, IBook } from "@/services/bookService";
import { useState } from "react";

const BookManagement = () => {
  const { toast } = useToast();

  const [book, setBook] = useState<IBook>({
    title: "",
    author: "",
    quantity: 1,
  });

  const handleInputChange = (key: keyof IBook, value: string | number) => {
    setBook((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    inputCardProps.isEnable = false;

    try {
      await addBook(book);

      setBook({
        title: "",
        author: "",
        quantity: 1,
      });

      toast({
        title: "Book added successfully",
        description: "The book has been added successfully.",
      });
    } catch {
      toast({
        title: "Failed to add book",
        description: "An error occurred while adding the book.",
      });
    };
  };

  const inputCardProps: InputCardProps = {
    title: "Book Management",
    description: "You can add a new book by filling the form below.",
    onSubmit: handleSubmit,
    isEnable: !book.title || !book.author || book.quantity <= 0,
    inputs: [
      {
        id: "title",
        label: "Title",
        placeholder: "The title of the book",
        value: book.title,
        onChange: (value) => handleInputChange("title", value),
      },
      {
        id: "author",
        label: "Author",
        placeholder: "The book author's name",
        value: book.author,
        onChange: (value) => handleInputChange("author", value),
      },
      {
        id: "quantity",
        label: "Quantity",
        placeholder: "The number of books",
        type: "number",
        value: book.quantity,
        onChange: (value) => handleInputChange("quantity", Number(value)),
      },
    ],
    primaryButton: "Add",
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <InputCard {...inputCardProps} />
    </div>
  );
};

export default BookManagement;