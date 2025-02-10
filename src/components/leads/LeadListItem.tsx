
import { Lead, LeadStatus } from "@/data/leads";
import { TableCell, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface LeadListItemProps {
  lead: Lead;
  onStatusChange: (value: LeadStatus, lead: Lead) => void;
  onDelete?: (lead: Lead) => void;
}

const LeadListItem = ({ lead, onStatusChange, onDelete }: LeadListItemProps) => {
  return (
    <TableRow>
      <TableCell>{lead.name}</TableCell>
      <TableCell>{lead.company}</TableCell>
      <TableCell>{lead.email}</TableCell>
      <TableCell>{lead.product}</TableCell>
      <TableCell>
        <Select
          defaultValue={lead.status}
          onValueChange={(value: LeadStatus) => onStatusChange(value, lead)}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent position="popper" className="z-[200] bg-white">
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="negotiation">Negotiation</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>${lead.value.toLocaleString()}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {lead.nextCallback ? format(new Date(lead.nextCallback), 'MM/dd/yyyy') : 'Not scheduled'}
        </div>
      </TableCell>
      <TableCell>
        {lead.callbackNotes && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-white">
              <div className="space-y-2">
                <h4 className="font-medium">Callback Notes</h4>
                <p className="text-sm text-gray-500">{lead.callbackNotes}</p>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </TableCell>
      <TableCell>
        {lead.status === 'new' && onDelete && (
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete(lead)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default LeadListItem;
