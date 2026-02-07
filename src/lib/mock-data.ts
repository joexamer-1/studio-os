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

export interface Deliverable {
  id: string;
  name: string;
  phase: Phase;
  status: 'pending' | 'in-progress' | 'review' | 'approved' | 'locked';
  assignee: string;
  revisions: Revision[];
  maxRevisions: number;
}

export interface Revision {
  id: string;
  version: number;
  uploadedBy: string;
  uploadedAt: string;
  fileUrl: string;
  comments: RevisionComment[];
  status: 'pending-review' | 'approved' | 'changes-requested';
}

export interface RevisionComment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  timecode?: string;
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

export interface PhaseDetail {
  phase: Phase;
  status: 'locked' | 'active' | 'completed';
  startDate?: string;
  endDate?: string;
  completedDate?: string;
  deliverables: Deliverable[];
}

export interface ProjectDetail extends Project {
  description: string;
  phases: PhaseDetail[];
  totalInvoiced: number;
  totalPaid: number;
  notes: string[];
  ruleViolations: RuleViolation[];
}

export interface RuleViolation {
  id: string;
  rule: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  blocksProgress: boolean;
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

// Detailed project data for the detail page
export const mockProjectDetails: Record<string, ProjectDetail> = {
  'P001': {
    id: 'P001', name: 'Momentum Q1 Campaign', clientName: 'Momentum Agency', type: 'commercial', phase: 'post-production', budget: 28000, spent: 19500, progress: 72, deadline: '2026-02-20', status: 'on-track', teamMembers: ['Jordan', 'Maya', 'Chris'],
    description: 'A multi-platform commercial campaign for Momentum Agency targeting Q1 product launches.',
    totalInvoiced: 28000, totalPaid: 14000,
    notes: ['Client prefers warm color grading', 'Talent confirmed for reshoot if needed'],
    ruleViolations: [],
    phases: [
      { phase: 'pre-production', status: 'completed', startDate: '2026-01-05', endDate: '2026-01-15', completedDate: '2026-01-14', deliverables: [
        { id: 'D001', name: 'Creative Brief', phase: 'pre-production', status: 'approved', assignee: 'Maya', maxRevisions: 2, revisions: [
          { id: 'R001', version: 1, uploadedBy: 'Maya', uploadedAt: '2026-01-10', fileUrl: '#', status: 'approved', comments: [{ id: 'RC1', author: 'Alex Rivera', text: 'Looks great, approved!', timestamp: '2026-01-11T10:00:00Z' }] }
        ]},
        { id: 'D002', name: 'Shot List & Storyboard', phase: 'pre-production', status: 'approved', assignee: 'Jordan', maxRevisions: 3, revisions: [
          { id: 'R002', version: 1, uploadedBy: 'Jordan', uploadedAt: '2026-01-12', fileUrl: '#', status: 'changes-requested', comments: [{ id: 'RC2', author: 'Alex Rivera', text: 'Need more close-up shots in scene 3', timestamp: '2026-01-12T14:00:00Z' }] },
          { id: 'R003', version: 2, uploadedBy: 'Jordan', uploadedAt: '2026-01-14', fileUrl: '#', status: 'approved', comments: [{ id: 'RC3', author: 'Alex Rivera', text: 'Perfect, approved', timestamp: '2026-01-14T09:00:00Z' }] }
        ]}
      ]},
      { phase: 'production', status: 'completed', startDate: '2026-01-16', endDate: '2026-01-28', completedDate: '2026-01-27', deliverables: [
        { id: 'D003', name: 'Raw Footage', phase: 'production', status: 'approved', assignee: 'Sam', maxRevisions: 1, revisions: [
          { id: 'R004', version: 1, uploadedBy: 'Sam', uploadedAt: '2026-01-27', fileUrl: '#', status: 'approved', comments: [] }
        ]}
      ]},
      { phase: 'post-production', status: 'active', startDate: '2026-01-29', endDate: '2026-02-14', deliverables: [
        { id: 'D004', name: 'Rough Cut', phase: 'post-production', status: 'review', assignee: 'Chris', maxRevisions: 3, revisions: [
          { id: 'R005', version: 1, uploadedBy: 'Chris', uploadedAt: '2026-02-03', fileUrl: '#', status: 'changes-requested', comments: [{ id: 'RC4', author: 'Alex Rivera', text: 'Pacing in the intro is too slow, tighten the first 10 seconds', timestamp: '2026-02-04T11:30:00Z', timecode: '00:00:05' }] },
          { id: 'R006', version: 2, uploadedBy: 'Chris', uploadedAt: '2026-02-06', fileUrl: '#', status: 'pending-review', comments: [] }
        ]},
        { id: 'D005', name: 'Color Graded Final', phase: 'post-production', status: 'pending', assignee: 'Chris', maxRevisions: 2, revisions: [] },
        { id: 'D006', name: 'Sound Mix', phase: 'post-production', status: 'pending', assignee: 'Alex', maxRevisions: 2, revisions: [] }
      ]},
      { phase: 'review', status: 'locked', deliverables: [
        { id: 'D007', name: 'Final Review Package', phase: 'review', status: 'pending', assignee: 'Maya', maxRevisions: 2, revisions: [] }
      ]},
      { phase: 'delivery', status: 'locked', deliverables: [
        { id: 'D008', name: 'Final Deliverables Package', phase: 'delivery', status: 'pending', assignee: 'Maya', maxRevisions: 1, revisions: [] }
      ]}
    ]
  },
  'P002': {
    id: 'P002', name: 'Craft Studios Brand Film', clientName: 'Craft Studios', type: 'brand-film', phase: 'production', budget: 42000, spent: 25000, progress: 55, deadline: '2026-03-01', status: 'at-risk', teamMembers: ['Jordan', 'Sam', 'Alex'],
    description: 'A cinematic brand film showcasing Craft Studios\' creative process and team culture.',
    totalInvoiced: 42000, totalPaid: 21000,
    notes: ['Director wants handheld feel', 'B-roll needed for office scenes'],
    ruleViolations: [
      { id: 'RV1', rule: 'Warn for unprofitable projects', severity: 'warning', message: 'Project costs at 60% of budget with only 55% progress — risk of exceeding budget.', blocksProgress: false },
      { id: 'RV2', rule: 'Overdue invoice', severity: 'critical', message: 'Invoice INV-004 ($21,000) is overdue by 2 days. Delivery will be blocked until payment.', blocksProgress: true }
    ],
    phases: [
      { phase: 'pre-production', status: 'completed', startDate: '2026-01-10', endDate: '2026-01-25', completedDate: '2026-01-24', deliverables: [
        { id: 'D010', name: 'Creative Brief', phase: 'pre-production', status: 'approved', assignee: 'Jordan', maxRevisions: 2, revisions: [
          { id: 'R010', version: 1, uploadedBy: 'Jordan', uploadedAt: '2026-01-15', fileUrl: '#', status: 'approved', comments: [] }
        ]},
        { id: 'D011', name: 'Treatment & Mood Board', phase: 'pre-production', status: 'approved', assignee: 'Jordan', maxRevisions: 3, revisions: [
          { id: 'R011', version: 1, uploadedBy: 'Jordan', uploadedAt: '2026-01-20', fileUrl: '#', status: 'approved', comments: [] }
        ]}
      ]},
      { phase: 'production', status: 'active', startDate: '2026-01-26', endDate: '2026-02-10', deliverables: [
        { id: 'D012', name: 'Interview Footage', phase: 'production', status: 'in-progress', assignee: 'Sam', maxRevisions: 1, revisions: [] },
        { id: 'D013', name: 'B-Roll Footage', phase: 'production', status: 'pending', assignee: 'Sam', maxRevisions: 1, revisions: [] }
      ]},
      { phase: 'post-production', status: 'locked', deliverables: [
        { id: 'D014', name: 'Assembly Edit', phase: 'post-production', status: 'pending', assignee: 'Alex', maxRevisions: 3, revisions: [] },
        { id: 'D015', name: 'Final Cut', phase: 'post-production', status: 'pending', assignee: 'Alex', maxRevisions: 2, revisions: [] }
      ]},
      { phase: 'review', status: 'locked', deliverables: [
        { id: 'D016', name: 'Client Review Package', phase: 'review', status: 'pending', assignee: 'Jordan', maxRevisions: 2, revisions: [] }
      ]},
      { phase: 'delivery', status: 'locked', deliverables: [
        { id: 'D017', name: 'Final Deliverables', phase: 'delivery', status: 'pending', assignee: 'Jordan', maxRevisions: 1, revisions: [] }
      ]}
    ]
  }
};

export function getProjectDetail(id: string): ProjectDetail | undefined {
  if (mockProjectDetails[id]) return mockProjectDetails[id];
  // Fallback: generate a basic detail from the project list
  const project = mockProjects.find(p => p.id === id);
  if (!project) return undefined;
  const typeConf = projectTypeConfig[project.type];
  const currentPhaseIdx = typeConf.defaultPhases.indexOf(project.phase);
  return {
    ...project,
    description: `${typeConf.label} project for ${project.clientName}.`,
    totalInvoiced: project.budget,
    totalPaid: project.spent,
    notes: [],
    ruleViolations: [],
    phases: typeConf.defaultPhases.map((p, i) => ({
      phase: p,
      status: i < currentPhaseIdx ? 'completed' as const : i === currentPhaseIdx ? 'active' as const : 'locked' as const,
      deliverables: []
    }))
  };
}
