
import { useState } from "react";
import { Lead, products } from "@/data/leads";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import LeadForm from "@/components/leads/LeadForm";
import TodayCallbacks from "@/components/leads/TodayCallbacks";
import LeadsByStage from "@/components/leads/LeadsByStage";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Leads = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: localLeads = [] } = useQuery({
    queryKey: ['leads'],
    queryFn: () => {
      return Promise.resolve([]);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const handleAddLead = (newLead: Partial<Lead>) => {
    const currentLeads = queryClient.getQueryData(['leads']) as Lead[] || [];
    const updatedLeads = [...currentLeads];
    
    if (selectedLead) {
      const leadIndex = updatedLeads.findIndex(lead => lead.id === selectedLead.id);
      if (leadIndex !== -1) {
        updatedLeads[leadIndex] = { ...selectedLead, ...newLead };
      }
    } else {
      const lead: Lead = {
        id: (currentLeads.length + 1).toString(),
        createdAt: new Date().toISOString().split('T')[0],
        lastContact: new Date().toISOString().split('T')[0],
        ...newLead,
      } as Lead;
      updatedLeads.unshift(lead);
    }

    queryClient.setQueryData(['leads'], updatedLeads);
    
    setSelectedLead(undefined);
    setShowLeadForm(false);
    
    toast({
      title: selectedLead ? "Lead Updated" : "Lead Created",
      description: `Successfully ${selectedLead ? "updated" : "created"} lead for ${newLead.name}`,
    });
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setShowLeadForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
            <p className="mt-2 text-gray-600">
              View and manage all your leads in one place
            </p>
          </div>
          <Button onClick={() => {
            setSelectedLead(undefined);
            setShowLeadForm(true);
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Lead
          </Button>
        </div>

        <TodayCallbacks leads={localLeads} onLeadClick={handleLeadClick} />
        <LeadsByStage leads={localLeads} onLeadClick={handleLeadClick} />

        <LeadForm
          open={showLeadForm}
          onOpenChange={(open) => {
            setShowLeadForm(open);
            if (!open) setSelectedLead(undefined);
          }}
          onSubmit={handleAddLead}
          initialData={selectedLead}
          defaultProduct={products[0]}
        />
      </div>
    </div>
  );
};

export default Leads;
