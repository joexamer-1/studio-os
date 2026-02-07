// Mock data for the Studio OS
export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'lost';
  value: number;
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  totalRevenue: number;
  projectCount: number;
  status: 'active' | 'inactive';
}

export interface Project {
  id: string;
  name: string;
  clientName: string;
  type: ProjectType;
  phase: Phase;
  budget: number;
  spent: number;
  progress: number;
  deadline: string;
  status: 'on-track' | 'at-risk' | 'delayed' | 'completed';
  teamMembers: string[];
}

export type ProjectType = 'social-media' | 'commercial' | 'event' | 'brand-film' | 'youtube';
export type Phase = 'pre-production' | 'production' | 'post-production' | 'review' | 'delivery';

export interface TeamMember {
  id: string;
  name: string;
  role: 'owner' | 'producer' | 'editor' | 'shooter' | 'finance';
  avatar: string;
  activeProjects: number;
  completedTasks: number;
  totalTasks: number;
  utilization: number;
}

export interface Invoice {
  id: string;
  projectName: string;
  clientName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  issuedDate: string;
}

export const mockLeads: Lead[] = [
  { id: 'L001', name: 'Sarah Chen', company: 'TechVibe Inc', email: 'sarah@techvibe.com', source: 'Referral', status: 'qualified', value: 25000, createdAt: '2026-01-28' },
  { id: 'L002', name: 'Marcus Webb', company: 'FreshBrew Co', email: 'marcus@freshbrew.com', source: 'Website', status: 'proposal', value: 18000, createdAt: '2026-01-30' },
  { id: 'L003', name: 'Diana Russo', company: 'Elevate Fitness', email: 'diana@elevate.com', source: 'Instagram', status: 'new', value: 12000, createdAt: '2026-02-01' },
  { id: 'L004', name: 'James Okonkwo', company: 'NovaTech Solutions', email: 'james@novatech.com', source: 'LinkedIn', status: 'contacted', value: 45000, createdAt: '2026-02-03' },
  { id: 'L005', name: 'Priya Sharma', company: 'GreenLeaf Organics', email: 'priya@greenleaf.com', source: 'Referral', status: 'qualified', value: 30000, createdAt: '2026-02-05' },
];

export const mockClients: Client[] = [
  { id: 'C001', name: 'Alex Rivera', company: 'Momentum Agency', email: 'alex@momentum.co', phone: '+1 555-0101', totalRevenue: 85000, projectCount: 4, status: 'active' },
  { id: 'C002', name: 'Nina Patel', company: 'Craft Studios', email: 'nina@craft.io', phone: '+1 555-0102', totalRevenue: 42000, projectCount: 2, status: 'active' },
  { id: 'C003', name: 'Tom Bradley', company: 'Skyline Media', email: 'tom@skyline.com', phone: '+1 555-0103', totalRevenue: 120000, projectCount: 6, status: 'active' },
  { id: 'C004', name: 'Lena Fischer', company: 'Bloom Beauty', email: 'lena@bloom.co', phone: '+1 555-0104', totalRevenue: 35000, projectCount: 1, status: 'inactive' },
];

export const mockProjects: Project[] = [
  { id: 'P001', name: 'Momentum Q1 Campaign', clientName: 'Momentum Agency', type: 'commercial', phase: 'post-production', budget: 28000, spent: 19500, progress: 72, deadline: '2026-02-20', status: 'on-track', teamMembers: ['Jordan', 'Maya', 'Chris'] },
  { id: 'P002', name: 'Craft Studios Brand Film', clientName: 'Craft Studios', type: 'brand-film', phase: 'production', budget: 42000, spent: 25000, progress: 55, deadline: '2026-03-01', status: 'at-risk', teamMembers: ['Jordan', 'Sam', 'Alex'] },
  { id: 'P003', name: 'Skyline Social Series', clientName: 'Skyline Media', type: 'social-media', phase: 'review', budget: 15000, spent: 13200, progress: 90, deadline: '2026-02-12', status: 'on-track', teamMembers: ['Maya', 'Chris'] },
  { id: 'P004', name: 'Bloom Product Launch', clientName: 'Bloom Beauty', type: 'commercial', phase: 'pre-production', budget: 35000, spent: 4200, progress: 15, deadline: '2026-03-15', status: 'on-track', teamMembers: ['Jordan', 'Maya', 'Sam', 'Alex'] },
  { id: 'P005', name: 'Skyline Event Reel', clientName: 'Skyline Media', type: 'event', phase: 'delivery', budget: 8000, spent: 7800, progress: 98, deadline: '2026-02-08', status: 'on-track', teamMembers: ['Chris'] },
  { id: 'P006', name: 'Momentum YouTube Series', clientName: 'Momentum Agency', type: 'youtube', phase: 'post-production', budget: 22000, spent: 20100, progress: 80, deadline: '2026-02-18', status: 'delayed', teamMembers: ['Sam', 'Alex'] },
];

