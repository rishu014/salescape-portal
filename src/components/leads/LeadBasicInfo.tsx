import { Input } from "@/components/ui/input";

interface LeadBasicInfoProps {
  formData: {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
  };
  onChange: (field: string, value: string) => void;
}

const LeadBasicInfo = ({ formData, onChange }: LeadBasicInfoProps) => {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input
            value={formData.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Company</label>
          <Input
            value={formData.company || ""}
            onChange={(e) => onChange("company", e.target.value)}
            placeholder="Acme Inc"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            value={formData.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="john@acme.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone</label>
          <Input
            value={formData.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>
      </div>
    </>
  );
};

export default LeadBasicInfo;