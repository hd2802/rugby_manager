import type { ReactNode } from "react";
import { Header } from "@/components/header"

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-base text-text-primary">
      <Header />
      <main className="flex-1 p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
}
