"use client"

import { useParams } from "next/navigation"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

import ShotsTab from "@/components/projects/shots/ShotsTab"
import StepStoryboard from "@/components/projects/steps/StepStoryboard"
import StepVideo from "@/components/projects/steps/StepVideo"

export default function ProjectExecutionPage() {
  const { projectId } = useParams()

  // mock project (replace with API later)
  const project = {
    id: projectId,
    name: "Instagram Reel – Product Launch",
    type: "Marketing",
    status: "Draft",
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{project.name}</h1>
          <p className="text-sm text-muted-foreground">
            Project Type: {project.type}
          </p>
        </div>

        <Badge variant="outline">{project.status}</Badge>
      </div>

      {/* TABS */}
      <Tabs defaultValue="shots" className="w-full space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="shots">Shots</TabsTrigger>
          <TabsTrigger value="storyboard">Storyboard</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* SHOTS */}
        <TabsContent value="shots">
          <Card className="min-h-[600px] p-6">
            <ShotsTab />
          </Card>
        </TabsContent>

        {/* STORYBOARD */}
        <TabsContent value="storyboard">
          <Card className="min-h-[600px] p-6">
            <StepStoryboard />
          </Card>
        </TabsContent>

        {/* VIDEO */}
        <TabsContent value="video">
          <Card className="min-h-[600px] p-6">
            <StepVideo />
          </Card>
        </TabsContent>

        {/* SETTINGS */}
        <TabsContent value="settings">
          <Card className="min-h-[600px] p-6 space-y-4">
            <h3 className="text-lg font-medium">Project Settings</h3>
            <p className="text-sm text-muted-foreground">
              Rename project, change template, or delete project.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
