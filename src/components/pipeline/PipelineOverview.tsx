import { pipelineStages } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function PipelineOverview() {
  return (
    <div className="flex items-stretch gap-2">
      {pipelineStages.map((stage, i) => (
        <div key={stage.id} className="flex items-center gap-2 flex-1">
          <div className="glass rounded-xl p-4 flex-1 text-center hover:border-primary/30 transition-all cursor-pointer group">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{stage.label}</p>
            <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{stage.count}</p>
            <p className="text-xs text-muted-foreground mt-1">${(stage.value / 1000).toFixed(0)}k</p>
          </div>
          {i < pipelineStages.length - 1 && (
            <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}
