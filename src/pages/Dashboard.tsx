import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProjectList } from "@/components/projects/ProjectList";
import { PipelineOverview } from "@/components/pipeline/PipelineOverview";
import { mockInvoices, mockProjects, mockTeam } from "@/lib/mock-data";
import {
  DollarSign,
  FolderKanban,
  TrendingUp,
  AlertTriangle,
  Clock,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: 'Sep', revenue: 42000, costs: 28000 },
  { month: 'Oct', revenue: 55000, costs: 32000 },
  { month: 'Nov', revenue: 48000, costs: 30000 },
  { month: 'Dec', revenue: 62000, costs: 35000 },
  { month: 'Jan', revenue: 58000, costs: 33000 },
  { month: 'Feb', revenue: 71000, costs: 38000 },
];

const totalRevenue = mockInvoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
const overdueAmount = mockInvoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0);
const activeProjects = mockProjects.filter(p => p.status !== 'completed').length;
const atRiskCount = mockProjects.filter(p => p.status === 'at-risk' || p.status === 'delayed').length;

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard" subtitle="Welcome back, Jordan. Here's your studio overview.">
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Monthly Revenue"
          value="$71,000"
          change="+22%"
          changeType="positive"
          subtitle="vs last month"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatCard
          title="Active Projects"
          value={String(activeProjects)}
          change={`${atRiskCount} at risk`}
          changeType={atRiskCount > 0 ? "negative" : "neutral"}
          icon={<FolderKanban className="w-5 h-5" />}
        />
        <StatCard
          title="Revenue Collected"
          value={`$${(totalRevenue / 1000).toFixed(0)}k`}
          change={`$${(overdueAmount / 1000).toFixed(0)}k overdue`}
          changeType="negative"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <StatCard
          title="Team Utilization"
          value="88%"
          change="+5%"
          changeType="positive"
          subtitle="avg across team"
          icon={<Users className="w-5 h-5" />}
        />
      </div>

      {/* Pipeline */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Pipeline</h2>
        <PipelineOverview />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="col-span-2 glass rounded-xl p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Revenue vs Costs</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 16%)" />
              <XAxis dataKey="month" tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(220, 18%, 10%)',
                  border: '1px solid hsl(220, 15%, 16%)',
                  borderRadius: '8px',
                  color: 'hsl(40, 10%, 92%)',
                  fontSize: '12px',
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Bar dataKey="revenue" fill="hsl(40, 90%, 55%)" radius={[4, 4, 0, 0]} name="Revenue" />
              <Bar dataKey="costs" fill="hsl(220, 15%, 25%)" radius={[4, 4, 0, 0]} name="Costs" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Alerts</h2>
          <div className="space-y-3">
            <AlertItem icon={<AlertTriangle className="w-4 h-4" />} type="warning" title="Budget risk" description="Craft Studios Brand Film at 60% budget with 55% progress" />
            <AlertItem icon={<Clock className="w-4 h-4" />} type="error" title="Overdue invoice" description="Craft Studios — $21,000 overdue by 2 days" />
            <AlertItem icon={<Clock className="w-4 h-4" />} type="error" title="Overdue invoice" description="Skyline Event Reel — $8,000 overdue by 4 days" />
            <AlertItem icon={<AlertTriangle className="w-4 h-4" />} type="warning" title="Delayed project" description="Momentum YouTube Series behind schedule" />
            <AlertItem icon={<Users className="w-4 h-4" />} type="info" title="High utilization" description="Chris Nakamura at 95% capacity" />
          </div>
        </div>
      </div>

      {/* Active Projects */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Active Projects</h2>
        <ProjectList />
      </div>
    </AppLayout>
  );
}

function AlertItem({ icon, type, title, description }: { icon: React.ReactNode; type: 'warning' | 'error' | 'info'; title: string; description: string }) {
  return (
    <div className={cn(
      "flex items-start gap-3 p-3 rounded-lg border",
      type === 'warning' && "bg-warning/5 border-warning/20",
      type === 'error' && "bg-destructive/5 border-destructive/20",
      type === 'info' && "bg-primary/5 border-primary/20"
    )}>
      <div className={cn(
        "mt-0.5",
        type === 'warning' && "text-warning",
        type === 'error' && "text-destructive",
        type === 'info' && "text-primary"
      )}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-foreground">{title}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  );
}
