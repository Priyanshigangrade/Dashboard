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
} from "@/components/ui/dropdown-menu"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

/* ✅ OTHER MENU ITEMS (API Keys handled separately as dropdown) */
const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Templates", url: "/dashboard/templates", icon: FileText },
  { title: "Projects", url: "/dashboard/projects", icon: FolderKanban },
  { title: "Users", url: "/dashboard/users", icon: Users },
]

/* ✅ BOTTOM USER DROPDOWN */
function SidebarUserMenu() {
  const { state } = useSidebar()
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-sidebar-accent">
          <User className="h-4 w-4" />

          {state !== "collapsed" && (
            <>
              <span className="flex-1 text-sm font-medium">Priyanshi</span>
              <ChevronsUpDown className="h-4 w-4 opacity-70" />
            </>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="top" align="start" className="w-44">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Account
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-red-600"
          onClick={() => {
            localStorage.removeItem("isLoggedIn")
            router.push("/login")
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ✅ MAIN SIDEBAR */
export default function AppSidebar() {
  const pathname = usePathname()

  // ✅ auto open dropdown when inside api-keys routes
  const apiOpenDefault = pathname.startsWith("/dashboard/api-keys")

  // ✅ STATE REQUIRED for dropdown open/close
  const [apiOpen, setApiOpen] = React.useState(apiOpenDefault)

  // ✅ keep dropdown open when route changes to api keys
  React.useEffect(() => {
    if (apiOpenDefault) setApiOpen(true)
  }, [apiOpenDefault])

  return (
    <Sidebar collapsible="icon">
      {/* ✅ HEADER (ONLY TRIGGER) */}
      <SidebarHeader>
        <div className="flex items-center justify-end px-2 py-2">
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      {/* MENU */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {/* ✅ Dashboard */}
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

              {/* ✅ API Keys Dropdown */}
              <SidebarMenuItem>
                <Collapsible open={apiOpen} onOpenChange={setApiOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="API Keys"
                      isActive={apiOpenDefault}
                      onClick={() => setApiOpen((prev) => !prev)}
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

              {/* ✅ Other menu items */}
              {items
                .filter((x) => x.title !== "Dashboard")
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
      <SidebarFooter>
        <SidebarUserMenu />
      </SidebarFooter>
    </Sidebar>
  )
}
