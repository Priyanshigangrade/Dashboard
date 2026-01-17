import AppSidebar from "@/components/app-sidebar"
import Navbar from "@/components/Navbar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex w-full flex-col">
          <Navbar />
          <main className="flex-1 px-4 py-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
