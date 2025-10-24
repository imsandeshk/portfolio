import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, Home, Map, PackageSearch, Sheet, BarChartBig, LogOut, Users, Scale } from "lucide-react";
import { useSCMAuth } from "../auth/SCMAuthContext";

const LinkItem: React.FC<{ to: string; label: string; icon: React.ReactNode }> = ({ to, label, icon }) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? "block" : "block")}>
    <SidebarMenuButton asChild isActive={false}>
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
    </SidebarMenuButton>
  </NavLink>
);

export const SCMLayout: React.FC = () => {
  const { role, signOut } = useSCMAuth();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <div className="font-semibold">SCM Portal</div>
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <LinkItem to="/scm" label="Dashboard" icon={<Home className="h-4 w-4" />} />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <LinkItem to="/scm/shipments" label="Shipments" icon={<PackageSearch className="h-4 w-4" />} />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <LinkItem to="/scm/forms" label="Data Entry" icon={<Sheet className="h-4 w-4" />} />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <LinkItem to="/scm/notifications" label="Notifications" icon={<Bell className="h-4 w-4" />} />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <LinkItem to="/scm/reports" label="Reports" icon={<BarChartBig className="h-4 w-4" />} />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <LinkItem to="/scm/map" label="Map" icon={<Map className="h-4 w-4" />} />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <LinkItem to="/scm/admin/users" label="Users" icon={<Users className="h-4 w-4" />} />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <LinkItem to="/scm/admin/disputes" label="Disputes" icon={<Scale className="h-4 w-4" />} />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="text-xs text-muted-foreground">Signed in as: {role}</div>
          <Button size="sm" variant="outline" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className="p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
