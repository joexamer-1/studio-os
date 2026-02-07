import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { mockInvoices } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const cashFlowData = [
  { month: 'Sep', inflow: 42000, outflow: 28000 },
  { month: 'Oct', inflow: 55000, outflow: 32000 },
  { month: 'Nov', inflow: 48000, outflow: 30000 },
  { month: 'Dec', inflow: 62000, outflow: 35000 },
  { month: 'Jan', inflow: 58000, outflow: 33000 },
  { month: 'Feb', inflow: 71000, outflow: 38000 },
];

const totalPaid = mockInvoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
const totalPending = mockInvoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0);
const totalOverdue = mockInvoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0);

const invoiceStatusStyles: Record<string, string> = {
  paid: 'bg-success/10 text-success border-success/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  overdue: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function Financials() {
  return (
    <AppLayout title="Financials" subtitle="Revenue, invoices, and cash flow management.">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Revenue"
          value="$336,000"
          change="+18% YoY"
          changeType="positive"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatCard
          title="Collected"
          value={`$${(totalPaid / 1000).toFixed(0)}k`}
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <StatCard
          title="Pending"
          value={`$${(totalPending / 1000).toFixed(0)}k`}
          change={`${mockInvoices.filter(i => i.status === 'pending').length} invoices`}
          changeType="neutral"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <StatCard
          title="Overdue"
          value={`$${(totalOverdue / 1000).toFixed(0)}k`}
          change="Action required"
          changeType="negative"
          icon={<AlertTriangle className="w-5 h-5" />}
        />
      </div>

      {/* Cash Flow Chart */}
      <div className="glass rounded-xl p-6 mb-8">
        <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Cash Flow</h2>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={cashFlowData}>
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
            <Area type="monotone" dataKey="inflow" stroke="hsl(40, 90%, 55%)" fill="hsl(40, 90%, 55%)" fillOpacity={0.1} strokeWidth={2} name="Inflow" />
            <Area type="monotone" dataKey="outflow" stroke="hsl(0, 72%, 51%)" fill="hsl(0, 72%, 51%)" fillOpacity={0.05} strokeWidth={2} name="Outflow" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Invoices */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Invoices</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Invoice</th>
              <th className="text-left text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Project</th>
              <th className="text-left text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Client</th>
              <th className="text-left text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Status</th>
              <th className="text-right text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Amount</th>
              <th className="text-right text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {mockInvoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer">
                <td className="px-4 py-3 text-sm font-mono text-foreground">{invoice.id}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{invoice.projectName}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{invoice.clientName}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className={cn("text-[10px] capitalize", invoiceStatusStyles[invoice.status])}>
                    {invoice.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-foreground text-right font-mono">${invoice.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground text-right">{invoice.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
