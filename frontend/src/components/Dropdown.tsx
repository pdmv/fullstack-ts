import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DropdownProps<T> {
  items: T[];
  selectedItem: T | null;
  loading: boolean;
  labelKey: keyof T;
  idKey: keyof T;
  onSelect: (item: T | null) => void;
  placeholder: string;
}

export const Dropdown = <T,>({
  items,
  selectedItem,
  loading,
  labelKey,
  idKey,
  onSelect,
  placeholder,
}: DropdownProps<T>) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (currentId: string) => {
    const selected =
      items.find((item) => String(item[idKey]) === currentId) || null;
    setValue(currentId === value ? "" : currentId);
    onSelect(selected);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {selectedItem
            ? (selectedItem[labelKey] as React.ReactNode)
            : `Select ${placeholder.toLowerCase()}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : (
            <CommandList>
              <CommandEmpty>Not found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={String(item[idKey])}
                    value={String(item[idKey])}
                    onSelect={() => handleSelect(String(item[idKey]))}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item[labelKey] ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item[labelKey] as React.ReactNode}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};
