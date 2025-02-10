
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { LeadStatus, Lead, products } from "@/data/leads";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import LeadBasicInfo from "./LeadBasicInfo";
import LeadStatusDetails from "./LeadStatusDetails";
import LeadCallbackDatePicker from "./LeadCallbackDatePicker";

interface LeadFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (lead: Partial<Lead>) => void;
  initialData?: Lead;
  defaultProduct?: string;
}

const defaultFormData = (defaultProduct?: string) => ({
  name: "",
  company: "",
  email: "",
  phone: "",
  industry: "",
  status: "new" as LeadStatus,
  assignedTo: "",
  value: 0,
  nextCallback: "",
  callbackNotes: "",
  lastContact: new Date().toISOString().split('T')[0],
  product: defaultProduct || products[0],
});

const LeadForm = ({ open, onOpenChange, onSubmit, initialData, defaultProduct }: LeadFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Lead>>(
    initialData || defaultFormData(defaultProduct)
  );

  const [date, setDate] = useState<Date | undefined>(
    formData.nextCallback ? new Date(formData.nextCallback) : undefined
  );

  // Reset form when initialData changes or form is opened/closed
  useEffect(() => {
    setFormData(initialData || defaultFormData(defaultProduct));
    setDate(initialData?.nextCallback ? new Date(initialData.nextCallback) : undefined);
  }, [initialData, open, defaultProduct]);

  const handleFieldChange = (field: string, value: string | number | LeadStatus) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    setFormData({
      ...formData,
      nextCallback: newDate ? format(newDate, "yyyy-MM-dd") : "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      lastContact: new Date().toISOString().split('T')[0],
    };
    
    if (initialData) {
      onSubmit({ ...initialData, ...updatedData });
    } else {
      onSubmit(updatedData);
    }
    toast({
      title: initialData ? "Lead Updated" : "Lead Created",
      description: `Successfully ${initialData ? "updated" : "created"} lead for ${formData.name}`,
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[95vw] max-w-[540px] overflow-y-auto sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{initialData ? "Edit Lead" : "Create New Lead"}</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <LeadBasicInfo formData={formData} onChange={handleFieldChange} />
          <LeadStatusDetails formData={formData} onChange={handleFieldChange} />
          <LeadCallbackDatePicker date={date} onDateChange={handleDateChange} />

          <div className="space-y-2">
            <label className="text-sm font-medium">Callback Notes</label>
            <Textarea
              value={formData.callbackNotes}
              onChange={(e) => handleFieldChange("callbackNotes", e.target.value)}
              placeholder="Add notes about the next callback..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Update Lead" : "Create Lead"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default LeadForm;
