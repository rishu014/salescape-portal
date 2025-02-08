
import { useState } from "react";
import { Lead } from "@/data/leads";
import SearchBar from "@/components/common/SearchBar";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      onLeadClick({ ...lead, ...editValues });
      toast({
        title: "Lead Updated",
        description: "Lead information has been updated successfully",
      });
    }
    setEditingLead(null);
    setEditValues({});
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
              <TableHead>Last Contact</TableHead>
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
                  <Badge
                    variant="secondary"
                    className={`bg-${lead.status === 'new' ? 'primary' : 
                      lead.status === 'contacted' ? 'warning' : 
                      lead.status === 'negotiation' ? 'secondary' : 
                      lead.status === 'closed' ? 'success' : 'danger'}`}
                  >
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>${lead.value.toLocaleString()}</TableCell>
                <TableCell>{lead.lastContact}</TableCell>
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
