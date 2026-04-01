import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar.tsx"

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex h-screen w-screen bg-base text-text-primary">
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
