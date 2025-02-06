import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { LeadStage, Lead } from "@/data/leads";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface LeadFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (lead: Partial<Lead>) => void;
  initialData?: Lead;
}

const LeadForm = ({ open, onOpenChange, onSubmit, initialData }: LeadFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Lead>>(
    initialData || {
      name: "",
      company: "",
      email: "",
      phone: "",
      industry: "",
      stage: "new" as LeadStage,
      assignedTo: "",
      value: 0,
      nextCallback: "",
      callbackNotes: "",
    }
  );

  const [date, setDate] = useState<Date | undefined>(
    formData.nextCallback ? new Date(formData.nextCallback) : undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    toast({
      title: initialData ? "Lead Updated" : "Lead Created",
      description: `Successfully ${initialData ? "updated" : "created"} lead for ${formData.name}`,
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{initialData ? "Edit Lead" : "Create New Lead"}</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Company</label>
            <Input
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Acme Inc"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@acme.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Industry</label>
            <Input
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              placeholder="Technology"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Stage</label>
            <Select
              value={formData.stage}
              onValueChange={(value: LeadStage) => {
                setFormData({ ...formData, stage: value });
                if (value === 'contacted') {
                  toast({
                    title: "Don't forget!",
                    description: "Schedule a follow-up call with the lead.",
                  });
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Next Callback Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    setFormData({
                      ...formData,
                      nextCallback: newDate ? format(newDate, "yyyy-MM-dd") : "",
                    });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Callback Notes</label>
            <Textarea
              value={formData.callbackNotes}
              onChange={(e) => setFormData({ ...formData, callbackNotes: e.target.value })}
              placeholder="Add notes about the next callback..."
              className="min-h-[100px]"
            />
          </div>

          <div className="pt-4 flex justify-end space-x-2">
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
