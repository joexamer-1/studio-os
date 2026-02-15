
-- ========================================
-- STUDIO OS - COMPLETE DATABASE SCHEMA
-- ========================================

-- 1. ENUMS
CREATE TYPE public.app_role AS ENUM ('owner', 'producer', 'editor', 'shooter', 'finance');
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'qualified', 'proposal', 'lost');
CREATE TYPE public.deal_status AS ENUM ('negotiation', 'approved', 'rejected');
CREATE TYPE public.project_type AS ENUM ('social-media', 'commercial', 'event', 'brand-film', 'youtube');
CREATE TYPE public.project_status AS ENUM ('on-track', 'at-risk', 'delayed', 'completed');
CREATE TYPE public.phase_name AS ENUM ('pre-production', 'production', 'post-production', 'review', 'delivery');
CREATE TYPE public.phase_status AS ENUM ('locked', 'active', 'completed');
CREATE TYPE public.deliverable_status AS ENUM ('pending', 'in-progress', 'review', 'approved', 'locked');
CREATE TYPE public.revision_status AS ENUM ('pending-review', 'approved', 'changes-requested');
CREATE TYPE public.invoice_status AS ENUM ('pending', 'paid', 'overdue');
CREATE TYPE public.rule_severity AS ENUM ('critical', 'warning', 'info');

