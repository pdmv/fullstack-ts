'use client';

import InputCard, { InputCardProps } from "@/components/InputCard"
import { useToast } from "@/hooks/use-toast";
import { addMember, IMember } from "@/services/memberService";
import { useState } from "react";

const MemberManagement = () => {
  const { toast } = useToast();

  const [member, setMember] = useState<IMember>({
    name: "",
    email: "",
  });

  const handleInputChange = (key: keyof IMember, value: string | number) => {
    setMember((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    inputCardProps.isEnable = false;

    try {
      await addMember(member);

      setMember({
        name: "",
        email: "",
      });

      toast({
        title: "Member added successfully",
        description: "The member has been added successfully.",
      });
    } catch {
      toast({
        title: "Failed to add member",
        description: "An error occurred while adding the member.",
      });
    };
  }

  const inputCardProps: InputCardProps = {
    title: "Member Management",
    description: "You can add a new member by filling the form below.",
    onSubmit: handleSubmit,
    isEnable: !member.name || !member.email,
    inputs: [
      {
        id: "name",
        label: "Name",
        placeholder: "The name of the member",
        value: member.name,
        onChange: (value) => handleInputChange("name", value),
      },
      {
        id: "email",
        label: "Email",
        placeholder: "The member's email",
        type: "email",
        value: member.email,
        onChange: (value) => handleInputChange("email", value),
      },
    ],
    primaryButton: "Add",
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <InputCard {...inputCardProps} />
    </div>
  );
}

export default MemberManagement;