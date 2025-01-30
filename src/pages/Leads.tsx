import { useState } from "react";
import { leads, Lead } from "@/data/leads";
import LeadList from "@/components/leads/LeadList";
import LeadForm from "@/components/leads/LeadForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Leads = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [localLeads, setLocalLeads] = useState<Lead[]>(leads);

  const handleAddLead = (newLead: Partial<Lead>) => {
    const lead: Lead = {
      ...newLead,
      id: (localLeads.length + 1).toString(),
      createdAt: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
    } as Lead;
    
    setLocalLeads([lead, ...localLeads]);
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
          <Button onClick={() => setShowLeadForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Lead
          </Button>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <LeadList leads={localLeads} />
        </div>

        <LeadForm
          open={showLeadForm}
          onOpenChange={setShowLeadForm}
          onSubmit={handleAddLead}
        />
      </div>
    </div>
  );
};

export default Leads;