-- 2. STUDIOS (tenant)
CREATE TABLE public.studios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  studio_id UUID REFERENCES public.studios(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. USER ROLES
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  studio_id UUID REFERENCES public.studios(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'editor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, studio_id, role)
);

-- 5. STUDIO INVITATIONS
CREATE TABLE public.studio_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES public.studios(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  role app_role NOT NULL DEFAULT 'editor',
  invited_by UUID NOT NULL,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (studio_id, email)
);

-- 6. CLIENTS
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES public.studios(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. LEADS
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES public.studios(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  source TEXT DEFAULT '',
  status lead_status NOT NULL DEFAULT 'new',
  value NUMERIC NOT NULL DEFAULT 0,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. DEALS
CREATE TABLE public.deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES public.studios(id) ON DELETE CASCADE NOT NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  value NUMERIC NOT NULL DEFAULT 0,
  status deal_status NOT NULL DEFAULT 'negotiation',
  project_type project_type NOT NULL DEFAULT 'commercial',
  notes TEXT DEFAULT '',
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. PROJECTS
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES public.studios(id) ON DELETE CASCADE NOT NULL,
  deal_id UUID REFERENCES public.deals(id) ON DELETE SET NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  type project_type NOT NULL DEFAULT 'commercial',
  status project_status NOT NULL DEFAULT 'on-track',
  budget NUMERIC NOT NULL DEFAULT 0,
  spent NUMERIC NOT NULL DEFAULT 0,
  progress INTEGER NOT NULL DEFAULT 0,
  deadline DATE,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. PROJECT TEAM ASSIGNMENTS
CREATE TABLE public.project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'editor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (project_id, user_id)
);

-- 11. PHASES
CREATE TABLE public.phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name phase_name NOT NULL,
  status phase_status NOT NULL DEFAULT 'locked',
  sort_order INTEGER NOT NULL DEFAULT 0,
  start_date DATE,
  end_date DATE,
  completed_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 12. DELIVERABLES
CREATE TABLE public.deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id UUID REFERENCES public.phases(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  status deliverable_status NOT NULL DEFAULT 'pending',
  assignee_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  max_revisions INTEGER NOT NULL DEFAULT 3,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 13. REVISIONS
CREATE TABLE public.revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deliverable_id UUID REFERENCES public.deliverables(id) ON DELETE CASCADE NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  file_url TEXT DEFAULT '',
  status revision_status NOT NULL DEFAULT 'pending-review',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 14. REVISION COMMENTS
CREATE TABLE public.revision_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  revision_id UUID REFERENCES public.revisions(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  text TEXT NOT NULL,
  timecode TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 15. INVOICES
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES public.studios(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  status invoice_status NOT NULL DEFAULT 'pending',
  due_date DATE,
  issued_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 16. RULE VIOLATIONS (runtime alerts)
CREATE TABLE public.rule_violations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  rule TEXT NOT NULL,
  severity rule_severity NOT NULL DEFAULT 'warning',
  message TEXT NOT NULL,
  blocks_progress BOOLEAN NOT NULL DEFAULT false,
  resolved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 17. NOTIFICATIONS
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID REFERENCES public.studios(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ========================================
-- ENABLE RLS ON ALL TABLES
-- ========================================
ALTER TABLE public.studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.studio_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revision_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rule_violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- ========================================
-- SECURITY DEFINER FUNCTIONS
-- ========================================

-- Check if user belongs to a studio
CREATE OR REPLACE FUNCTION public.user_studio_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT studio_id FROM public.profiles WHERE user_id = _user_id LIMIT 1
$$;

-- Check if user has a specific role in their studio
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _invitation RECORD;
  _studio_id UUID;
BEGIN
  -- Check for pending invitation
  SELECT * INTO _invitation FROM public.studio_invitations
  WHERE email = NEW.email AND accepted_at IS NULL
  LIMIT 1;

  IF _invitation IS NOT NULL THEN
    _studio_id := _invitation.studio_id;
    
    -- Create profile linked to studio
    INSERT INTO public.profiles (user_id, studio_id, full_name)
    VALUES (NEW.id, _studio_id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
    
    -- Assign role from invitation
    INSERT INTO public.user_roles (user_id, studio_id, role)
    VALUES (NEW.id, _studio_id, _invitation.role);
    
    -- Mark invitation as accepted
    UPDATE public.studio_invitations SET accepted_at = now() WHERE id = _invitation.id;
  ELSE
    -- No invitation: create profile without studio (they'll create one)
    INSERT INTO public.profiles (user_id, full_name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_studios_updated_at BEFORE UPDATE ON public.studios FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON public.deals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_deliverables_updated_at BEFORE UPDATE ON public.deliverables FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ========================================
-- RLS POLICIES (studio-scoped)
-- ========================================

-- STUDIOS: users can see their own studio
CREATE POLICY "Users can view their studio" ON public.studios
  FOR SELECT USING (id = public.user_studio_id(auth.uid()));

CREATE POLICY "Users can update their studio" ON public.studios
  FOR UPDATE USING (id = public.user_studio_id(auth.uid()) AND public.has_role(auth.uid(), 'owner'));

CREATE POLICY "Authenticated users can create studios" ON public.studios
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- PROFILES
CREATE POLICY "Users can view studio profiles" ON public.profiles
  FOR SELECT USING (studio_id = public.user_studio_id(auth.uid()) OR user_id = auth.uid());

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "System can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- USER ROLES
CREATE POLICY "Users can view studio roles" ON public.user_roles
  FOR SELECT USING (studio_id = public.user_studio_id(auth.uid()));

CREATE POLICY "Owners can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'owner') AND studio_id = public.user_studio_id(auth.uid()));

-- STUDIO INVITATIONS
CREATE POLICY "Owners can manage invitations" ON public.studio_invitations
  FOR ALL USING (public.has_role(auth.uid(), 'owner') AND studio_id = public.user_studio_id(auth.uid()));

CREATE POLICY "Users can view their invitations" ON public.studio_invitations
  FOR SELECT USING (studio_id = public.user_studio_id(auth.uid()));

-- CLIENTS (studio-scoped)
CREATE POLICY "Studio members can view clients" ON public.clients
  FOR SELECT USING (studio_id = public.user_studio_id(auth.uid()));

CREATE POLICY "Studio members can manage clients" ON public.clients
  FOR ALL USING (studio_id = public.user_studio_id(auth.uid()));

-- LEADS
CREATE POLICY "Studio members can view leads" ON public.leads
  FOR SELECT USING (studio_id = public.user_studio_id(auth.uid()));

CREATE POLICY "Studio members can manage leads" ON public.leads
  FOR ALL USING (studio_id = public.user_studio_id(auth.uid()));

-- DEALS
CREATE POLICY "Studio members can view deals" ON public.deals
  FOR SELECT USING (studio_id = public.user_studio_id(auth.uid()));

CREATE POLICY "Studio members can manage deals" ON public.deals
  FOR ALL USING (studio_id = public.user_studio_id(auth.uid()));

-- PROJECTS
CREATE POLICY "Studio members can view projects" ON public.projects
  FOR SELECT USING (studio_id = public.user_studio_id(auth.uid()));

CREATE POLICY "Studio members can manage projects" ON public.projects
  FOR ALL USING (studio_id = public.user_studio_id(auth.uid()));

-- PROJECT MEMBERS
CREATE POLICY "Studio members can view project members" ON public.project_members
  FOR SELECT USING (
    project_id IN (SELECT id FROM public.projects WHERE studio_id = public.user_studio_id(auth.uid()))
  );

CREATE POLICY "Studio members can manage project members" ON public.project_members
  FOR ALL USING (
    project_id IN (SELECT id FROM public.projects WHERE studio_id = public.user_studio_id(auth.uid()))
  );

-- PHASES
CREATE POLICY "Studio members can view phases" ON public.phases
  FOR SELECT USING (
    project_id IN (SELECT id FROM public.projects WHERE studio_id = public.user_studio_id(auth.uid()))
  );

CREATE POLICY "Studio members can manage phases" ON public.phases
  FOR ALL USING (
    project_id IN (SELECT id FROM public.projects WHERE studio_id = public.user_studio_id(auth.uid()))
  );

-- DELIVERABLES
CREATE POLICY "Studio members can view deliverables" ON public.deliverables
  FOR SELECT USING (
    project_id IN (SELECT id FROM public.projects WHERE studio_id = public.user_studio_id(auth.uid()))
  );

CREATE POLICY "Studio members can manage deliverables" ON public.deliverables
  FOR ALL USING (
    project_id IN (SELECT id FROM public.projects WHERE studio_id = public.user_studio_id(auth.uid()))
  );

-- REVISIONS
CREATE POLICY "Studio members can view revisions" ON public.revisions
  FOR SELECT USING (
    deliverable_id IN (
      SELECT d.id FROM public.deliverables d
      JOIN public.projects p ON d.project_id = p.id
      WHERE p.studio_id = public.user_studio_id(auth.uid())
    )
  );

CREATE POLICY "Studio members can manage revisions" ON public.revisions
  FOR ALL USING (
    deliverable_id IN (
      SELECT d.id FROM public.deliverables d
      JOIN public.projects p ON d.project_id = p.id
      WHERE p.studio_id = public.user_studio_id(auth.uid())
    )
  );

-- REVISION COMMENTS
CREATE POLICY "Studio members can view comments" ON public.revision_comments
  FOR SELECT USING (
    revision_id IN (
      SELECT r.id FROM public.revisions r
      JOIN public.deliverables d ON r.deliverable_id = d.id
      JOIN public.projects p ON d.project_id = p.id
      WHERE p.studio_id = public.user_studio_id(auth.uid())
    )
  );

CREATE POLICY "Studio members can manage comments" ON public.revision_comments
  FOR ALL USING (
    revision_id IN (
      SELECT r.id FROM public.revisions r
      JOIN public.deliverables d ON r.deliverable_id = d.id
      JOIN public.projects p ON d.project_id = p.id
      WHERE p.studio_id = public.user_studio_id(auth.uid())
    )
  );

-- INVOICES
CREATE POLICY "Studio members can view invoices" ON public.invoices
  FOR SELECT USING (studio_id = public.user_studio_id(auth.uid()));

CREATE POLICY "Finance/owners can manage invoices" ON public.invoices
  FOR ALL USING (
    studio_id = public.user_studio_id(auth.uid())
    AND (public.has_role(auth.uid(), 'owner') OR public.has_role(auth.uid(), 'finance'))
  );

-- RULE VIOLATIONS
CREATE POLICY "Studio members can view violations" ON public.rule_violations
  FOR SELECT USING (
    project_id IN (SELECT id FROM public.projects WHERE studio_id = public.user_studio_id(auth.uid()))
  );

CREATE POLICY "System can manage violations" ON public.rule_violations
  FOR ALL USING (
    project_id IN (SELECT id FROM public.projects WHERE studio_id = public.user_studio_id(auth.uid()))
  );

-- NOTIFICATIONS
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "System can insert notifications" ON public.notifications
  FOR INSERT WITH CHECK (studio_id = public.user_studio_id(auth.uid()));

-- ========================================
-- INDEXES
-- ========================================
CREATE INDEX idx_profiles_studio ON public.profiles(studio_id);
CREATE INDEX idx_profiles_user ON public.profiles(user_id);
CREATE INDEX idx_user_roles_user ON public.user_roles(user_id);
CREATE INDEX idx_leads_studio ON public.leads(studio_id);
CREATE INDEX idx_deals_studio ON public.deals(studio_id);
CREATE INDEX idx_projects_studio ON public.projects(studio_id);
CREATE INDEX idx_phases_project ON public.phases(project_id);
CREATE INDEX idx_deliverables_phase ON public.deliverables(phase_id);
CREATE INDEX idx_deliverables_project ON public.deliverables(project_id);
CREATE INDEX idx_revisions_deliverable ON public.revisions(deliverable_id);
CREATE INDEX idx_invoices_studio ON public.invoices(studio_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
