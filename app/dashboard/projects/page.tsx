"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import ManageProjectsGrid from "@/components/projects/ManageProjectsGrid"
import NewProjectDialog from "@/components/projects/NewProjectDialog"

export default function ManageProjectsPage() {
  const [openNewProject, setOpenNewProject] = useState(false)

  return (
    <>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Manage Projects</h1>
            <p className="text-muted-foreground">
              All your video creation projects
            </p>
          </div>

          <Button onClick={() => setOpenNewProject(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* ✅ CONNECTED PROJECT GRID */}
        <ManageProjectsGrid />
      </div>

      {/* ✅ CONNECTED NEW PROJECT FLOW */}
      <NewProjectDialog
        open={openNewProject}
        onClose={() => setOpenNewProject(false)}
      />
    </>
  )
}
