import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Shield, Bell, Users, Cog, AlertTriangle } from "lucide-react";

const rules = [
  { id: 'r1', name: 'Block editing without completed shooting', description: 'Post-production phase cannot start until production phase is marked complete.', enabled: true, severity: 'critical' },
  { id: 'r2', name: 'Block delivery without payment', description: 'Final deliverables cannot be sent until all invoices are marked as paid.', enabled: true, severity: 'critical' },
  { id: 'r3', name: 'Lock project after revision limit', description: 'Automatically lock review phase when revision count exceeds project type limit.', enabled: true, severity: 'warning' },
  { id: 'r4', name: 'Alert for delayed phases', description: 'Send notification when a phase exceeds its estimated timeline by more than 2 days.', enabled: true, severity: 'warning' },
  { id: 'r5', name: 'Warn for unprofitable projects', description: 'Show warning when project costs exceed 80% of budget with less than 70% progress.', enabled: true, severity: 'warning' },
  { id: 'r6', name: 'Extra revisions require approval', description: 'Beyond the revision limit, additional revisions require owner approval or client payment.', enabled: false, severity: 'info' },
];

export default function SettingsPage() {
  return (
    <AppLayout title="Settings" subtitle="System configuration, rules engine, and access control.">
      {/* Rules Engine */}
      <div className="glass rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Rules Engine</h2>
        </div>
        <div className="space-y-4">
          {rules.map((rule) => (
            <div key={rule.id} className="flex items-start justify-between py-3 border-b border-border/50 last:border-0">
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${rule.severity === 'critical' ? 'text-destructive' : rule.severity === 'warning' ? 'text-warning' : 'text-primary'}`} />
                <div>
                  <p className="text-sm font-medium text-foreground">{rule.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{rule.description}</p>
                </div>
              </div>
              <Switch defaultChecked={rule.enabled} />
            </div>
          ))}
        </div>
      </div>

      {/* Role Permissions */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Role Permissions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Permission</th>
                <th className="text-center text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Owner</th>
                <th className="text-center text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Producer</th>
                <th className="text-center text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Editor</th>
                <th className="text-center text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Shooter</th>
                <th className="text-center text-[10px] text-muted-foreground uppercase tracking-wider px-4 py-3 font-medium">Finance</th>
              </tr>
            </thead>
            <tbody>
              {[
                { perm: 'Manage clients & leads', perms: [true, true, false, false, false] },
                { perm: 'Create & assign projects', perms: [true, true, false, false, false] },
                { perm: 'Manage tasks', perms: [true, true, true, true, false] },
                { perm: 'View financials', perms: [true, false, false, false, true] },
                { perm: 'Approve revisions', perms: [true, true, false, false, false] },
                { perm: 'Send invoices', perms: [true, false, false, false, true] },
                { perm: 'Configure rules', perms: [true, false, false, false, false] },
              ].map((row) => (
                <tr key={row.perm} className="border-b border-border/50">
                  <td className="px-4 py-3 text-sm text-foreground">{row.perm}</td>
                  {row.perms.map((has, i) => (
                    <td key={i} className="px-4 py-3 text-center">
                      <span className={`text-sm ${has ? 'text-success' : 'text-muted-foreground/30'}`}>
                        {has ? '✓' : '—'}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
