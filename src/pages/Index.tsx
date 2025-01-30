import { useState } from "react";
import { leads, Lead } from "@/data/leads";
import LeadList from "@/components/leads/LeadList";
import LeadForm from "@/components/leads/LeadForm";
import { EmployeeStats } from "@/components/dashboard/EmployeeStats";
import PerformanceOverview from "@/components/dashboard/PerformanceOverview";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Index = () => {
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
            <h1 className="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Track performance and manage your sales pipeline effectively
            </p>
          </div>
          <Button onClick={() => setShowLeadForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Lead
          </Button>
        </div>

        <EmployeeStats />
        <PerformanceOverview />

        <div className="rounded-lg border bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Leads</h2>
          <div className="mt-6">
            <LeadList leads={localLeads.slice(0, 5)} />
          </div>
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

export default Index;