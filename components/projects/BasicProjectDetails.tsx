"use client"

import { useState } from "react"
import { Project, Video } from "./types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Stage1 from "./stages/Stage1"
import Stage2 from "./stages/Stage2"
import Stage3 from "./stages/Stage3"
import Stage4 from "./stages/Stage4"

interface BasicProjectDetailsProps {
  project: Project
  onProjectChange: (project: Project) => void
  onClose: () => void
  onSave: (project: Project) => void
  onEditStage1?: () => void
}

export default function BasicProjectDetails({
  project,
  onProjectChange,
  onClose,
  onSave,
}: BasicProjectDetailsProps) {
  const [showStages, setShowStages] = useState(false)
  const [currentStage, setCurrentStage] = useState(1)
  const [selectedVideoIdx, setSelectedVideoIdx] = useState(0)

  const handleCreateVideo = () => {
    const newVid: Video = {
      id: `vid-${Date.now()}`,
      name: `Video ${project.videos.length + 1}`,
      description: "",
      stage1: {
        numShots: 8,
        durationPerShot: 8,
        contentPrompt: "",
        productImages: [],
        referenceImages: [],
        imageParameters: [],
      },
      stage2: { shots: [], comments: [] },
      stage3: { generatedImages: [] },
      stage4: { videoPrompts: [], generatedVideos: [] },
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    }
    const updatedProject = { ...project, videos: [...project.videos, newVid] }
    onProjectChange(updatedProject)
    setSelectedVideoIdx(updatedProject.videos.length - 1)
    setShowStages(true)
    setCurrentStage(1)
  }

  const handleDeleteVideo = (idx: number) => {
    if (!confirm("Delete this video?")) return
    const updatedVideos = project.videos.filter((_, i) => i !== idx)
    onProjectChange({ ...project, videos: updatedVideos })
  }

  const handleDuplicateVideo = (idx: number) => {
    const video = project.videos[idx]
    const copy = {
      ...video,
      id: `${video.id}-copy-${Date.now()}`,
      name: `${video.name} - Copy`,
    }
    const updatedVideos = [...project.videos, copy]
    onProjectChange({ ...project, videos: updatedVideos })
  }

  const handleEditVideo = (idx: number) => {
    setSelectedVideoIdx(idx)
    setShowStages(true)
    setCurrentStage(1)
  }

  const handleVideoChange = (patch: any) => {
    const updatedVideos = [...project.videos]
    updatedVideos[selectedVideoIdx] = { ...updatedVideos[selectedVideoIdx], ...patch }
    onProjectChange({ ...project, videos: updatedVideos })
  }

  if (showStages) {
    return (
      <div className="w-full h-screen flex flex-col animate-in fade-in duration-300">
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b transition-all duration-300">
          <div className="flex items-center justify-between py-4 px-4">
            <DialogTitle className="transition-colors duration-200">
              Project: {project.name || "New Project"} - Video: {project.videos[selectedVideoIdx]?.name}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowStages(false)
                }}
                className="transition-all duration-200 hover:scale-105 hover:bg-accent"
              >
                Back to Details
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  onSave(project)
                  onClose()
                }}
                className="transition-all duration-200 hover:scale-105 hover:bg-accent"
              >
                Save
              </Button>
              <Button 
                onClick={() => onClose()}
                className="transition-all duration-200 hover:scale-105"
              >
                Close
              </Button>
            </div>
          </div>

          <div className="flex gap-2 items-center pb-3 px-4">
            {[1, 2, 3, 4].map((n) => (
              <Button 
                key={n} 
                variant={currentStage === n ? "default" : "ghost"} 
                onClick={() => setCurrentStage(n)}
                className="transition-all duration-300 hover:scale-105"
              >
                Stage {n}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto animate-in fade-in duration-500">
          <div className="px-4 py-6">
            {currentStage === 1 && (
              <div className="animate-in fade-in duration-300">
                <Stage1
                  video={project.videos[selectedVideoIdx]}
                  onChange={handleVideoChange}
                  onGenerateShots={() => setCurrentStage(2)}
                />
              </div>
            )}
            {currentStage === 2 && (
              <div className="animate-in fade-in duration-300">
                <Stage2
                  video={project.videos[selectedVideoIdx]}
                  onChange={(updatedVideo: Video) => {
                    const updatedVideos = [...project.videos]
                    updatedVideos[selectedVideoIdx] = updatedVideo
                    onProjectChange({ ...project, videos: updatedVideos })
                  }}
                  onGenerateImages={() => setCurrentStage(3)}
                />
              </div>
            )}
            {currentStage === 3 && (
              <div className="animate-in fade-in duration-300">
                <Stage3
                  video={project.videos[selectedVideoIdx]}
                  onChange={handleVideoChange}
                  onGenerateImages={() => {}}
                />
              </div>
            )}
            {currentStage === 4 && (
              <div className="animate-in fade-in duration-300">
                <Stage4
                  video={project.videos[selectedVideoIdx]}
                  onChange={handleVideoChange}
                  onGenerateVideoPrompts={() => {}}
                  onGenerateVideos={() => {}}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen flex flex-col animate-in fade-in duration-300">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b transition-all duration-300">
        <div className="flex items-center justify-between py-4 px-4">
          <DialogTitle className="transition-colors duration-200">
            Basic Project Details
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                onSave(project)
                onClose()
              }}
              className="transition-all duration-200 hover:scale-105 hover:bg-accent"
            >
              Save
            </Button>
            <Button 
              onClick={() => onClose()}
              className="transition-all duration-200 hover:scale-105"
            >
              Close
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto animate-in fade-in duration-500">
        <div className="px-6 py-6">
          {/* Project Details */}
          <div className="mb-8 pb-6 border-b transition-all duration-300 hover:border-primary/30">
            <h3 className="text-lg font-semibold mb-4 transition-colors duration-200">Project Details</h3>
            <div className="space-y-4">
              <div className="transition-all duration-200 hover:bg-accent/30 p-3 rounded-lg">
                <Label className="text-sm font-medium transition-colors duration-200">Project Name</Label>
                <Input
                  value={project.name}
                  onChange={(e) =>
                    onProjectChange({ ...project, name: e.target.value })
                  }
                  className="mt-2 transition-all duration-200 focus:ring-2 focus:ring-primary hover:border-primary/50"
                />
              </div>

              <div className="transition-all duration-200 hover:bg-accent/30 p-3 rounded-lg">
                <Label className="text-sm font-medium transition-colors duration-200">Project Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) =>
                    onProjectChange({ ...project, description: e.target.value })
                  }
                  className="mt-2 transition-all duration-200 focus:ring-2 focus:ring-primary hover:border-primary/50"
                />
              </div>

              <div className="transition-all duration-200 hover:bg-accent/30 p-3 rounded-lg">
                <Label className="text-sm font-medium transition-colors duration-200">Project Type</Label>
                <select
                  value={project.type}
                  onChange={(e) =>
                    onProjectChange({ ...project, type: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 mt-2 text-sm bg-background transition-all duration-200 focus:ring-2 focus:ring-primary hover:border-primary/50"
                >
                  <option>Kitchen Appliance Commercial</option>
                  <option>Real Estate Marketing</option>
                  <option>Product Marketing</option>
                  <option>Social Media Ads</option>
                </select>
              </div>
            </div>
          </div>

          {/* Project Videos List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold transition-colors duration-200">Project Videos List</h3>
              <Button 
                size="sm" 
                onClick={handleCreateVideo}
                className="transition-all duration-200 hover:scale-105"
              >
                Create New Video
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/50">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium transition-colors duration-200">Video ID</th>
                    <th className="text-left px-4 py-3 font-medium transition-colors duration-200">Video Name</th>
                    <th className="text-left px-4 py-3 font-medium transition-colors duration-200">Video Description</th>
                    <th className="text-left px-4 py-3 font-medium transition-colors duration-200">Action</th>
                    <th className="text-left px-4 py-3 font-medium transition-colors duration-200">Created</th>
                    <th className="text-left px-4 py-3 font-medium transition-colors duration-200">Modified</th>
                  </tr>
                </thead>
                <tbody>
                  {project.videos.length === 0 ? (
                    <tr className="animate-in fade-in duration-300">
                      <td colSpan={6} className="text-center py-8 text-muted-foreground transition-colors duration-200">
                        No videos yet. Create one to get started.
                      </td>
                    </tr>
                  ) : (
                    project.videos.map((video, idx) => (
                      <tr 
                        key={video.id} 
                        className="border-b last:border-b-0 transition-all duration-200 hover:bg-accent/30"
                      >
                        <td className="px-4 py-3 text-xs font-mono text-amber-600 transition-colors duration-200">
                          {video.id}
                        </td>
                        <td className="px-4 py-3 transition-colors duration-200">
                          {video.name}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground transition-colors duration-200">
                          {video.description || "-"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditVideo(idx)}
                              className="transition-all duration-200 hover:scale-110 hover:bg-primary/10 hover:text-primary"
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDuplicateVideo(idx)}
                              className="transition-all duration-200 hover:scale-110 hover:bg-blue-500/10 hover:text-blue-500"
                            >
                              Duplicate
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteVideo(idx)}
                              className="transition-all duration-200 hover:scale-110 hover:bg-destructive/10 hover:text-destructive"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground transition-colors duration-200">
                          {new Intl.DateTimeFormat("en-GB").format(
                            new Date(video.created)
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground transition-colors duration-200">
                          {new Intl.DateTimeFormat("en-GB").format(
                            new Date(video.modified)
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}