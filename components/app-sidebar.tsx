"use client"

import * as React from "react"
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

/* ✅ YOUR SIDEBAR MENU ITEMS */
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "API Keys",
    url: "/dashboard/api-keys",
    icon: KeyRound,
  },
  {
    title: "Templates",
    url: "/dashboard/templates",
    icon: FileText,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
]

/* ✅ TOP BRAND */
function SidebarTopBrand() {
  const { state } = useSidebar()

  return (
    <div className="flex items-center gap-3 px-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>P</AvatarFallback>
      </Avatar>

      {state !== "collapsed" && (
        <span className="text-sm font-semibold">Priyanshi</span>
      )}
    </div>
  )
}

/* ✅ BOTTOM USER DROPDOWN */
function SidebarUserMenu() {
  const { state } = useSidebar()

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

        <DropdownMenuItem className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ✅ MAIN SIDEBAR */
export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      {/* HEADER */}
      <SidebarHeader>
        <div className="flex items-center justify-between px-2">
          <SidebarTopBrand />
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      {/* MENU */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
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
