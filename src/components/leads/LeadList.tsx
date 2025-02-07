import { useState } from "react";
import { Lead } from "@/data/leads";
import LeadStageCard from "@/components/dashboard/LeadStageCard";
import SearchBar from "@/components/common/SearchBar";
import { useToast } from "@/components/ui/use-toast";

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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredLeads.map((lead) => (
          <LeadStageCard
            key={lead.id}
            lead={lead}
            onClick={() => onLeadClick?.(lead)}
            onDelete={lead.status === 'new' ? () => handleDelete(lead) : undefined}
          />
        ))}
      </div>
      {filteredLeads.length === 0 && (
        <div className="text-center text-gray-500">No leads found</div>
      )}
    </div>
  );
};

export default LeadList;