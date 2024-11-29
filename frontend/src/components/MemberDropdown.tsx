import * as React from "react";
import { useDropdownData } from "@/hooks/useDropdownData";
import { getMembers, IMember } from "@/services/memberService";
import { useToast } from "@/hooks/use-toast";
import { Dropdown } from "./Dropdown";

interface MemberDropdownProps {
  onSelectMember: (member: IMember | null) => void;
}

const MemberDropdown: React.FC<MemberDropdownProps> = ({ onSelectMember }) => {
  const { toast } = useToast();
  const { items, selectedItem, loading, setSelectedItem } =
    useDropdownData<IMember>(getMembers);

  const handleSelect = (member: IMember | null) => {
    setSelectedItem(member);
    onSelectMember(member);
    if (!member) {
      toast({
        title: "No member selected",
        description: "Please select a member.",
      });
    }
  };

  return (
    <Dropdown
      items={items}
      selectedItem={selectedItem}
      loading={loading}
      labelKey="name"
      idKey="_id"
      onSelect={handleSelect}
      placeholder="a member"
    />
  );
};

export default MemberDropdown;