import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-base text-text-primary">
      <main className="flex-1 p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
}
