"use client"

import { useState } from "react"
import BasicProjectDetails from "./BasicProjectDetails"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Project } from "./types"

export default function NewProjectDialog({
  open,
  onClose,
  onSave,
}: {
  open: boolean
  onClose: () => void
  onSave?: (project: Project) => void
}) {
  const [project, setProject] = useState<Project>({
    id: `PRJ-${Date.now()}`,
    name: "New Project",
    description: "",
    type: "Kitchen Appliance Commercial",
    status: "active",
    videos: [],
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  })

  if (!open) return null

  return (
    <Dialog open={open}>
      <DialogContent className="!fixed !inset-0 !top-0 !left-0 !translate-x-0 !translate-y-0 !m-0 !w-screen !h-screen !max-w-none !rounded-none !p-0">
        <BasicProjectDetails
          project={project}
          onProjectChange={setProject}
          onClose={onClose}
          onSave={(updatedProject) => {
            onSave?.(updatedProject)
            onClose()
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
