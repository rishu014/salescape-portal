import { useState } from "react";
import { leads, Lead } from "@/data/leads";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import LeadForm from "@/components/leads/LeadForm";
import TodayCallbacks from "@/components/leads/TodayCallbacks";
import LeadsByStage from "@/components/leads/LeadsByStage";
import { useToast } from "@/components/ui/use-toast";

const Leads = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [localLeads, setLocalLeads] = useState<Lead[]>(leads);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();
  const { toast } = useToast();

  const handleAddLead = (newLead: Partial<Lead>) => {
    if (selectedLead) {
      const updatedLeads = localLeads.map((lead) =>
        lead.id === selectedLead.id ? { ...lead, ...newLead } : lead
      );
      setLocalLeads(updatedLeads);
    } else {
      const lead: Lead = {
        ...newLead,
        id: (localLeads.length + 1).toString(),
        createdAt: new Date().toISOString().split('T')[0],
        lastContact: new Date().toISOString().split('T')[0],
      } as Lead;
      setLocalLeads([lead, ...localLeads]);
    }
    setSelectedLead(undefined);
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setShowLeadForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
            <p className="mt-2 text-gray-600">
              View and manage all your leads in one place
            </p>
          </div>
          <Button onClick={() => {
            setSelectedLead(undefined);
            setShowLeadForm(true);
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Lead
          </Button>
        </div>

        <TodayCallbacks leads={localLeads} onLeadClick={handleLeadClick} />
        <LeadsByStage leads={localLeads} onLeadClick={handleLeadClick} />

        <LeadForm
          open={showLeadForm}
          onOpenChange={(open) => {
            setShowLeadForm(open);
            if (!open) setSelectedLead(undefined);
          }}
          onSubmit={handleAddLead}
          initialData={selectedLead}
        />
      </div>
    </div>
  );
};

export default Leads;