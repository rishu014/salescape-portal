import { Home, Users, FileText, Clock } from "lucide-react";
import { Sidebar, SidebarSection, SidebarItem } from "@/components/ui/sidebar";

export const AppSidebar = () => {
  return (
    <Sidebar>
      <div className="flex h-14 items-center border-b px-4">
        <span className="text-lg font-semibold">SaleScape Portal</span>
      </div>
      <SidebarSection>
        <SidebarItem icon={Home} href="/">
          Dashboard
        </SidebarItem>
        <SidebarItem icon={FileText} href="/leads">
          Leads
        </SidebarItem>
        <SidebarItem icon={Users} href="/team">
          Team
        </SidebarItem>
        <SidebarItem icon={Clock} href="/attendance">
          Attendance
        </SidebarItem>
      </SidebarSection>
    </Sidebar>
  );
};