import { AppLayout } from "@/components/layout/AppLayout";
import { ProjectList } from "@/components/projects/ProjectList";
import { projectTypeConfig } from "@/lib/mock-data";
import { Plus, Filter, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const types = Object.entries(projectTypeConfig);

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <AppLayout title="Projects" subtitle="Manage all active and upcoming productions.">
      {/* Type filters */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setActiveFilter(null)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            !activeFilter ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          All Projects
        </button>
        {types.map(([key, config]) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              activeFilter === key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }} />
            {config.label}
          </button>
        ))}
        <div className="flex-1" />
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs hover:bg-primary/90 transition-colors">
          <Plus className="w-3 h-3" /> New Project
        </button>
      </div>

      <ProjectList />
    </AppLayout>
  );
}
