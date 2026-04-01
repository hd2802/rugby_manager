import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar className="bg-sidebar">
      <SidebarHeader />
      <SidebarContent>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}