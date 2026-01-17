"use client"

import * as React from "react"
import { Search, LayoutGrid, Table2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TEMPLATE_CATEGORIES } from "./mock"

export type TemplatesView = "grid" | "table"

export default function TemplatesToolbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  view,
  onViewChange,
  onNewTemplate,
}: {
  search: string
  onSearchChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  view: TemplatesView
  onViewChange: (value: TemplatesView) => void
  onNewTemplate: () => void
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Templates</h1>
        <p className="text-sm text-muted-foreground">
          Reusable shot workflows for projects
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative md:w-[280px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search templates..."
            className="pl-9"
          />
        </div>

        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="md:w-[220px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {TEMPLATE_CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Button
            variant={view === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => onViewChange("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "table" ? "default" : "outline"}
            size="icon"
            onClick={() => onViewChange("table")}
          >
            <Table2 className="h-4 w-4" />
          </Button>

          <Button onClick={onNewTemplate}>+ New Template</Button>
        </div>
      </div>
    </div>
  )
}
