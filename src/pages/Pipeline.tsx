import { AppLayout } from "@/components/layout/AppLayout";
import { PipelineOverview } from "@/components/pipeline/PipelineOverview";
import { mockLeads } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Plus, Filter, ArrowUpRight } from "lucide-react";

const statusStyles: Record<string, string> = {
  new: 'bg-primary/10 text-primary border-primary/20',
  contacted: 'bg-chart-2/10 text-[hsl(200,80%,55%)] border-[hsl(200,80%,55%)]/20',
  qualified: 'bg-success/10 text-success border-success/20',
  proposal: 'bg-warning/10 text-warning border-warning/20',
  lost: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function Pipeline() {
  return (
    <AppLayout title="Pipeline" subtitle="Lead → Deal → Project → Delivery → Payment">
      <div className="mb-8">
        <PipelineOverview />
      </div>

      {/* Leads Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Active Leads</h2>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs hover:bg-secondary/80 transition-colors">
              <Filter className="w-3 h-3" /> Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs hover:bg-primary/90 transition-colors">
              <Plus className="w-3 h-3" /> New Lead
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Contact</th>
              <th className="text-left text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Company</th>
              <th className="text-left text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Source</th>
              <th className="text-left text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Status</th>
              <th className="text-right text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Value</th>
              <th className="text-right text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[10px] font-medium text-secondary-foreground">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{lead.name}</p>
                      <p className="text-[11px] text-muted-foreground">{lead.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{lead.company}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{lead.source}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className={cn("text-[10px] capitalize", statusStyles[lead.status])}>
                    {lead.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-foreground text-right font-mono">${lead.value.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground text-right">{lead.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
