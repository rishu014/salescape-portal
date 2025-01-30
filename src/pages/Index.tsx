import { useState } from "react";
import { leads, getLeadsByStage, LeadStage, Lead } from "@/data/leads";
import LeadList from "@/components/leads/LeadList";
import LeadStageProgress from "@/components/dashboard/LeadStageProgress";
import PerformanceOverview from "@/components/dashboard/PerformanceOverview";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Index = () => {
  const [selectedStage, setSelectedStage] = useState<LeadStage | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [localLeads, setLocalLeads] = useState<Lead[]>(leads);

  const stages: LeadStage[] = ["new", "contacted", "negotiation", "closed", "lost"];
  const stageData = stages.map((stage) => ({
    stage,
    count: localLeads.filter(lead => lead.stage === stage).length,
  }));

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

        <PerformanceOverview />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-white p-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedStage
                  ? `${selectedStage.charAt(0).toUpperCase() + selectedStage.slice(1)} Leads`
                  : "All Leads"}
              </h2>
              <div className="mt-6">
                <LeadList
                  leads={selectedStage ? localLeads.filter(lead => lead.stage === selectedStage) : localLeads}
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-xl font-semibold text-gray-900">Pipeline Stages</h2>
            <div className="mt-6">
              <LeadStageProgress stages={stageData} total={localLeads.length} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;