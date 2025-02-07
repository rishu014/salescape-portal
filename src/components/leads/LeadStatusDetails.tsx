import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LeadStatus } from "@/data/leads";
import { useToast } from "@/components/ui/use-toast";

interface LeadStatusDetailsProps {
  formData: {
    industry: string;
    status: LeadStatus;
    value: number;
    assignedTo: string;
  };
  onChange: (field: string, value: string | number | LeadStatus) => void;
}

const LeadStatusDetails = ({ formData, onChange }: LeadStatusDetailsProps) => {
  const { toast } = useToast();

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Industry</label>
          <Input
            value={formData.industry}
            onChange={(e) => onChange("industry", e.target.value)}
            placeholder="Technology"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select
            value={formData.status}
            onValueChange={(value: LeadStatus) => {
              onChange("status", value);
              if (value === 'contacted') {
                toast({
                  title: "Don't forget!",
                  description: "Schedule a follow-up call with the lead.",
                });
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent position="popper" className="z-[200]">
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="negotiation">Negotiation</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Value ($)</label>
          <Input
            type="number"
            value={formData.value}
            onChange={(e) => onChange("value", Number(e.target.value))}
            placeholder="10000"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Assigned To</label>
          <Input
            value={formData.assignedTo}
            onChange={(e) => onChange("assignedTo", e.target.value)}
            placeholder="Sarah Wilson"
            required
          />
        </div>
      </div>
    </>
  );
};

export default LeadStatusDetails;