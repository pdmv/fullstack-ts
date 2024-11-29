import * as React from "react";
import { useDropdownData } from "@/hooks/useDropdownData";
import { getBooks, IBook } from "@/services/bookService";
import { useToast } from "@/hooks/use-toast";
import { Dropdown } from "./Dropdown";

interface BookDropdownProps {
  onSelectBook: (book: IBook | null) => void;
}

const BookDropdown: React.FC<BookDropdownProps> = ({ onSelectBook }) => {
  const { toast } = useToast();
  const { items, selectedItem, loading, setSelectedItem } =
    useDropdownData<IBook>(getBooks);

  const handleSelect = (book: IBook | null) => {
    setSelectedItem(book);
    onSelectBook(book);
    if (!book) {
      toast({
        title: "No book selected",
        description: "Please select a book.",
      });
    }
  };

  return (
    <Dropdown
      items={items}
      selectedItem={selectedItem}
      loading={loading}
      labelKey="title"
      idKey="_id"
      onSelect={handleSelect}
      placeholder="a book"
    />
  );
};

export default BookDropdown;
