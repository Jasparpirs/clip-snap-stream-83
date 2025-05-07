
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 relative">
        <Sidebar isOpen={sidebarOpen} />
        <main className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          sidebarOpen ? "ml-0 md:ml-64" : "ml-0"
        )}>
          <div className="pb-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
