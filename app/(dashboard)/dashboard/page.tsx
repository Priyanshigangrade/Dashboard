"use client"

import { useState } from "react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Plus, Zap, FolderKanban, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

import NewProjectDialog from "@/components/projects/NewProjectDialog"

const projects = [
  {
    id: "p1",
    name: "Instagram Reel – Product Launch",
    type: "Marketing",
    credits: 120,
    updatedAt: "2 hours ago",
  },
  {
    id: "p2",
    name: "Real Estate Walkthrough",
    type: "Real Estate",
    credits: 340,
    updatedAt: "Yesterday",
  },
  {
    id: "p3",
    name: "Food Promo Shorts",
    type: "Reels",
    credits: 90,
    updatedAt: "3 days ago",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [openNewProject, setOpenNewProject] = useState(false)

  return (
    <>
      <div className="mx-auto max-w-5xl space-y-8">
        {/* TITLE */}
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your projects and AI usage.
          </p>
        </div>

        {/* STATS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>AI Credits Used</CardDescription>
              <CardTitle className="text-2xl">1,240</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Projects</CardDescription>
              <CardTitle className="text-2xl">12</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Projects</CardDescription>
              <CardTitle className="text-2xl">5</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Last Activity</CardDescription>
              <CardTitle className="text-2xl">2h ago</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* CREATE PROJECT */}
        <Card>
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-medium">Create a new project</h3>
              <p className="text-sm text-muted-foreground">
                Start generating AI content with predefined workflows.
              </p>
            </div>

            <Button onClick={() => setOpenNewProject(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </CardContent>
        </Card>

        {/* RECENT PROJECTS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Projects</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/dashboard/projects")}
            >
              View all
            </Button>
          </div>

          <div className="grid gap-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="space-y-1">
                    <p className="font-medium">{project.name}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FolderKanban className="h-4 w-4" />
                        {project.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-4 w-4" />
                        {project.credits} credits
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {project.updatedAt}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/dashboard/projects/${project.id}`)
                      }
                    >
                      Open
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* NEW PROJECT MODAL */}
      <NewProjectDialog
        open={openNewProject}
        onOpenChange={setOpenNewProject}
      />
    </>
  )
}
