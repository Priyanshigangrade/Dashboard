"use client"

import * as React from "react"
import { Moon, Sparkles, Battery, Zap } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export function DashboardHeader() {
  const { setTheme } = useTheme()
  const totalCredits = 10000
  const usedCredits = 5890
  const remainingCredits = totalCredits - usedCredits
  const usagePercentage = (remainingCredits / totalCredits) * 100

  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      {/* Left: Title */}
      <div>
        <h1 className="font-semibold text-sm">AI Content Creator</h1>
      </div>

      {/* Right: Actions with Credits Progress */}
      <div className="flex items-center gap-4">
        {/* Credits Progress Bar */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Progress Bar */}
          <div className="w-32 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Credits</span>
              <span className="font-medium">{remainingCredits} left</span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{usedCredits} used</span>
              <span>{totalCredits} total</span>
            </div>
          </div>
          
          {/* Badge */}
          
        </div>

        

        {/* Theme switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
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