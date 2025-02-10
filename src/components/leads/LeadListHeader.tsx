
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const LeadListHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Company</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Product</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Value</TableHead>
        <TableHead>Next Call</TableHead>
        <TableHead>Notes</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default LeadListHeader;
