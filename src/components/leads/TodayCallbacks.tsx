import { Lead } from "@/data/leads";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isToday, parseISO } from "date-fns";
import LeadStageCard from "../dashboard/LeadStageCard";

interface TodayCallbacksProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

const TodayCallbacks = ({ leads, onLeadClick }: TodayCallbacksProps) => {
  const todayCallbacks = leads.filter(
    (lead) => lead.nextCallback && isToday(parseISO(lead.nextCallback))
  );

  if (todayCallbacks.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Scheduled Callbacks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {todayCallbacks.map((lead) => (
            <LeadStageCard
              key={lead.id}
              lead={lead}
              onClick={() => onLeadClick(lead)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayCallbacks;