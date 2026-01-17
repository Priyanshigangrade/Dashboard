"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import TemplatesToolbar, { TemplatesView } from "@/components/templates/templates-toolbar"
import TemplatesGrid from "@/components/templates/templates-grid"
import TemplatesTable from "@/components/templates/templates-table"
import { mockTemplates } from "@/components/templates/mock"

export default function TemplatesPage() {
  const router = useRouter()

  const [view, setView] = React.useState<TemplatesView>("grid")
  const [search, setSearch] = React.useState("")
  const [category, setCategory] = React.useState("all")

  const filtered = mockTemplates.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())

    const matchesCategory = category === "all" ? true : t.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <TemplatesToolbar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        view={view}
        onViewChange={setView}
        onNewTemplate={() => router.push("/dashboard/templates/builder/new")}
      />

      {view === "grid" ? (
        <TemplatesGrid templates={filtered} />
      ) : (
        <TemplatesTable templates={filtered} />
      )}
    </div>
  )
}
