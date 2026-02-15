import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Film, ArrowRight, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function StudioSetup() {
  const { user, refreshProfile } = useAuth();
  const [studioName, setStudioName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      // Create studio
      const { data: studio, error: studioError } = await supabase
        .from("studios")
        .insert({ name: studioName, created_by: user.id })
        .select()
        .single();

      if (studioError) throw studioError;

      // Link profile to studio
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ studio_id: studio.id })
        .eq("user_id", user.id);

      if (profileError) throw profileError;

      // Assign owner role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({ user_id: user.id, studio_id: studio.id, role: "owner" as any });

      if (roleError) throw roleError;

      await refreshProfile();
      toast({ title: "Studio created!", description: `Welcome to ${studioName}` });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary glow-amber">
            <Film className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-xl font-bold text-foreground tracking-wide">StudioOS</span>
            <span className="block text-[10px] text-muted-foreground uppercase tracking-[0.3em]">Operating System</span>
          </div>
        </div>

        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-foreground mb-1">Set up your studio</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Give your studio a name to get started. You can change this later.
          </p>

          <form onSubmit={handleCreate} className="space-y-4">
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Studio name"
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !studioName.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-all disabled:opacity-50 glow-amber"
            >
              {loading ? "Creating..." : "Create Studio"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
