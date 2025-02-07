export type LeadStatus = 'new' | 'contacted' | 'negotiation' | 'closed' | 'lost';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  status: LeadStatus;  // Changed from stage
  assignedTo: string;
  createdAt: string;
  lastContact: string;
  value: number;
  notes?: string;
  nextCallback?: string;
  callbackNotes?: string;
}

export const leads: Lead[] = [
  {
    id: "1",
    name: "John Smith",
    company: "Tech Solutions Inc",
    email: "john@techsolutions.com",
    phone: "+1 (555) 123-4567",
    industry: "Technology",
    status: "new",  // Changed from stage
    assignedTo: "Sarah Wilson",
    createdAt: "2024-01-15",
    lastContact: "2024-01-15",
    value: 25000,
    nextCallback: "2024-04-20",
    callbackNotes: "Follow up about the proposal"
  },
  {
    id: "2",
    name: "Emma Johnson",
    company: "Marketing Pro",
    email: "emma@marketingpro.com",
    phone: "+1 (555) 234-5678",
    industry: "Marketing",
    status: "contacted",  // Changed from stage
    assignedTo: "Mike Brown",
    createdAt: "2024-01-14",
    lastContact: "2024-01-16",
    value: 15000,
  },
  {
    id: "3",
    name: "David Lee",
    company: "Retail Giants",
    email: "david@retailgiants.com",
    phone: "+1 (555) 345-6789",
    industry: "Retail",
    status: "negotiation",  // Changed from stage
    assignedTo: "Sarah Wilson",
    createdAt: "2024-01-10",
    lastContact: "2024-01-15",
    value: 50000,
  },
  {
    id: "4",
    name: "Lisa Chen",
    company: "Healthcare Plus",
    email: "lisa@healthcareplus.com",
    phone: "+1 (555) 456-7890",
    industry: "Healthcare",
    status: "closed",  // Changed from stage
    assignedTo: "Mike Brown",
    createdAt: "2024-01-05",
    lastContact: "2024-01-14",
    value: 75000,
  },
  {
    id: "5",
    name: "Michael Wilson",
    company: "Education First",
    email: "michael@educationfirst.com",
    phone: "+1 (555) 567-8901",
    industry: "Education",
    status: "lost",  // Changed from stage
    assignedTo: "Sarah Wilson",
    createdAt: "2024-01-01",
    lastContact: "2024-01-10",
    value: 30000,
  },
];

export const getStatusColor = (status: LeadStatus) => {
  const colors = {
    new: "primary",
    contacted: "warning",
    negotiation: "secondary",
    closed: "success",
    lost: "danger",
  };
  return colors[status];
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};
