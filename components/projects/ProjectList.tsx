"use client"
import { useEffect, useState } from "react"
import { Project, ProjectTypeConfig } from "./types"
import ProjectModal from "./ProjectModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [openProject, setOpenProject] = useState<Project | null>(null)

  useEffect(() => {
    setProjects([
      {
        id: "PRJ-001",
        name: "Mixer Grinder Campaign",
        description: "",
        type: "product",
        status: "active",
        videos: [],
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
      },
    ])
  }, [])

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Project List</h1>
        <Button onClick={() => setOpenProject(projects[0])}>New Project</Button>
      </div>

      <Input placeholder="Search projects..." className="max-w-sm" />

      <table className="w-full border">
        <thead>
          <tr className="text-left text-sm text-muted-foreground">
            <th>ID</th><th>Name</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.id} className="border-t">
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td><Badge>{p.status}</Badge></td>
              <td>
                <Button size="sm" variant="ghost" onClick={() => setOpenProject(p)}>
                  Edit ✏️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openProject && (
        <ProjectModal
          project={openProject}
          projectTypes={[]}
          onClose={() => setOpenProject(null)}
        />
      )}
    </div>
  )
}
