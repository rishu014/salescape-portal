import { useState } from "react";
import { leads, getLeadsByStage, LeadStage, Lead } from "@/data/leads";
import LeadList from "@/components/leads/LeadList";
import LeadStageProgress from "@/components/dashboard/LeadStageProgress";
import StatsCard from "@/components/common/StatsCard";
import LeadForm from "@/components/leads/LeadForm";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, TrendingUp, Target, Plus } from "lucide-react";

const Index = () => {
  const [selectedStage, setSelectedStage] = useState<LeadStage | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [localLeads, setLocalLeads] = useState<Lead[]>(leads);

  const stages: LeadStage[] = ["new", "contacted", "negotiation", "closed", "lost"];
  const stageData = stages.map((stage) => ({
    stage,
    count: localLeads.filter(lead => lead.stage === stage).length,
  }));

  const totalValue = localLeads.reduce((sum, lead) => sum + lead.value, 0);
  const avgValue = totalValue / localLeads.length;
  const conversionRate = (localLeads.filter(lead => lead.stage === "closed").length / localLeads.length) * 100;

  const handleCreateLead = (newLead: Partial<Lead>) => {
    const lead: Lead = {
      id: (localLeads.length + 1).toString(),
      createdAt: new Date().toISOString().split('T')[0],
      lastContact: new Date().toISOString().split('T')[0],
      ...newLead,
    } as Lead;
    
    setLocalLeads([lead, ...localLeads]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lead Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Track and manage your sales pipeline effectively
            </p>
          </div>
          <Button onClick={() => setShowLeadForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Lead
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Leads"
            value={localLeads.length}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Pipeline Value"
            value={new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalValue)}
            icon={DollarSign}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Average Deal Size"
            value={new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(avgValue)}
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Conversion Rate"
            value={`${Math.round(conversionRate)}%`}
            icon={Target}
            trend={{ value: 2, isPositive: false }}
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border bg-white p-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedStage
                  ? `${
                      selectedStage.charAt(0).toUpperCase() + selectedStage.slice(1)
                    } Leads`
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

      <LeadForm
        open={showLeadForm}
        onOpenChange={setShowLeadForm}
        onSubmit={handleCreateLead}
      />
    </div>
  );
};

export default Index;