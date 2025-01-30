import { Users, Clock, TrendingUp, DollarSign } from "lucide-react";
import StatsCard from "@/components/common/StatsCard";
import { performanceData } from "@/data/performance";
import { formatCurrency } from "@/data/leads";

export const EmployeeStats = () => {
  const totalLeads = performanceData.reduce((sum, emp) => sum + emp.leadsAssigned, 0);
  const avgFollowUp = performanceData.reduce((sum, emp) => sum + emp.avgFollowUpTime, 0) / performanceData.length;
  const avgConversion = performanceData.reduce((sum, emp) => sum + emp.conversionRate, 0) / performanceData.length;
  const totalRevenue = performanceData.reduce((sum, emp) => sum + emp.revenue, 0);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Leads"
        value={totalLeads}
        icon={Users}
        trend={{ value: 12, isPositive: true }}
      />
      <StatsCard
        title="Avg. Follow-up Time"
        value={`${Math.round(avgFollowUp)}h`}
        icon={Clock}
        trend={{ value: 8, isPositive: false }}
      />
      <StatsCard
        title="Avg. Conversion Rate"
        value={`${Math.round(avgConversion)}%`}
        icon={TrendingUp}
        trend={{ value: 5, isPositive: true }}
      />
      <StatsCard
        title="Total Revenue"
        value={formatCurrency(totalRevenue)}
        icon={DollarSign}
        trend={{ value: 15, isPositive: true }}
      />
    </div>
  );
};