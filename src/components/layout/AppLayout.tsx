import { AppSidebar } from "./AppSidebar";
import { Bell, Search } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AppLayout({ children, title, subtitle }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="pl-60">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-8 border-b border-border bg-background/80 backdrop-blur-xl">
          <div>
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors">
              <Search className="w-3.5 h-3.5" />
              <span className="text-muted-foreground">Search...</span>
              <kbd className="ml-4 text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
            </button>
            <button className="relative p-2 rounded-lg text-muted-foreground hover:bg-secondary transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              JB
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
