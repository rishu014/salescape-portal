
import { useState } from "react";
import { Lead, LeadStatus } from "@/data/leads";
import SearchBar from "@/components/common/SearchBar";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface LeadListProps {
  leads: Lead[];
  onLeadClick?: (lead: Lead) => void;
  onDeleteLead?: (leadId: string) => void;
}

const LeadList = ({ leads, onLeadClick, onDeleteLead }: LeadListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [editingLead, setEditingLead] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Lead>>({});

  const handleDelete = (lead: Lead) => {
    if (lead.status === 'new' && onDeleteLead) {
      onDeleteLead(lead.id);
      toast({
        title: "Lead Deleted",
        description: `Successfully deleted lead for ${lead.name}`,
      });
    }
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead.id);
    setEditValues(lead);
  };

  const handleSave = (lead: Lead) => {
    if (onLeadClick) {
      // Get the current user's name (this would come from your auth system)
      const currentUser = "Current User"; // Replace with actual logged-in user
      onLeadClick({ 
        ...lead, 
        ...editValues,
        assignedTo: currentUser 
      });
      toast({
        title: "Lead Updated",
        description: "Lead information has been updated successfully",
      });
    }
    setEditingLead(null);
    setEditValues({});
  };

  const handleStatusChange = (value: LeadStatus, lead: Lead) => {
    const updatedLead = {
      ...lead,
      status: value,
      assignedTo: "Current User" // Replace with actual logged-in user
    };
    if (onLeadClick) {
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  {editingLead === lead.id ? (
                    <Input
                      value={editValues.name || lead.name}
                      onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                      className="max-w-[200px]"
                    />
                  ) : (
                    lead.name
                  )}
                </TableCell>
                <TableCell>
                  {editingLead === lead.id ? (
                    <Input
                      value={editValues.company || lead.company}
                      onChange={(e) => setEditValues({ ...editValues, company: e.target.value })}
                      className="max-w-[200px]"
                    />
                  ) : (
                    lead.company
                  )}
                </TableCell>
                <TableCell>
                  {editingLead === lead.id ? (
                    <Input
                      value={editValues.email || lead.email}
                      onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
                      className="max-w-[200px]"
                    />
                  ) : (
                    lead.email
                  )}
                </TableCell>
                <TableCell>
                  <Select
                    value={lead.status}
                    onValueChange={(value: LeadStatus) => handleStatusChange(value, lead)}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
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
                  <div className="flex items-center gap-2">
                    {editingLead === lead.id ? (
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleSave(lead)}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(lead)}
                      >
                        Edit
                      </Button>
                    )}
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
                  </div>
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
