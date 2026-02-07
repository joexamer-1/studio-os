import { mockProjects, phaseLabels, projectTypeConfig } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  'on-track': 'bg-success/10 text-success border-success/20',
  'at-risk': 'bg-warning/10 text-warning border-warning/20',
  'delayed': 'bg-destructive/10 text-destructive border-destructive/20',
  'completed': 'bg-primary/10 text-primary border-primary/20',
};

export function ProjectList() {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      {mockProjects.map((project) => {
        const typeConfig = projectTypeConfig[project.type];
        return (
          <div
            key={project.id}
            onClick={() => navigate(`/projects/${project.id}`)}
            className="glass rounded-xl p-4 hover:border-primary/30 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: typeConfig.color }}
                />
                <div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{project.clientName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] border-border">
                  {typeConfig.label}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn("text-[10px]", statusStyles[project.status])}
                >
                  {project.status.replace('-', ' ')}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>{phaseLabels[project.phase]}</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-1.5" />
            <div className="flex items-center justify-between mt-3 text-xs">
              <div className="flex -space-x-2">
                {project.teamMembers.slice(0, 3).map((member) => (
                  <div
                    key={member}
                    className="w-6 h-6 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[9px] font-medium text-secondary-foreground"
                  >
                    {member[0]}
                  </div>
                ))}
                {project.teamMembers.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[9px] text-muted-foreground">
                    +{project.teamMembers.length - 3}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">
                  ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                </span>
                <span className="text-muted-foreground">Due {project.deadline}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
