import { PhaseDetail, phaseLabels } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Check, Lock, Play } from "lucide-react";

interface PhaseTimelineProps {
  phases: PhaseDetail[];
  activePhase: string;
  onSelectPhase: (phase: string) => void;
}

const phaseStatusIcon = {
  completed: <Check className="w-3.5 h-3.5" />,
  active: <Play className="w-3.5 h-3.5" />,
  locked: <Lock className="w-3.5 h-3.5" />,
};

export function PhaseTimeline({ phases, activePhase, onSelectPhase }: PhaseTimelineProps) {
  return (
    <div className="flex items-center gap-1">
      {phases.map((pd, i) => (
        <div key={pd.phase} className="flex items-center gap-1 flex-1">
          <button
            onClick={() => onSelectPhase(pd.phase)}
            className={cn(
              "flex-1 flex items-center gap-2 px-3 py-3 rounded-lg text-xs font-medium transition-all border",
              pd.phase === activePhase && "ring-1 ring-primary/50",
              pd.status === 'completed' && "bg-success/10 border-success/20 text-success",
              pd.status === 'active' && "bg-primary/10 border-primary/20 text-primary",
              pd.status === 'locked' && "bg-muted/50 border-border/50 text-muted-foreground cursor-not-allowed opacity-60"
            )}
          >
            <span className={cn(
              "flex items-center justify-center w-6 h-6 rounded-full shrink-0",
              pd.status === 'completed' && "bg-success/20",
              pd.status === 'active' && "bg-primary/20",
              pd.status === 'locked' && "bg-muted"
            )}>
              {phaseStatusIcon[pd.status]}
            </span>
            <span className="truncate">{phaseLabels[pd.phase]}</span>
          </button>
          {i < phases.length - 1 && (
            <div className={cn(
              "w-4 h-px shrink-0",
              pd.status === 'completed' ? "bg-success/40" : "bg-border"
            )} />
          )}
        </div>
      ))}
    </div>
  );
}
