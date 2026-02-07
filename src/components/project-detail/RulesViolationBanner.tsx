import { RuleViolation } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { AlertTriangle, ShieldAlert, Info, Ban } from "lucide-react";

interface RulesViolationBannerProps {
  violations: RuleViolation[];
}

const severityConfig = {
  critical: { icon: <ShieldAlert className="w-4 h-4" />, style: "bg-destructive/5 border-destructive/20 text-destructive" },
  warning: { icon: <AlertTriangle className="w-4 h-4" />, style: "bg-warning/5 border-warning/20 text-warning" },
  info: { icon: <Info className="w-4 h-4" />, style: "bg-primary/5 border-primary/20 text-primary" },
};

export function RulesViolationBanner({ violations }: RulesViolationBannerProps) {
  if (violations.length === 0) return null;

  return (
    <div className="space-y-2">
      {violations.map((v) => {
        const config = severityConfig[v.severity];
        return (
          <div key={v.id} className={cn("flex items-start gap-3 p-3 rounded-xl border", config.style)}>
            <span className="mt-0.5 shrink-0">{config.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-foreground">{v.rule}</p>
                {v.blocksProgress && (
                  <span className="flex items-center gap-1 text-[10px] font-medium text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">
                    <Ban className="w-3 h-3" /> Blocks Progress
                  </span>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">{v.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
