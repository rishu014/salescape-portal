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

  const statuses: LeadStatus[] = ["new", "contacted", "negotiation", "closed", "lost"];

  return (
    <Tabs defaultValue="new" className="w-full">
      <TabsList className="w-full justify-start">
        {statuses.map((status) => (
          <TabsTrigger key={status} value={status} className="capitalize">
            {status} ({leadsByStatus[status]?.length || 0})
          </TabsTrigger>
        ))}
      </TabsList>

      {statuses.map((status) => (
        <TabsContent key={status} value={status}>
          <div className="rounded-lg border bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold capitalize">{status} Leads</h3>
            </div>
            <LeadList leads={leadsByStatus[status] || []} onLeadClick={onLeadClick} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default LeadsByStage;