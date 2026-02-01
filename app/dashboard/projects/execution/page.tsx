"use client"

import { useState } from "react"
import ProjectExecutionWorkflow from "@/components/projects/ProjectExecutionWorkflow"
import { Video } from "@/components/projects/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Copy, PauseCircle, PlayCircle, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

const mockVideos: Video[] = [
  {
    id: "VID-001",
    name: "KitchenAid Mixer - Product Shot",
    description: "30-second commercial showcasing mixer features",
    stage1: {
      numShots: 3,
      durationPerShot: 10,
      contentPrompt: "Professional kitchen appliance demonstration",
      productImages: [],
      referenceImages: [],
      imageParameters: [],
    },
    stage2: {
      shots: [
        {
          number: 1,
          description: "Hero shot of mixer on kitchen counter",
          imagePrompt: "Professional KitchenAid mixer on modern kitchen counter, bright lighting, 4k",
          parameters: [],
          status: "pending",
        },
        {
          number: 2,
          description: "Close-up of mixing bowl with dough",
          imagePrompt: "KitchenAid mixer with stainless steel bowl mixing dough, detailed shot",
          parameters: [],
          status: "pending",
        },
        {
          number: 3,
          description: "Final product on wooden table",
          imagePrompt: "Fresh baked bread from KitchenAid mixer on wooden cutting board",
          parameters: [],
          status: "pending",
        },
      ],
      comments: [],
    },
    stage3: {
      generatedImages: [
        {
          shotNumber: 1,
          url: "https://source.unsplash.com/800x600?kitchen,mixer",
        },
        {
          shotNumber: 2,
          url: "https://source.unsplash.com/800x600?bowl,dough",
        },
      ],
    },
    stage4: {
      videoPrompts: [],
      generatedVideos: [],
    },
    stage5: {
      editedVideos: [],
      finalVideo: null,
    },
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  },
  {
    id: "VID-002",
    name: "Real Estate Tour - 3D Walkthrough",
    description: "Virtual tour for luxury property",
    stage1: {
      numShots: 5,
      durationPerShot: 8,
      contentPrompt: "Luxury home virtual tour",
      productImages: [],
      referenceImages: [],
      imageParameters: [],
    },
    stage2: {
      shots: [],
      comments: [],
    },
    stage3: {
      generatedImages: [],
    },
    stage4: {
      videoPrompts: [],
      generatedVideos: [],
    },
    stage5: {
      editedVideos: [],
      finalVideo: null,
    },
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  },
  {
    id: "VID-003",
    name: "Product Launch 2026 - Unboxing",
    description: "Product unboxing and first look",
    stage1: {
      numShots: 4,
      durationPerShot: 12,
      contentPrompt: "Exciting product unboxing experience",
      productImages: [],
      referenceImages: [],
      imageParameters: [],
    },
    stage2: {
      shots: [],
      comments: [],
    },
    stage3: {
      generatedImages: [],
    },
    stage4: {
      videoPrompts: [],
      generatedVideos: [],
    },
    stage5: {
      editedVideos: [],
      finalVideo: null,
    },
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  },
]

export default function ProjectExecutionPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(mockVideos[0])
  const [videos, setVideos] = useState<Video[]>(mockVideos)
  const [viewMode, setViewMode] = useState<'list' | 'workflow'>('list')

  const handleEdit = (video: Video) => {
    setSelectedVideo(video)
    setViewMode('workflow')
    toast.info(`Editing ${video.name}`)
  }

  const handleDuplicate = (video: Video) => {
    const newVideo = {
      ...video,
      id: `VID-${String(videos.length + 1).padStart(3, '0')}`,
      name: `${video.name} (Copy)`,
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    }
    setVideos([...videos, newVideo])
    toast.success(`Duplicated ${video.name}`)
  }



  const handleDelete = (videoId: string) => {
    const video = videos.find(v => v.id === videoId)
    if (confirm(`Are you sure you want to delete "${video?.name}"?`)) {
      setVideos(videos.filter(v => v.id !== videoId))
      if (selectedVideo?.id === videoId) {
        setSelectedVideo(videos.length > 1 ? videos[0] : null)
      }
      toast.success(`Deleted ${video?.name}`)
    }
  }

  const handleSave = (updatedVideo: Video) => {
    setVideos(videos.map(video => 
      video.id === updatedVideo.id ? updatedVideo : video
    ))
    setSelectedVideo(updatedVideo)
    toast.success("Video saved successfully")
  }

  const handleBackToList = () => {
    setViewMode('list')
    setSelectedVideo(null)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      {viewMode === 'list' ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-3xl font-bold">Project Execution</h1>
              <p className="text-muted-foreground">Manage and execute your video projects</p>
            </motion.div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button onClick={() => handleEdit(videos[0])}>
                Create New Project
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-start">
                      <CardTitle className="text-lg">{video.name}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">{video.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created:</span>
                        <span>{new Date(video.created).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Stages:</span>
                        <span>Stage {video.stage3?.generatedImages?.length ? '3' : video.stage2?.shots?.length ? '2' : '1'}/4</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleEdit(video)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleDuplicate(video)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </Button>
                      </motion.div>
                      

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(video.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ) : selectedVideo ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="outline"
                onClick={handleBackToList}
                className="mb-4"
              >
                ← Back to Projects
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold">Editing: {selectedVideo.name}</h2>
              <p className="text-muted-foreground">{selectedVideo.description}</p>
            </motion.div>
          </div>

          <ProjectExecutionWorkflow
            video={selectedVideo}
            onSave={handleSave}
            onDelete={() => {
              handleDelete(selectedVideo.id)
              handleBackToList()
            }}
          />
        </motion.div>
      ) : null}
    </motion.div>
  )
}