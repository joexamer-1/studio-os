import { Deliverable } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Upload, MessageSquare, Lock, CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface DeliverableCardProps {
  deliverable: Deliverable;
  phaseLocked: boolean;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const statusConfig: Record<string, { label: string; style: string; icon: React.ReactNode }> = {
  'pending': { label: 'Pending', style: 'bg-muted text-muted-foreground border-border', icon: <Clock className="w-3 h-3" /> },
  'in-progress': { label: 'In Progress', style: 'bg-primary/10 text-primary border-primary/20', icon: <Upload className="w-3 h-3" /> },
  'review': { label: 'In Review', style: 'bg-warning/10 text-warning border-warning/20', icon: <MessageSquare className="w-3 h-3" /> },
  'approved': { label: 'Approved', style: 'bg-success/10 text-success border-success/20', icon: <CheckCircle className="w-3 h-3" /> },
  'locked': { label: 'Locked', style: 'bg-destructive/10 text-destructive border-destructive/20', icon: <Lock className="w-3 h-3" /> },
};

export function DeliverableCard({ deliverable, phaseLocked, onSelect, isSelected }: DeliverableCardProps) {
  const config = statusConfig[deliverable.status];
  const revisionCount = deliverable.revisions.length;
  const atLimit = revisionCount >= deliverable.maxRevisions;

  return (
    <button
      onClick={() => !phaseLocked && onSelect(deliverable.id)}
      className={cn(
        "w-full text-left glass rounded-xl p-4 transition-all duration-200",
        phaseLocked ? "opacity-50 cursor-not-allowed" : "hover:border-primary/30 cursor-pointer",
        isSelected && "border-primary/50 ring-1 ring-primary/30"
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className="text-sm font-medium text-foreground">{deliverable.name}</span>
        </div>
        <Badge variant="outline" className={cn("text-[10px] gap-1", config.style)}>
          {config.icon}
          {config.label}
        </Badge>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
        <span>Assigned to {deliverable.assignee}</span>
        <div className="flex items-center gap-2">
          {atLimit && <AlertTriangle className="w-3 h-3 text-warning" />}
          <span className={cn(atLimit && "text-warning font-medium")}>
            {revisionCount}/{deliverable.maxRevisions} revisions
          </span>
        </div>
      </div>

      {revisionCount > 0 && (
        <Progress
          value={(revisionCount / deliverable.maxRevisions) * 100}
          className="h-1 mt-2"
        />
      )}
    </button>
  );
}
