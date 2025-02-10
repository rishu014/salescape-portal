
export type LeadStatus = 'new' | 'contacted' | 'negotiation' | 'closed' | 'lost';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  status: LeadStatus;
  assignedTo: string;
  createdAt: string;
  lastContact: string;
  value: number;
  notes?: string;
  nextCallback?: string;
  callbackNotes?: string;
  product: string; // Added product field
}

export const leads: Lead[] = [];

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

export const products = [
  "Product A",
  "Product B",
  "Product C",
  "Product D"
];
