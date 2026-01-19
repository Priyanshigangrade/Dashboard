"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const projects = [
  { id: "p1", name: "Instagram Reel – Product Launch" },
  { id: "p2", name: "Real Estate Walkthrough" },
]

export default function ProjectsPage() {
  const router = useRouter()

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <h1 className="text-2xl font-semibold">Projects</h1>

      {projects.map((project) => (
        <Card key={project.id}>
          <CardContent className="flex justify-between items-center py-4">
            <span>{project.name}</span>
            <Button
              variant="outline"
              onClick={() =>
                router.push(`/dashboard/projects/${project.id}`)
              }
            >
              Open
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
