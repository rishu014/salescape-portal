
import { useState } from "react";
import { Lead, LeadStatus, products } from "@/data/leads";
import SearchBar from "@/components/common/SearchBar";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody } from "@/components/ui/table";
import LeadListHeader from "./LeadListHeader";
import LeadListItem from "./LeadListItem";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LeadListProps {
  leads: Lead[];
  onLeadClick?: (lead: Lead) => void;
  onDeleteLead?: (leadId: string) => void;
}

const LeadList = ({ leads, onLeadClick, onDeleteLead }: LeadListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string>("all");
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
      const currentUser = "Current User";
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
    (lead) => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesProduct = selectedProduct === "all" || lead.product === selectedProduct;
      
      return matchesSearch && matchesProduct;
    }
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search by name, company, or email..."
          />
        </div>
        <div className="w-[200px]">
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent position="popper" className="z-[200] bg-white">
              <SelectItem value="all">All Products</SelectItem>
              {products.map((product) => (
                <SelectItem key={product} value={product}>
                  {product}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <LeadListHeader />
          <TableBody>
            {filteredLeads.map((lead) => (
              <LeadListItem
                key={lead.id}
                lead={lead}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
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
