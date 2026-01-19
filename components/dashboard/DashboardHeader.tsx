"use client"

import * as React from "react"
import { Moon, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const { setTheme } = useTheme()

  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      {/* Left: Sidebar trigger only */}
      <SidebarTrigger />

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* AI Credits */}
        <Badge variant="secondary" className="flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5" />
          1,240
        </Badge>

        {/* Theme switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Moon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
