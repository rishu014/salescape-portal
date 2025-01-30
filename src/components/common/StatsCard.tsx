import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard = ({ title, value, icon: Icon, trend }: StatsCardProps) => {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          {trend && (
            <p
              className={`mt-2 text-sm ${
                trend.isPositive ? "text-success" : "text-danger"
              }`}
            >
              {trend.isPositive ? "+" : "-"}
              {trend.value}% from last month
            </p>
          )}
        </div>
        <div
          className={`rounded-full p-3 ${
            trend?.isPositive ? "bg-success/10" : "bg-primary/10"
          }`}
        >
          <Icon
            className={`h-6 w-6 ${
              trend?.isPositive ? "text-success" : "text-primary"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;