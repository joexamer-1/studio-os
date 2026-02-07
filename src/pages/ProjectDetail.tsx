import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PhaseTimeline } from "@/components/project-detail/PhaseTimeline";
import { DeliverableCard } from "@/components/project-detail/DeliverableCard";
import { RevisionPanel } from "@/components/project-detail/RevisionPanel";
import { RulesViolationBanner } from "@/components/project-detail/RulesViolationBanner";
import { StatCard } from "@/components/dashboard/StatCard";
import { getProjectDetail, projectTypeConfig, phaseLabels } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  ArrowLeft,
  DollarSign,
  Target,
  Clock,
  Users,
  FileText,
  Calendar,
} from "lucide-react";

const statusStyles: Record<string, string> = {
  'on-track': 'bg-success/10 text-success border-success/20',
  'at-risk': 'bg-warning/10 text-warning border-warning/20',
  'delayed': 'bg-destructive/10 text-destructive border-destructive/20',
  'completed': 'bg-primary/10 text-primary border-primary/20',
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = getProjectDetail(id || '');
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [selectedDeliverable, setSelectedDeliverable] = useState<string | null>(null);

  if (!project) {
    return (
      <AppLayout title="Project Not Found">
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-muted-foreground mb-4">This project doesn't exist.</p>
          <Link to="/projects" className="text-primary text-sm hover:underline">← Back to Projects</Link>
        </div>
      </AppLayout>
    );
  }

  const typeConfig = projectTypeConfig[project.type];
  const activePhase = selectedPhase || project.phase;
  const currentPhaseData = project.phases.find(p => p.phase === activePhase);
  const budgetUsedPercent = Math.round((project.spent / project.budget) * 100);
  const paymentPercent = Math.round((project.totalPaid / project.totalInvoiced) * 100);

  const selectedDel = currentPhaseData?.deliverables.find(d => d.id === selectedDeliverable);

  return (
    <AppLayout title={project.name} subtitle={`${typeConfig.label} · ${project.clientName}`}>
      {/* Back link */}
      <Link to="/projects" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-3 h-3" /> Back to Projects
      </Link>

      {/* Rule Violations */}
      {project.ruleViolations.length > 0 && (
        <div className="mb-6">
          <RulesViolationBanner violations={project.ruleViolations} />
        </div>
      )}

      {/* Project header stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Budget"
          value={`$${project.budget.toLocaleString()}`}
          change={`${budgetUsedPercent}% used`}
          changeType={budgetUsedPercent > 85 ? 'negative' : budgetUsedPercent > 70 ? 'neutral' : 'positive'}
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatCard
          title="Progress"
          value={`${project.progress}%`}
          change={phaseLabels[project.phase]}
          changeType="neutral"
          icon={<Target className="w-5 h-5" />}
        />
        <StatCard
          title="Deadline"
          value={project.deadline}
          icon={<Calendar className="w-5 h-5" />}
        />
        <StatCard
          title="Payment"
          value={`$${project.totalPaid.toLocaleString()}`}
          change={`${paymentPercent}% of $${(project.totalInvoiced / 1000).toFixed(0)}k`}
          changeType={paymentPercent >= 100 ? 'positive' : paymentPercent < 50 ? 'negative' : 'neutral'}
          icon={<DollarSign className="w-5 h-5" />}
        />
      </div>

      {/* Status + Team row */}
      <div className="flex items-center gap-3 mb-6">
        <Badge variant="outline" className={cn("text-xs", statusStyles[project.status])}>
          {project.status.replace('-', ' ')}
        </Badge>
        <div className="flex -space-x-2">
          {project.teamMembers.map((m) => (
            <div key={m} className="w-7 h-7 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[10px] font-medium text-secondary-foreground">
              {m[0]}
            </div>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">{project.teamMembers.join(', ')}</span>
      </div>

      {/* Phase Timeline */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Workflow Phases</h2>
        <PhaseTimeline
          phases={project.phases}
          activePhase={activePhase}
          onSelectPhase={(p) => { setSelectedPhase(p); setSelectedDeliverable(null); }}
        />
      </div>

      {/* Phase content */}
      <div className="grid grid-cols-2 gap-6">
        {/* Deliverables column */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {phaseLabels[activePhase as keyof typeof phaseLabels]} Deliverables
            </h2>
            <span className="text-xs text-muted-foreground">
              {currentPhaseData?.deliverables.length || 0} items
            </span>
          </div>

          {currentPhaseData && currentPhaseData.deliverables.length > 0 ? (
            <div className="space-y-3">
              {currentPhaseData.deliverables.map((del) => (
                <DeliverableCard
                  key={del.id}
                  deliverable={del}
                  phaseLocked={currentPhaseData.status === 'locked'}
                  onSelect={setSelectedDeliverable}
                  isSelected={selectedDeliverable === del.id}
                />
              ))}
            </div>
          ) : (
            <div className="glass rounded-xl p-8 text-center">
              <FileText className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {currentPhaseData?.status === 'locked'
                  ? 'This phase is locked. Complete previous phases first.'
                  : 'No deliverables in this phase yet.'}
              </p>
            </div>
          )}

          {/* Phase completion info */}
          {currentPhaseData && currentPhaseData.status === 'locked' && (
            <div className="mt-3 flex items-start gap-2 p-3 rounded-lg border bg-muted/30 border-border/50">
              <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground">
                This phase will unlock when the previous phase is completed and all its deliverables are approved.
              </p>
            </div>
          )}
        </div>

        {/* Revision panel */}
        <div>
          {selectedDel ? (
            <RevisionPanel deliverable={selectedDel} />
          ) : (
            <div className="glass rounded-xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
              <MessageIcon />
              <p className="text-sm text-muted-foreground mt-2">Select a deliverable to view its revisions</p>
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      {project.notes.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Project Notes</h2>
          <div className="glass rounded-xl p-4 space-y-2">
            {project.notes.map((note, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-primary mt-0.5">•</span>
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  );
}

function MessageIcon() {
  return (
    <svg className="w-8 h-8 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  );
}
