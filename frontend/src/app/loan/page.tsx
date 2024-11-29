"use client";

import BookDropdown from "@/components/BookDropdown";
import MemberDropdown from "@/components/MemberDropdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { IBook } from "@/services/bookService";
import { borrowBook } from "@/services/loanService";
import { IMember } from "@/services/memberService";
import { useState } from "react";

const LoanPage = () => {
  const { toast } = useToast();
  const [selectedMember, setSelectedMember] = useState<IMember | null>(
    null
  );
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

  const handleMemberSelect = (member: IMember | null) => {
    setSelectedMember(member);
    toast({
      title: "Member selected",
      description: member
        ? `${member.name} has been selected.`
        : "No member selected.",
    });
  };

  const handleBookSelect = (book: IBook | null) => {
    setSelectedBook(book);
    toast({
      title: "Book selected",
      description: book
        ? `${book.title} has been selected.`
        : "No book selected.",
    });
  };

  const handleLoan = async () => {
    const memberId = selectedMember?._id;
    const bookId = selectedBook?._id;

    if (!memberId || !bookId) {
      toast({
        title: "Invalid selection",
        description: "Please select a member and a book to loan.",
      });
      return;
    }

    try {
      await borrowBook({ memberId, bookId });
      toast({
        title: "Book loaned",
        description: `The book has been loaned to ${selectedMember?.name}.`,
      });
    } catch {
      toast({
        title: "Failed to loan book",
        description: "An error occurred while loaning the book.",
      });
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Loan a book</CardTitle>
          <CardDescription>
            Fill in the form below to loan a book to a member.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="member">Choose a member</Label>
                <MemberDropdown onSelectMember={handleMemberSelect} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Choose a book</Label>
                <BookDropdown onSelectBook={handleBookSelect} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleLoan}>Loan</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoanPage;
