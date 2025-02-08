
import { useState } from "react";
import { Lead, LeadStatus } from "@/data/leads";
import SearchBar from "@/components/common/SearchBar";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface LeadListProps {
  leads: Lead[];
  onLeadClick?: (lead: Lead) => void;
  onDeleteLead?: (leadId: string) => void;
}

const LeadList = ({ leads, onLeadClick, onDeleteLead }: LeadListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleDelete = (lead: Lead) => {
    if (lead.status === 'new' && onDeleteLead) {
      onDeleteLead(lead.id);
      toast({
        title: "Lead Deleted",
        description: `Successfully deleted lead for ${lead.name}`,
      });
    }
  };

  const handleStatusChange = (value: LeadStatus, lead: Lead) => {
    if (onLeadClick) {
      const currentUser = "Current User"; // Replace with actual logged-in user
      const updatedLead = {
        ...lead,
        status: value,
        assignedTo: currentUser
      };
      onLeadClick(updatedLead);
      toast({
        title: "Status Updated",
        description: `Lead status updated to ${value}`,
      });
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SearchBar
        onSearch={setSearchQuery}
        placeholder="Search by name, company, or email..."
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Next Call</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={lead.status}
                    onValueChange={(value: LeadStatus) => handleStatusChange(value, lead)}
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
                  {lead.status === 'new' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(lead)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {filteredLeads.length === 0 && (
        <div className="text-center text-gray-500">No leads found</div>
      )}
    </div>
  );
};

export default LeadList;

