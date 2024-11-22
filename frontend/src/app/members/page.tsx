'use client';

import { ListTable } from "@/components/ListTable";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteMember, getMembers, IMember } from "@/services/memberService";
import { Pencil, Trash2, UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Members = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [members, setMembers] = useState<IMember[]>([]);

  const fetchMembers = async () => {
    const response = await getMembers();
    setMembers(response);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleOnRowClick = (memberId: string) => {
    router.push(`/members/manage/${memberId}`);
  };

  const handleDelete = async (memberId: string) => {
    try {
      await deleteMember(memberId);

      toast({
        title: "Member deleted successfully",
        description: "Member has been deleted successfully.",
      });
      fetchMembers();
    } catch {
      toast({
        title: "Failed to delete member",
        description: "An error occurred while deleting member.",
      });
    }
  };

  const rows = members.map((member, index) => ({
    cellContent: [
      (index + 1).toString(),
      member.name,
      member.email,
      member.borrowedBooks?.length.toString() || "0",
      <>
        <Button
          variant={"outline"}
          onClick={() => handleOnRowClick(member._id as string)}
        >
          <Pencil />
        </Button>
        <span className="mx-2"></span>
        <Button
          variant={"outline"}
          onClick={() => handleDelete(member._id as string)}
        >
          <Trash2 />
        </Button>
      </>,
    ],
    onRowClick: () => handleOnRowClick(member._id as string),
  }));

  return (
    <div>
      <Button
        variant={"outline"}
        onClick={() => router.push("/members/manage")}
        className="m-4">
        <UserRoundPlus />
      </Button>
      <ListTable
        caption="Members"
        headers={["No", "Name", "Email", "Borrowed Books", "Actions"]}
        rows={rows}
        tooltip="Click to see this member's detail"
      />
    </div>
  );
};

export default Members;
