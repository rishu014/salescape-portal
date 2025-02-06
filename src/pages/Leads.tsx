import { useState } from "react";
import { leads, Lead, LeadStage } from "@/data/leads";
import LeadList from "@/components/leads/LeadList";
import LeadForm from "@/components/leads/LeadForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { format, isToday, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Leads = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [localLeads, setLocalLeads] = useState<Lead[]>(leads);
  const [selectedLead, setSelectedLead] = useState<Lead | undefined>();

  const todayCallbacks = localLeads.filter(
    (lead) => lead.nextCallback && isToday(parseISO(lead.nextCallback))
  );

  const leadsByStage = localLeads.reduce((acc, lead) => {
    if (!acc[lead.stage]) {
      acc[lead.stage] = [];
    }
    acc[lead.stage].push(lead);
    return acc;
  }, {} as Record<LeadStage, Lead[]>);

  const handleAddLead = (newLead: Partial<Lead>) => {
    if (selectedLead) {
      // Update existing lead
      const updatedLeads = localLeads.map((lead) =>
        lead.id === selectedLead.id ? { ...lead, ...newLead } : lead
      );
      setLocalLeads(updatedLeads);
    } else {
      // Add new lead
      const lead: Lead = {
        ...newLead,
        id: (localLeads.length + 1).toString(),
        createdAt: new Date().toISOString().split('T')[0],
        lastContact: new Date().toISOString().split('T')[0],
      } as Lead;
      setLocalLeads([lead, ...localLeads]);
    }
    setSelectedLead(undefined);
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

        {todayCallbacks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Today's Scheduled Callbacks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {todayCallbacks.map((lead) => (
                  <div 
                    key={lead.id} 
                    className="rounded-lg border bg-white p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleLeadClick(lead)}
                  >
                    <h3 className="font-semibold">{lead.name}</h3>
                    <p className="text-sm text-gray-500">{lead.company}</p>
                    <p className="mt-2 text-sm text-primary">
                      Callback scheduled for: {lead.nextCallback}
                    </p>
                    {lead.callbackNotes && (
                      <p className="mt-1 text-sm text-gray-600">
                        Notes: {lead.callbackNotes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="new" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="contacted">Contacted</TabsTrigger>
            <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
            <TabsTrigger value="lost">Lost</TabsTrigger>
          </TabsList>

          {Object.entries(leadsByStage).map(([stage, stageLeads]) => (
            <TabsContent key={stage} value={stage}>
              <div className="rounded-lg border bg-white p-6">
                <LeadList 
                  leads={stageLeads} 
                  onLeadClick={handleLeadClick}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <LeadForm
          open={showLeadForm}
          onOpenChange={(open) => {
            setShowLeadForm(open);
            if (!open) setSelectedLead(undefined);
          }}
          onSubmit={handleAddLead}
          initialData={selectedLead}
        />
      </div>
    </div>
  );
};

export default Leads;