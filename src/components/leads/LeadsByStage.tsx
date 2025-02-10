
import { Lead, LeadStatus, products } from "@/data/leads";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadList from "./LeadList";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface LeadsByStageProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

const LeadsByStage = ({ leads, onLeadClick }: LeadsByStageProps) => {
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | 'all'>('all');
  
  const leadsByProduct = products.reduce((acc, product) => {
    acc[product] = leads.filter(lead => lead.product === product);
    return acc;
  }, {} as Record<string, Lead[]>);

  const getLeadsByStatus = (productLeads: Lead[]) => {
    const statuses: LeadStatus[] = ['new', 'contacted', 'negotiation', 'closed', 'lost'];
    return statuses.reduce((acc, status) => {
      acc[status] = productLeads.filter(lead => lead.status === status);
      return acc;
    }, {} as Record<LeadStatus, Lead[]>);
  };

  const filterLeadsByStatus = (productLeads: Lead[]) => {
    if (selectedStatus === 'all') return productLeads;
    return productLeads.filter(lead => lead.status === selectedStatus);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg border">
        <Select value={selectedStatus} onValueChange={(value: LeadStatus | 'all') => setSelectedStatus(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="negotiation">Negotiation</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue={products[0]} className="w-full">
        <TabsList className="w-full justify-start">
          {products.map((product) => (
            <TabsTrigger key={product} value={product} className="capitalize">
              {product} ({leadsByProduct[product]?.length || 0})
            </TabsTrigger>
          ))}
        </TabsList>

        {products.map((product) => (
          <TabsContent key={product} value={product}>
            <div className="rounded-lg border bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold capitalize">{product} Leads</h3>
              </div>
              <div className="space-y-6">
                {Object.entries(getLeadsByStatus(filterLeadsByStatus(leadsByProduct[product] || []))).map(([status, statusLeads]) => (
                  <div key={status} className="space-y-4">
                    <h4 className="text-md font-medium capitalize">{status} ({statusLeads.length})</h4>
                    <LeadList 
                      leads={statusLeads} 
                      onLeadClick={onLeadClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default LeadsByStage;
