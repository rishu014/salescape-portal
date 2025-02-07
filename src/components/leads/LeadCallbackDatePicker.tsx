import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface LeadCallbackDatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

const LeadCallbackDatePicker = ({ date, onDateChange }: LeadCallbackDatePickerProps) => {
  const { toast } = useToast();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Next Callback Date</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="z-[9999] w-auto p-0 bg-white shadow-lg border rounded-md" 
          align="start" 
          side="left"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              if (newDate) {
                onDateChange(newDate);
                toast({
                  title: "Date Selected",
                  description: `Callback date set to ${format(newDate, "PPP")}`,
                });
              }
            }}
            initialFocus
            className="bg-white rounded-md"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LeadCallbackDatePicker;