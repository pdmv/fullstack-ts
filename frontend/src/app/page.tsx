"use client";

import { Button } from "@/components/ui/button";
import { Library, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Button
        variant="outline"
        className="w-36 h-36 flex flex-col items-center justify-center"
        asChild
      >
        <Link href="/books">
          <div className="flex flex-col items-center justify-center">
            <Library style={{ width: "32px", height: "32px" }} />
            <span className="pt-2 text-base">Books</span>
          </div>
        </Link>
      </Button>

      <span className="w-10" />

      <Button
        variant="outline"
        className="w-36 h-36 flex flex-col items-center justify-center"
        asChild
      >
        <Link href="/members">
          <div className="flex flex-col items-center justify-center">
            <Users style={{ width: "32px", height: "32px" }} />
            <span className="pt-2 text-base">Members</span>
          </div>
        </Link>
      </Button>
    </div>
  );
}
