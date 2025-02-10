
import { Lead, LeadStatus, products } from "@/data/leads";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadList from "./LeadList";

interface LeadsByStageProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

const LeadsByStage = ({ leads, onLeadClick }: LeadsByStageProps) => {
  const leadsByProduct = products.reduce((acc, product) => {
    acc[product] = leads.filter(lead => lead.product === product);
    return acc;
  }, {} as Record<string, Lead[]>);

  return (
    <Tabs defaultValue={products[0]} className="w-full">
      <TabsList className="w-full justify-start">
        {products.map((product) => (
          <TabsTrigger key={product} value={product} className="capitalize">
            {product} ({leadsByProduct[product]?.length || 0})
          </TabsTrigger>
        ))}
      </TabsList>

      {products.map((product) => (
        <TabsContent key={product} value={product}>
          <div className="rounded-lg border bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold capitalize">{product} Leads</h3>
            </div>
            <LeadList 
              leads={leadsByProduct[product] || []} 
              onLeadClick={onLeadClick} 
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default LeadsByStage;
