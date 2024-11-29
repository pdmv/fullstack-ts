"use client";

import InputCard, { InputCardProps } from "@/components/InputCard";
import { ListTable } from "@/components/ListTable";
import MyAlertDialog from "@/components/MyAlertDialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { getBooks, IBook } from "@/services/bookService";
import { returnBook } from "@/services/loanService";
import {
  deleteMember,
  getMember,
  IMember,
  updateMember,
} from "@/services/memberService";
import { Undo2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MemberDetailPage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const { memberId } = useParams();
  const [member, setMember] = useState<IMember | null>(null);
  const [borrowBookList, setBorrowBookList] = useState<IBook[] | []>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await getMember(memberId as string);
        setMember(response);

        if (response) {
          const bookIds = response.borrowedBooks as string[];
          const bookDatas = await getBooks({ bookIds: bookIds });
          setBorrowBookList(bookDatas);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMemberData();
  }, [memberId]);

  const handleInputChange = (key: keyof IMember, value: string | number) => {
    if (member) {
      setMember((prev) => ({
        ...prev!,
        [key]: value,
      }));
    }
  };

  const handleSubmit = async (isDelete: boolean = false) => {
    if (member) {
      inputCardProps.isEnable = false;

      try {
        if (isDelete) {
          await deleteMember(member._id!);

          toast({
            title: "Member deleted successfully",
            description: "Member has been deleted successfully.",
          });
          router.push("/members");
          return;
        }

        await updateMember(member);

        toast({
          title: "Member updated successfully",
          description: "Member has been updated successfully.",
        });
        router.push("/members");
      } catch {
        if (isDelete) {
          toast({
            title: "Failed to delete member",
            description: "An error occurred while deleting member.",
          });
          return;
        }
        toast({
          title: "Failed to update member",
          description: "An error occurred while updating member.",
        });
      }

      inputCardProps.isEnable = true;
    }
  };

  const inputCardProps: InputCardProps = {
    title: "Member Management",
    description: "You can update member by filling the form below.",
    onSubmit: () => handleSubmit(false),
    isEnable: member ? !member.name || !member.email : false,
    inputs: [
      {
        id: "name",
        label: "Name",
        placeholder: "The member's name",
        value: member ? member.name : "",
        onChange: (value) => handleInputChange("name", value),
      },
      {
        id: "email",
        label: "Email",
        placeholder: "The member's email",
        type: "email",
        value: member ? member.email : "",
        onChange: (value) => handleInputChange("email", value),
      },
    ],
    primaryButton: "Update",
    secondaryButton: "Delete",
    secondaryButtonOnClick: () => setIsOpen(true),
  };

  const handleReturn = async (bookId: string) => {
    if (member) {
      setLoading(true);
      try {
        await returnBook({ memberId: member._id as string, bookId: bookId });

        setBorrowBookList((prev) => prev.filter((book) => book._id !== bookId));

        toast({
          title: "Book returned successfully",
          description: "The book has been returned successfully.",
        });
      } catch {
        toast({
          title: "Failed to return book",
          description: "An error occurred while returning the book.",
        });
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <InputCard {...inputCardProps} />

      <span className="h-10" />

      {loading ? (
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      ) : (
        borrowBookList.length > 0 && (
          <ListTable
            caption="Borrow Books"
            headers={["No", "Title", "Author", "Quantity", "Actions"]}
            rows={borrowBookList.map((book, index) => ({
              cellContent: [
                (index + 1).toString(),
                book.title,
                book.author,
                book.quantity.toString(),
                <>
                  <Button
                    variant={"outline"}
                    onClick={() => handleReturn(book._id as string)}
                  >
                    <Undo2 />
                  </Button>
                </>,
              ],
            }))}
          />
        )
      )}

      <MyAlertDialog
        isOpen={isOpen}
        title="Delete Member"
        description="Are you sure you want to delete this member?"
        onCancel={() => setIsOpen(false)}
        onAction={() => handleSubmit(true)}
      />
    </div>
  );
};

export default MemberDetailPage;
