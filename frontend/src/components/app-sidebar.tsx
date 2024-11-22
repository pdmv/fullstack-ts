"use client";

import { ChevronDown, Library, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const bookItems = [
  {
    title: "List of Books",
    url: "/books",
  },
  {
    title: "Manage Books",
    url: "/books/manage",
  },
];

const memberItems = [
  {
    title: "List of Members",
    url: "/members",
  },
  {
    title: "Manage Members",
    url: "/members/manage",
  },
];

function SidebarGroupSection({
  label,
  items,
  icon,
}: {
  label: string;
  items: { title: string; url: string }[];
  icon?: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAnyItemActive = items.some((item) => pathname === item.url);
  const [isOpen, setIsOpen] = useState(isAnyItemActive);

  useEffect(() => {
    if (isAnyItemActive) {
      setIsOpen(true);
    }
  }, [isAnyItemActive]);

  return (
    <SidebarMenu>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <span className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  {icon}
                  <span className="ml-3">{label}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isOpen ? "rotate-0" : "-rotate-90"
                  }`}
                />
              </span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuSubItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Library Management System</SidebarGroupLabel>
          <SidebarGroupContent>
            {/* Books Section */}
            <SidebarGroupSection label="Books" items={bookItems} icon={<Library size={18} />} />

            {/* Members Section */}
            <SidebarGroupSection label="Members" items={memberItems} icon={<Users size={18} />} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
