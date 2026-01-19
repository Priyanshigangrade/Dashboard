"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import {
  ChevronsUpDown,
  LogOut,
  Settings,
  User,
  LayoutDashboard,
  KeyRound,
  FileText,
  FolderKanban,
  Users,
  ChevronDown,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { Button } from "@/components/ui/button"

/* NAV ITEMS */
const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Templates", url: "/dashboard/templates", icon: FileText },
  { title: "Projects", url: "/dashboard/projects", icon: FolderKanban },
  { title: "Users", url: "/dashboard/users", icon: Users },
]

/* USER MENU */
function SidebarUserMenu() {
  const { state } = useSidebar()
  const router = useRouter()

  function handleLogout() {
    localStorage.removeItem("aiccr-auth")
    router.replace("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-between px-2 py-6">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {state !== "collapsed" && (
              <span className="text-sm font-medium">Priyanshi</span>
            )}
          </div>
          {state !== "collapsed" && (
            <ChevronsUpDown className="h-4 w-4 opacity-60" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="top" align="start" className="w-48">
        <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
          <User className="mr-2 h-4 w-4" />
          Account
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* MAIN SIDEBAR */
export default function AppSidebar() {
  const pathname = usePathname()

  // ✅ ALL HOOKS FIRST (NO CONDITIONALS ABOVE)
  const [mounted, setMounted] = React.useState(false)

  const apiOpenDefault = pathname.startsWith("/dashboard/api-keys")
  const [apiOpen, setApiOpen] = React.useState(apiOpenDefault)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (apiOpenDefault) setApiOpen(true)
  }, [apiOpenDefault])

  // ✅ CONDITIONAL RENDER AFTER HOOKS
  if (!mounted) return null

  return (
    <Sidebar collapsible="icon">
      {/* HEADER */}
      <SidebarHeader>
        <div className="flex items-center justify-end px-2 py-2">
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Dashboard"
                  isActive={pathname === "/dashboard"}
                >
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* API Keys */}
              <SidebarMenuItem>
                <Collapsible open={apiOpen} onOpenChange={setApiOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="API Keys"
                      isActive={apiOpenDefault}
                    >
                      <KeyRound className="h-4 w-4" />
                      <span>API Keys</span>
                      <ChevronDown className="ml-auto h-4 w-4 opacity-70" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="mt-1 space-y-1 pl-7">
                    <SidebarMenuButton
                      asChild
                      size="sm"
                      isActive={pathname === "/dashboard/api-keys/chatgpt"}
                    >
                      <Link href="/dashboard/api-keys/chatgpt">ChatGPT</Link>
                    </SidebarMenuButton>

                    <SidebarMenuButton
                      asChild
                      size="sm"
                      isActive={pathname === "/dashboard/api-keys/gemini"}
                    >
                      <Link href="/dashboard/api-keys/gemini">Gemini</Link>
                    </SidebarMenuButton>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Other Items */}
              {items
                .filter((i) => i.title !== "Dashboard")
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={pathname.startsWith(item.url)}
                    >
                      <Link href={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t p-2">
        <SidebarUserMenu />
      </SidebarFooter>
    </Sidebar>
  )
}
