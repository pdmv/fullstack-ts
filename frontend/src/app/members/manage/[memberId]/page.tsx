'use client';

import InputCard, { InputCardProps } from "@/components/InputCard";
import { useToast } from "@/hooks/use-toast";
import { deleteMember, getMember, IMember, updateMember } from "@/services/memberService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MemberDetailPage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const { memberId } = useParams();
  const [member, setMember] = useState<IMember | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      const response = await getMember(memberId as string);
      setMember(response);
    };

    fetchMember();
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
    secondaryButtonOnClick: () => handleSubmit(true),
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <InputCard {...inputCardProps} />
    </div>
  );
}

export default MemberDetailPage;