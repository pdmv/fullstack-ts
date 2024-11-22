import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Metadata } from "next";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { House } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Library Management System",
  description: "Manage your library with ease",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <SidebarProvider>
          <AppSidebar />

          <main className="w-full">
            <SidebarTrigger className="m-2" />
            {children}
          </main>

          <Button
            variant="outline"
            asChild
            className="fixed bottom-4 right-4 w-12 h-12 flex items-center justify-center rounded-full shadow-lg"
          >
            <Link href="/">
              <House style={{ width: "20px", height: "20px" }} />
            </Link>
          </Button>

          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
