import { AppLayout } from "@/components/layout/AppLayout";
import { mockTeam } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const roleStyles: Record<string, string> = {
  owner: 'bg-primary/10 text-primary border-primary/20',
  producer: 'bg-[hsl(280,65%,60%)]/10 text-[hsl(280,65%,60%)] border-[hsl(280,65%,60%)]/20',
  editor: 'bg-[hsl(200,80%,55%)]/10 text-[hsl(200,80%,55%)] border-[hsl(200,80%,55%)]/20',
  shooter: 'bg-success/10 text-success border-success/20',
  finance: 'bg-warning/10 text-warning border-warning/20',
};

export default function Team() {
  return (
    <AppLayout title="Team" subtitle="Monitor your team's workload, performance, and roles.">
      <div className="grid grid-cols-1 gap-4">
        {mockTeam.map((member) => (
          <div key={member.id} className="glass rounded-xl p-5 hover:border-primary/30 transition-all duration-200 cursor-pointer group">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary shrink-0">
                {member.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{member.name}</h3>
                  <Badge variant="outline" className={cn("text-[10px] capitalize", roleStyles[member.role])}>
                    {member.role}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-xs text-muted-foreground">
                  <span>{member.activeProjects} active projects</span>
                  <span>{member.completedTasks}/{member.totalTasks} tasks done</span>
                </div>
              </div>

              {/* Utilization */}
              <div className="w-48 shrink-0">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Utilization</span>
                  <span className={cn(
                    "font-mono font-semibold",
                    member.utilization > 90 ? "text-destructive" : member.utilization > 75 ? "text-warning" : "text-success"
                  )}>
                    {member.utilization}%
                  </span>
                </div>
                <Progress value={member.utilization} className="h-1.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
