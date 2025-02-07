import { Lead, LeadStatus } from "@/data/leads";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadList from "./LeadList";

interface LeadsByStageProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

const LeadsByStage = ({ leads, onLeadClick }: LeadsByStageProps) => {
  const leadsByStatus = leads.reduce((acc, lead) => {
    if (!acc[lead.status]) {
      acc[lead.status] = [];
    }
    acc[lead.status].push(lead);
    return acc;
  }, {} as Record<LeadStatus, Lead[]>);

  return (
    <Tabs defaultValue="new" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="new">New</TabsTrigger>
        <TabsTrigger value="contacted">Contacted</TabsTrigger>
        <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
        <TabsTrigger value="closed">Closed</TabsTrigger>
        <TabsTrigger value="lost">Lost</TabsTrigger>
      </TabsList>

      {Object.entries(leadsByStatus).map(([status, statusLeads]) => (
        <TabsContent key={status} value={status}>
          <div className="rounded-lg border bg-white p-6">
            <LeadList leads={statusLeads} onLeadClick={onLeadClick} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default LeadsByStage;