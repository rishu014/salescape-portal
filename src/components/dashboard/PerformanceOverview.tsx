import { performanceData } from "@/data/performance";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { formatCurrency } from "@/data/leads";
import StatsCard from "@/components/common/StatsCard";
import { Users, Clock, TrendingUp, DollarSign } from "lucide-react";

const COLORS = ["#8B5CF6", "#F97316", "#22C55E", "#EF4444"];

const chartConfig = {
  assigned: { color: "#8B5CF6" },
  closed: { color: "#22C55E" },
};

const PerformanceOverview = () => {
  const totalLeads = performanceData.reduce((sum, emp) => sum + emp.leadsAssigned, 0);
  const avgFollowUp = performanceData.reduce((sum, emp) => sum + emp.avgFollowUpTime, 0) / performanceData.length;
  const avgConversion = performanceData.reduce((sum, emp) => sum + emp.conversionRate, 0) / performanceData.length;
  const totalRevenue = performanceData.reduce((sum, emp) => sum + emp.revenue, 0);

  const pieData = performanceData.map(emp => ({
    name: emp.name,
    value: emp.dealsWon / (emp.dealsWon + emp.dealsLost) * 100
  }));

  return (
    <div className="space-y-8">
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

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-lg border bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">Leads Performance</h3>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="leadsAssigned" fill="#8B5CF6" name="Assigned" />
                  <Bar dataKey="leadsClosed" fill="#22C55E" name="Closed" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">Win Rate by Rep</h3>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${Math.round(value)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Sales Team Leaderboard</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sales Rep</TableHead>
              <TableHead className="text-right">Leads Assigned</TableHead>
              <TableHead className="text-right">Leads Closed</TableHead>
              <TableHead className="text-right">Deals Won</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Conversion Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {performanceData
              .sort((a, b) => b.revenue - a.revenue)
              .map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="font-medium">{emp.name}</TableCell>
                  <TableCell className="text-right">{emp.leadsAssigned}</TableCell>
                  <TableCell className="text-right">{emp.leadsClosed}</TableCell>
                  <TableCell className="text-right">{emp.dealsWon}</TableCell>
                  <TableCell className="text-right">{formatCurrency(emp.revenue)}</TableCell>
                  <TableCell className="text-right">{emp.conversionRate}%</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PerformanceOverview;