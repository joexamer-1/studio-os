import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  subtitle?: string;
}

export function StatCard({ title, value, change, changeType = 'neutral', icon, subtitle }: StatCardProps) {
  return (
    <div className="glass rounded-xl p-5 animate-slide-up">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {(change || subtitle) && (
            <div className="flex items-center gap-2">
              {change && (
                <span
                  className={cn(
                    "text-xs font-medium px-1.5 py-0.5 rounded",
                    changeType === 'positive' && "text-success bg-success/10",
                    changeType === 'negative' && "text-destructive bg-destructive/10",
                    changeType === 'neutral' && "text-muted-foreground bg-muted"
                  )}
                >
                  {change}
                </span>
              )}
              {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
            </div>
          )}
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
}
