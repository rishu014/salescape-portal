import { EmployeeStats } from "@/components/dashboard/EmployeeStats";
import PerformanceOverview from "@/components/dashboard/PerformanceOverview";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Track your performance and manage leads
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <EmployeeStats />
          </div>
        </div>

        <PerformanceOverview />
      </div>
    </div>
  );
};

export default Index;