"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { 
  Play, Download, Trash2, Eye, Settings, Grid3x3, 
  Image as ImageIcon, Video as VideoIcon, ZoomIn, 
  Edit, Film, CheckCircle, Upload, Layers, Scissors,
  Sparkles, Settings2, Globe, Volume2, ArrowLeft
} from "lucide-react"
import { Video, Shot } from "./types"
import Stage1 from "./stages/Stage1"
import Stage2 from "./stages/Stage2"
import Stage3 from "./stages/Stage3"
import Stage4 from "./stages/Stage4"

interface ProjectExecutionWorkflowProps {
  video: Video
  onSave?: (video: Video) => void
  onDelete?: () => void
}

export default function ProjectExecutionWorkflow({
  video: initialVideo,
  onSave,
  onDelete,
}: ProjectExecutionWorkflowProps) {
  const [video, setVideo] = useState<Video>(initialVideo)
  const [selectedShot, setSelectedShot] = useState<Shot | null>(
    video.stage2.shots[0] || null
  )
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [exportQuality, setExportQuality] = useState('1080p')
  const [editingVideo, setEditingVideo] = useState<{shotNumber: number, url: string} | null>(null)

  const handleShotUpdate = (shot: Shot) => {
    const updated = {
      ...video,
      stage2: {
        ...video.stage2,
        shots: video.stage2.shots.map((s) => (s.number === shot.number ? shot : s)),
      },
    }
    setVideo(updated)
    setSelectedShot(shot)
  }

  const handleVideoUpdate = (updatedVideo: Video) => {
    setVideo(updatedVideo)
  }

  const handleStageChange = (patch: Partial<Video>) => {
    const updated = { ...video, ...patch, modified: new Date().toISOString() }
    setVideo(updated)
  }

  const handleMetadataUpdate = (key: keyof Video, value: any) => {
    const updated = { ...video, [key]: value, modified: new Date().toISOString() }
    setVideo(updated)
  }

  const handleGenerateShot = (shotNumber: number) => {
    const shot = video.stage2.shots.find((s) => s.number === shotNumber)
    if (!shot) return
    const updated = {
      ...shot,
      status: "generated" as const,
      generatedImageUrl: `https://source.unsplash.com/800x600/?${shot.imagePrompt?.replace(/ /g, '-') || 'ai'}-${Date.now()}`,
    }
    handleShotUpdate(updated)
  }

  const handleGenerateVideo = (shotNumber: number) => {
    const generatedVideos = [...video.stage4.generatedVideos]
    const index = generatedVideos.findIndex((v) => v.shotNumber === shotNumber)
    const newVideo = {
      shotNumber,
      url: `https://video.example.com/${video.id}-${shotNumber}-${Date.now()}.mp4`,
      generatedAt: new Date().toISOString()
    }
    if (index >= 0) {
      generatedVideos[index] = newVideo
    } else {
      generatedVideos.push(newVideo)
    }
    const updated = {
      ...video,
      stage4: { ...video.stage4, generatedVideos },
      modified: new Date().toISOString()
    }
    setVideo(updated)
  }

  const handleEditVideo = (shotNumber: number) => {
    const generatedVideo = video.stage4.generatedVideos.find(v => v.shotNumber === shotNumber)
    if (generatedVideo) {
      setEditingVideo(generatedVideo)
      setCurrentStage(4) // Edit stage
    }
  }

  const handleSaveEdit = () => {
    if (!editingVideo) return
    
    const editedVideos = [...video.stage5.editedVideos]
    const existingIndex = editedVideos.findIndex(v => v.shotNumber === editingVideo.shotNumber)
    
    const editedVideo = {
      ...editingVideo,
      editedAt: new Date().toISOString(),
      edits: ["Color corrected", "Audio enhanced", "Transitions added"]
    }
    
    if (existingIndex >= 0) {
      editedVideos[existingIndex] = editedVideo
    } else {
      editedVideos.push(editedVideo)
    }
    
    const updated = {
      ...video,
      stage5: { ...video.stage5, editedVideos },
      modified: new Date().toISOString()
    }
    setVideo(updated)
    setEditingVideo(null)
  }

  const handleGenerateFinalVideo = () => {
    if (video.stage5.editedVideos.length === 0) {
      alert("Please edit at least one video first")
      return
    }
    
    const finalVideo = {
      url: `https://video.example.com/${video.id}-final-${Date.now()}.mp4`,
      generatedAt: new Date().toISOString(),
      quality: exportQuality,
      duration: video.stage5.editedVideos.length * 3, // 3 seconds per shot
      shotsIncluded: video.stage5.editedVideos.map(v => v.shotNumber)
    }
    
    const updated = {
      ...video,
      stage5: { ...video.stage5, finalVideo },
      modified: new Date().toISOString()
    }
    setVideo(updated)
  }

  const calculateStageProgress = () => {
    const totalStages = 5
    let completed = 0
    
    if (video.stage1.contentPrompt) completed++
    if (video.stage2.shots.length > 0) completed++
    if (video.stage3.generatedImages.length > 0) completed++
    if (video.stage4.generatedVideos.length > 0) completed++
    if (video.stage5.finalVideo) completed++
    
    return (completed / totalStages) * 100
  }

  const handleSaveChanges = () => {
    onSave?.(video)
  }

  // Stage-specific navigation
  const renderStageNavigation = () => {
    return (
      <div className="flex items-center gap-2 mb-4">
        {currentStage > 1 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentStage((currentStage - 1) as any)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Stage {currentStage - 1}
          </Button>
        )}
        <div className="flex-1 text-center">
          <Badge variant="outline" className="text-lg px-4 py-1">
            Stage {currentStage}
          </Badge>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header with Progress */}
      <div className="border-b px-6 py-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-slate-800">{video.name}</h1>
            <p className="text-sm text-slate-600 mt-1">{video.description}</p>
            
            {/* Progress Bar */}
            <div className="mt-3 max-w-md">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500">Project Progress</span>
                <span className="text-xs font-medium text-slate-700">
                  {Math.round(calculateStageProgress())}%
                </span>
              </div>
              <Progress value={calculateStageProgress()} className="h-2" />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>S1: Script</span>
                <span>S2: Storyboard</span>
                <span>S3: Images</span>
                <span>S4: Videos</span>
                <span>S5: Final</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant={video.stage5.finalVideo ? "default" : "secondary"}>
              {video.stage5.finalVideo ? "Ready" : "In Progress"}
            </Badge>
            <Button 
              onClick={handleSaveChanges} 
              variant="default"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden p-6">
        {renderStageNavigation()}
        
        {/* Stage 1: Script/Content */}
        {currentStage === 1 && (
          <div className="h-full">
            <Stage1
              video={video}
              onChange={handleStageChange}
              onGenerateShots={() => setCurrentStage(2)}
            />
          </div>
        )}

        {/* Stage 2: Storyboard */}
        {currentStage === 2 && (
          <div className="h-full">
            <Stage2
              video={video}
              onChange={handleStageChange}
              onGenerateImages={() => setCurrentStage(3)}
            />
          </div>
        )}

        {/* Stage 3: Images */}
        {currentStage === 3 && (
          <div className="h-full">
            <Stage3
              video={video}
              onChange={handleStageChange}
              onGenerateImages={() => setCurrentStage(4)}
            />
          </div>
        )}

        {/* Stage 4: Videos & Editing */}
        {currentStage === 4 && (
          <div className="h-full overflow-auto">
            {editingVideo ? (
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-slate-800">Editing Shot {editingVideo.shotNumber}</CardTitle>
                  <CardDescription>
                    Apply edits and enhancements to your generated video
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                      src={editingVideo.url}
                      controls
                      className="w-full h-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-700">Audio Enhancement</Label>
                      <Select defaultValue="enhanced">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="original">Original Audio</SelectItem>
                          <SelectItem value="enhanced">Enhanced Audio</SelectItem>
                          <SelectItem value="background-music">Background Music</SelectItem>
                          <SelectItem value="voiceover">Add Voiceover</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-slate-700">Color Grading</Label>
                      <Select defaultValue="cinematic">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="original">Original</SelectItem>
                          <SelectItem value="cinematic">Cinematic</SelectItem>
                          <SelectItem value="vibrant">Vibrant</SelectItem>
                          <SelectItem value="muted">Muted Tones</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-slate-700">Transitions</Label>
                      <Select defaultValue="fade">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Transition</SelectItem>
                          <SelectItem value="fade">Fade</SelectItem>
                          <SelectItem value="slide">Slide</SelectItem>
                          <SelectItem value="zoom">Zoom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-slate-700">Text Overlay</Label>
                      <Input placeholder="Add text (optional)" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch id="stabilize" />
                    <Label htmlFor="stabilize" className="text-slate-700">Stabilize Video</Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch id="subtitles" />
                    <Label htmlFor="subtitles" className="text-slate-700">Auto-generate Subtitles</Label>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={handleSaveEdit}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Save Edits
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditingVideo(null)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Video generation UI from original component */}
                {video.stage2.shots.map((shot) => {
                  const generatedVideo = video.stage4.generatedVideos.find(
                    (v) => v.shotNumber === shot.number
                  )
                  const isEdited = video.stage5.editedVideos.some(v => v.shotNumber === shot.number)
                  
                  return (
                    <Card key={shot.number} className="overflow-hidden">
                      <CardHeader className="bg-slate-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-base text-slate-800">Shot {shot.number}</CardTitle>
                            <CardDescription className="text-slate-600">{shot.description}</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant={generatedVideo ? "default" : "outline"}>
                              {generatedVideo ? "Generated" : "Pending"}
                            </Badge>
                            {isEdited && <Badge variant="secondary">Edited</Badge>}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-4">
                        {generatedVideo && (
                          <>
                            <div className="aspect-video bg-black rounded-lg overflow-hidden">
                              <video
                                src={generatedVideo.url}
                                controls
                                className="w-full h-full"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleEditVideo(shot.number)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                                disabled={!generatedVideo}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Video
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => window.open(generatedVideo.url, '_blank')}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </>
                        )}
                        {!generatedVideo && (
                          <Button
                            size="sm"
                            onClick={() => handleGenerateVideo(shot.number)}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Generate Video
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}

                {/* Final Video Generation */}
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-green-800">Final Video Assembly</CardTitle>
                    <CardDescription className="text-green-700">
                      Combine all edited videos into a final sequence
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-green-700">Export Quality</Label>
                        <Select value={exportQuality} onValueChange={setExportQuality}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="720p">720p HD</SelectItem>
                            <SelectItem value="1080p">1080p Full HD</SelectItem>
                            <SelectItem value="4k">4K Ultra HD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-green-700">Format</Label>
                        <Select defaultValue="mp4">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mp4">MP4</SelectItem>
                            <SelectItem value="mov">MOV</SelectItem>
                            <SelectItem value="webm">WebM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch id="watermark" defaultChecked />
                      <Label htmlFor="watermark" className="text-green-700">Add Watermark</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch id="optimize" defaultChecked />
                      <Label htmlFor="optimize" className="text-green-700">Optimize for Web</Label>
                    </div>
                    
                    <Button
                      onClick={handleGenerateFinalVideo}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={video.stage5.editedVideos.length === 0}
                    >
                      <Layers className="h-4 w-4 mr-2" />
                      {video.stage5.finalVideo ? "Regenerate Final Video" : "Generate Final Video"}
                    </Button>
                    
                    {video.stage5.finalVideo && (
                      <div className="mt-4 p-4 border border-green-300 rounded-lg bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-green-800">Final Video Ready</h4>
                          <Badge className="bg-green-100 text-green-800">Complete</Badge>
                        </div>
                        <p className="text-sm text-green-700 mb-2">
                          Generated: {new Date(video.stage5.finalVideo.generatedAt).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => window.open(video.stage5.finalVideo!.url, '_blank')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Final Video
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleGenerateFinalVideo()}>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Regenerate
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* Stage 5: Settings */}
        {currentStage === 5 && (
          <div className="h-full overflow-auto">
            <div className="space-y-6 max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-slate-800">Project Metadata</CardTitle>
                  <CardDescription>
                    Edit project information and settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="video-name" className="text-slate-700">Video Name</Label>
                    <Input
                      id="video-name"
                      value={video.name}
                      onChange={(e) => handleMetadataUpdate("name", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="video-description" className="text-slate-700">Description</Label>
                    <Textarea
                      id="video-description"
                      value={video.description}
                      onChange={(e) =>
                        handleMetadataUpdate("description", e.target.value)
                      }
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-slate-600">Created</Label>
                      <p className="text-sm text-slate-800 mt-1">
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(video.created))}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-slate-600">Last Modified</Label>
                      <p className="text-sm text-slate-800 mt-1">
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(video.modified))}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-800">Danger Zone</CardTitle>
                  <CardDescription className="text-red-700">Irreversible actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={deleteConfirm} onOpenChange={setDeleteConfirm}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Video Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-red-800">Delete Video Project</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-sm text-slate-600">
                          Are you sure you want to delete this video project? This action cannot be
                          undone and will delete all associated images and videos.
                        </p>
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteConfirm(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              onDelete?.()
                              setDeleteConfirm(false)
                            }}
                          >
                            Delete Project
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}