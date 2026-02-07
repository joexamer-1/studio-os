import { AppLayout } from "@/components/layout/AppLayout";
import { mockClients } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Clients() {
  return (
    <AppLayout title="Clients" subtitle="Manage your client relationships and financials.">
      <div className="flex items-center justify-end mb-6">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs hover:bg-primary/90 transition-colors">
          <Plus className="w-3 h-3" /> Add Client
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {mockClients.map((client) => (
          <div key={client.id} className="glass rounded-xl p-5 hover:border-primary/30 transition-all duration-200 cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {client.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{client.name}</h3>
                  <p className="text-xs text-muted-foreground">{client.company}</p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px]",
                  client.status === 'active' ? "bg-success/10 text-success border-success/20" : "bg-muted text-muted-foreground border-border"
                )}
              >
                {client.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Revenue</p>
                <p className="text-sm font-bold text-foreground mt-1">${client.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Projects</p>
                <p className="text-sm font-bold text-foreground mt-1">{client.projectCount}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{client.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{client.phone}</span>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