export const mockTeam: TeamMember[] = [
  { id: 'T001', name: 'Jordan Blake', role: 'owner', avatar: 'JB', activeProjects: 4, completedTasks: 48, totalTasks: 52, utilization: 92 },
  { id: 'T002', name: 'Maya Torres', role: 'producer', avatar: 'MT', activeProjects: 3, completedTasks: 35, totalTasks: 40, utilization: 85 },
  { id: 'T003', name: 'Chris Nakamura', role: 'editor', avatar: 'CN', activeProjects: 3, completedTasks: 62, totalTasks: 70, utilization: 95 },
  { id: 'T004', name: 'Sam Osei', role: 'shooter', avatar: 'SO', activeProjects: 2, completedTasks: 28, totalTasks: 32, utilization: 78 },
  { id: 'T005', name: 'Alex Kim', role: 'editor', avatar: 'AK', activeProjects: 3, completedTasks: 41, totalTasks: 48, utilization: 88 },
];

export const mockInvoices: Invoice[] = [
  { id: 'INV-001', projectName: 'Momentum Q1 Campaign', clientName: 'Momentum Agency', amount: 14000, status: 'paid', dueDate: '2026-02-01', issuedDate: '2026-01-15' },
  { id: 'INV-002', projectName: 'Momentum Q1 Campaign', clientName: 'Momentum Agency', amount: 14000, status: 'pending', dueDate: '2026-02-20', issuedDate: '2026-02-01' },
  { id: 'INV-003', projectName: 'Craft Studios Brand Film', clientName: 'Craft Studios', amount: 21000, status: 'paid', dueDate: '2026-01-20', issuedDate: '2026-01-05' },
  { id: 'INV-004', projectName: 'Craft Studios Brand Film', clientName: 'Craft Studios', amount: 21000, status: 'overdue', dueDate: '2026-02-05', issuedDate: '2026-01-20' },
  { id: 'INV-005', projectName: 'Skyline Social Series', clientName: 'Skyline Media', amount: 15000, status: 'pending', dueDate: '2026-02-15', issuedDate: '2026-02-01' },
  { id: 'INV-006', projectName: 'Skyline Event Reel', clientName: 'Skyline Media', amount: 8000, status: 'overdue', dueDate: '2026-02-03', issuedDate: '2026-01-18' },
];

export const pipelineStages = [
  { id: 'lead', label: 'Lead', count: 5, value: 130000 },
  { id: 'deal', label: 'Deal', count: 3, value: 73000 },
  { id: 'project', label: 'Project', count: 6, value: 150000 },
  { id: 'delivery', label: 'Delivery', count: 1, value: 8000 },
  { id: 'payment', label: 'Payment', count: 2, value: 29000 },
];

export const projectTypeConfig: Record<ProjectType, { label: string; color: string; defaultPhases: Phase[] }> = {
  'social-media': { label: 'Social Media', color: 'hsl(200, 80%, 55%)', defaultPhases: ['pre-production', 'production', 'post-production', 'review', 'delivery'] },
  'commercial': { label: 'Commercial Ad', color: 'hsl(40, 90%, 55%)', defaultPhases: ['pre-production', 'production', 'post-production', 'review', 'delivery'] },
  'event': { label: 'Event Coverage', color: 'hsl(142, 71%, 45%)', defaultPhases: ['pre-production', 'production', 'post-production', 'delivery'] },
  'brand-film': { label: 'Brand Film', color: 'hsl(280, 65%, 60%)', defaultPhases: ['pre-production', 'production', 'post-production', 'review', 'delivery'] },
  'youtube': { label: 'YouTube Content', color: 'hsl(0, 72%, 51%)', defaultPhases: ['pre-production', 'production', 'post-production', 'review', 'delivery'] },
};

export const phaseLabels: Record<Phase, string> = {
  'pre-production': 'Pre-Production',
  'production': 'Production',
  'post-production': 'Post-Production',
  'review': 'Review',
  'delivery': 'Delivery',
};
