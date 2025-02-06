import { Lead, LeadStage } from "@/data/leads";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadList from "./LeadList";

interface LeadsByStageProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

const LeadsByStage = ({ leads, onLeadClick }: LeadsByStageProps) => {
  const leadsByStage = leads.reduce((acc, lead) => {
    if (!acc[lead.stage]) {
      acc[lead.stage] = [];
    }
    acc[lead.stage].push(lead);
    return acc;
  }, {} as Record<LeadStage, Lead[]>);

  return (
    <Tabs defaultValue="new" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="new">New</TabsTrigger>
        <TabsTrigger value="contacted">Contacted</TabsTrigger>
        <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
        <TabsTrigger value="closed">Closed</TabsTrigger>
        <TabsTrigger value="lost">Lost</TabsTrigger>
      </TabsList>

      {Object.entries(leadsByStage).map(([stage, stageLeads]) => (
        <TabsContent key={stage} value={stage}>
          <div className="rounded-lg border bg-white p-6">
            <LeadList leads={stageLeads} onLeadClick={onLeadClick} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default LeadsByStage;