import { Deliverable } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, CheckCircle, XCircle, Clock, Upload, Lock, AlertTriangle } from "lucide-react";

interface RevisionPanelProps {
  deliverable: Deliverable;
}

const revisionStatusConfig: Record<string, { label: string; style: string; icon: React.ReactNode }> = {
  'pending-review': { label: 'Pending Review', style: 'bg-warning/10 text-warning border-warning/20', icon: <Clock className="w-3 h-3" /> },
  'approved': { label: 'Approved', style: 'bg-success/10 text-success border-success/20', icon: <CheckCircle className="w-3 h-3" /> },
  'changes-requested': { label: 'Changes Requested', style: 'bg-destructive/10 text-destructive border-destructive/20', icon: <XCircle className="w-3 h-3" /> },
};

export function RevisionPanel({ deliverable }: RevisionPanelProps) {
  const atLimit = deliverable.revisions.length >= deliverable.maxRevisions;

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Revisions — {deliverable.name}
        </h3>
        <div className="flex items-center gap-2 text-xs">
          <span className={cn(
            "font-mono",
            atLimit ? "text-warning" : "text-muted-foreground"
          )}>
            {deliverable.revisions.length}/{deliverable.maxRevisions}
          </span>
          {atLimit && (
            <Badge variant="outline" className="text-[10px] bg-warning/10 text-warning border-warning/20 gap-1">
              <Lock className="w-3 h-3" /> Limit Reached
            </Badge>
          )}
        </div>
      </div>

      {deliverable.revisions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Upload className="w-8 h-8 mb-2 opacity-40" />
          <p className="text-sm">No revisions uploaded yet</p>
          <button className="mt-3 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs hover:bg-primary/90 transition-colors">
            Upload First Version
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {[...deliverable.revisions].reverse().map((rev) => {
            const config = revisionStatusConfig[rev.status];
            return (
              <div key={rev.id} className="border border-border/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">v{rev.version}</span>
                    <span className="text-xs text-muted-foreground">by {rev.uploadedBy}</span>
                    <span className="text-xs text-muted-foreground">· {rev.uploadedAt}</span>
                  </div>
                  <Badge variant="outline" className={cn("text-[10px] gap-1", config.style)}>
                    {config.icon}
                    {config.label}
                  </Badge>
                </div>

                {rev.comments.length > 0 && (
                  <>
                    <Separator className="my-3" />
                    <div className="space-y-2">
                      {rev.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-2 p-2 rounded-lg bg-muted/30">
                          <MessageSquare className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="font-medium text-foreground">{comment.author}</span>
                              {comment.timecode && (
                                <span className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded text-[10px]">
                                  {comment.timecode}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {atLimit && (
            <div className="flex items-start gap-3 p-3 rounded-lg border bg-warning/5 border-warning/20">
              <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground">Revision limit reached</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Additional revisions require owner approval or client payment.
                </p>
                <button className="mt-2 px-3 py-1 rounded-lg bg-warning text-warning-foreground text-xs hover:bg-warning/90 transition-colors">
                  Request Extra Revision
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
