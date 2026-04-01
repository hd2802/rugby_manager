import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar.tsx"
import { AppHeader } from "@/components/app-header.tsx"

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen w-screen bg-base text-text-primary font-manrope">
        <AppHeader />
        <div className="flex flex-1 min-h-0 m-8">
          <AppSidebar />
          <main className="flex-1 p-4 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
