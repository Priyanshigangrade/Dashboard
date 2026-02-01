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
  FileText,
  FolderKanban,
  Users,
  ChevronDown,
  Heart,
  Bot,
  Folder,
  MessageSquare,
  Menu,
  X,
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
import { cn } from "@/lib/utils"

/* FAVORITE PROJECTS DATA */
const favoriteProjects = [
  { id: 1, name: "E-commerce Platform" },
  { id: 2, name: "Mobile App UI" },
  { id: 3, name: "Admin Dashboard" },
  { id: 4, name: "Portfolio Website" },
  { id: 5, name: "AI Chat Assistant" },
]

/* NAV ITEMS */
const items = [
  { title: "Configure Project Type", url: "/dashboard/templates", icon: FileText },
  { title: "Manage Projects", url: "/dashboard/projects", icon: FolderKanban },
  { title: "Users", url: "/dashboard/users", icon: Users },
]

/* USER MENU */
function SidebarUserMenu() {
  const { state } = useSidebar()
  const router = useRouter()

  function handleLogout() {
    localStorage.removeItem("aiccr-auth")
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
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
        <DropdownMenuItem onClick={() => router.push("/dashboard/account")}>
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

/* CUSTOM SIDEBAR HEADER */
function CustomSidebarHeader() {
  const { state } = useSidebar()
  
  return (
    <div className={cn(
      "flex items-center px-2 py-2",
      state === "collapsed" ? "justify-center" : "justify-between"
    )}>
      {/* Logo/App Name - Only shows when sidebar is expanded */}
      {state !== "collapsed" && (
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
            <span className="text-xs font-bold text-primary-foreground">A</span>
          </div>
          <span className="text-sm font-semibold">AICCR</span>
        </div>
      )}
      
      {/* Collapse Button - Always shows, position changes based on state */}
      <SidebarTrigger />
    </div>
  )
}

/* MAIN SIDEBAR */
export default function AppSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)
  const aiToolsOpenDefault = pathname.startsWith("/dashboard/api-keys")
  const [aiToolsOpen, setAiToolsOpen] = React.useState(aiToolsOpenDefault)
  const [favoritesOpen, setFavoritesOpen] = React.useState(true)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (aiToolsOpenDefault) setAiToolsOpen(true)
  }, [aiToolsOpenDefault])

  if (!mounted) return null

  return (
    <Sidebar collapsible="icon">
      {/* CUSTOM HEADER WITH LOGO + COLLAPSE BUTTON */}
      <SidebarHeader>
        <CustomSidebarHeader />
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Dashboard"
                  isActive={pathname === "/dashboard"}
                >
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Favourite Projects Dropdown */}
              <SidebarMenuItem>
                <Collapsible open={favoritesOpen} onOpenChange={setFavoritesOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="Favourite Projects"
                      isActive={pathname.startsWith("/dashboard/projects")}
                    >
                      <Heart className="h-4 w-4" />
                      <span>Favourite Projects</span>
                      <ChevronDown className="ml-auto h-4 w-4 opacity-70" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="mt-1 space-y-1 pl-7">
                    {/* New Project */}
                    <SidebarMenuButton
                      asChild
                      size="sm"
                      isActive={pathname === "/dashboard/projects/new"}
                    >
                      <Link href="/dashboard/projects/new">New project</Link>
                    </SidebarMenuButton>

                    {/* Favorite Projects List */}
                    {favoriteProjects.map((project) => (
                      <SidebarMenuButton
                        key={project.id}
                        asChild
                        size="sm"
                        isActive={pathname === `/dashboard/projects/${project.id}`}
                      >
                        <Link href={`/dashboard/projects/${project.id}`}>
                          {project.name}
                        </Link>
                      </SidebarMenuButton>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

             

              {/* AI Tools Section */}
              <SidebarMenuItem>
                <Collapsible open={aiToolsOpen} onOpenChange={setAiToolsOpen}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="AI Tools Setup & Usage"
                      isActive={aiToolsOpenDefault}
                    >
                      <Bot className="h-4 w-4" />
                      <span>AI Tools Setup</span>
                      <ChevronDown className="ml-auto h-4 w-4 opacity-70" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="mt-1 space-y-1 pl-7">
                    <SidebarMenuButton
                      asChild
                      size="sm"
                      isActive={pathname === "/dashboard/ai-tool-setup/chatgpt"}
                    >
                      <Link href="/dashboard/ai-tool-setup/chatgpt">ChatGPT Keys</Link>
                    </SidebarMenuButton>

                    <SidebarMenuButton
                      asChild
                      size="sm"
                      isActive={pathname === "/dashboard/ai-tool-setup/gemini"}
                    >
                      <Link href="/dashboard/ai-tool-setup/gemini">Gemini Keys</Link>
                    </SidebarMenuButton>

                    <SidebarMenuButton
                      asChild
                      size="sm"
                      isActive={pathname.startsWith("/dashboard/ai-tool-setup/AICreditUsage")}
                    >
                      <Link href="/dashboard/ai-tool-setup/AICreditUsage">AI Credit Usage Dashboard</Link>
                    </SidebarMenuButton>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Other Items */}
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname.startsWith(item.url)}
                  >
                    <Link href={item.url}>
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