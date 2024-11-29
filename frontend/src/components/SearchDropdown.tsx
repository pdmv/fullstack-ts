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
import { useDropdownData } from "@/hooks/useDropdownData";

interface SearchDropdownProps<T> {
  fetchItems: (searchTerm: string) => Promise<T[]>;
  placeholder?: string;
  labelKey: keyof T;
  onSelectItem: (item: T | null) => void;
}

export const SearchDropdown = <T,>({
  fetchItems,
  placeholder = "Search...",
  labelKey,
  onSelectItem,
}: SearchDropdownProps<T>) => {
  const { items, selectedItem, loading, error, setSelectedItem, fetchData } =
    useDropdownData(fetchItems);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    fetchData(term);
  };

  const handleSelect = (item: T | null) => {
    setSelectedItem(item);
    onSelectItem(item);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedItem
            ? (selectedItem[labelKey] as React.ReactNode)
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            value={searchTerm}
            onValueChange={handleSearchChange}
            placeholder="Type to search..."
          />
          {loading && (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          )}
          {error && (
            <div className="p-4 text-center text-red-500">
              Failed to load data.
            </div>
          )}
          {!loading && !error && (
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {items.map((item, index) => (
                  <CommandItem key={index} onSelect={() => handleSelect(item)}>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedItem === item ? "opacity-100" : "opacity-0"
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
