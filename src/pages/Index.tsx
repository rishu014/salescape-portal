import { useState } from "react";
import { leads, getLeadsByStage, LeadStage } from "@/data/leads";
import LeadList from "@/components/leads/LeadList";
import LeadStageProgress from "@/components/dashboard/LeadStageProgress";
import StatsCard from "@/components/common/StatsCard";
import { Users, DollarSign, TrendingUp, Target } from "lucide-react";

const Index = () => {
  const [selectedStage, setSelectedStage] = useState<LeadStage | null>(null);

  const stages: LeadStage[] = ["new", "contacted", "negotiation", "closed", "lost"];
  const stageData = stages.map((stage) => ({
    stage,
    count: getLeadsByStage(stage).length,
  }));

  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const avgValue = totalValue / leads.length;
  const conversionRate = (getLeadsByStage("closed").length / leads.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lead Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Track and manage your sales pipeline effectively
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Leads"
            value={leads.length}
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
                  leads={selectedStage ? getLeadsByStage(selectedStage) : leads}
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-xl font-semibold text-gray-900">Pipeline Stages</h2>
            <div className="mt-6">
              <LeadStageProgress stages={stageData} total={leads.length} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;