import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Lead, getStageColor, formatCurrency } from "@/data/leads";
import { CalendarDays, Building2, Mail } from "lucide-react";

interface LeadStageCardProps {
  lead: Lead;
  onClick?: () => void;
}

const LeadStageCard = ({ lead, onClick }: LeadStageCardProps) => {
  const stageColor = getStageColor(lead.stage);

  return (
    <Card
      className="cursor-pointer space-y-4 p-6 transition-all hover:shadow-md"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{lead.name}</h3>
          <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
            <Building2 className="h-4 w-4" />
            <span>{lead.company}</span>
          </div>
        </div>
        <Badge
          className={`bg-${stageColor} hover:bg-${stageColor}`}
          variant="secondary"
        >
          {lead.stage.charAt(0).toUpperCase() + lead.stage.slice(1)}
        </Badge>
      </div>

      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <Mail className="h-4 w-4" />
          <span>{lead.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarDays className="h-4 w-4" />
          <span>Last Contact: {lead.lastContact}</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <span className="text-sm text-gray-500">Assigned to {lead.assignedTo}</span>
        <span className="font-medium text-gray-900">
          {formatCurrency(lead.value)}
        </span>
      </div>
    </Card>
  );
};

export default LeadStageCard;