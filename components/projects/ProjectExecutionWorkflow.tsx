"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Sparkles, Settings2, Globe, Volume2
} from "lucide-react"
import { Video, Shot } from "./types"

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
  const [activeStage, setActiveStage] = useState<'shots' | 'storyboard' | 'video' | 'edit' | 'settings'>('shots')
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
      setActiveStage('edit')
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

      {/* Stage Navigation */}
      <div className="border-b bg-white">
        <Tabs 
          value={activeStage} 
          onValueChange={(v) => setActiveStage(v as any)}
          className="w-full"
        >
          <TabsList className="w-full justify-start rounded-none bg-transparent px-6 gap-1">
            <TabsTrigger value="shots" className="gap-2 data-[state=active]:bg-blue-50">
              <VideoIcon className="h-4 w-4" />
              Shots ({video.stage2.shots.length})
            </TabsTrigger>
            <TabsTrigger value="storyboard" className="gap-2 data-[state=active]:bg-blue-50">
              <Grid3x3 className="h-4 w-4" />
              Storyboard ({video.stage3.generatedImages.length})
            </TabsTrigger>
            <TabsTrigger value="video" className="gap-2 data-[state=active]:bg-blue-50">
              <Film className="h-4 w-4" />
              Videos ({video.stage4.generatedVideos.length})
            </TabsTrigger>
            <TabsTrigger value="edit" className="gap-2 data-[state=active]:bg-blue-50">
              <Scissors className="h-4 w-4" />
              Edit ({video.stage5.editedVideos.length})
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-blue-50">
              <Settings2 className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {/* Shots Tab */}
        {activeStage === 'shots' && (
          <div className="flex h-full gap-4 p-6">
            {/* Left: Shot List */}
            <div className="w-64 border rounded-lg overflow-hidden flex flex-col bg-white shadow-sm">
              <div className="border-b px-4 py-3 bg-slate-50">
                <h3 className="font-semibold text-sm text-slate-800">Shots ({video.stage2.shots.length})</h3>
              </div>
              <ScrollArea className="flex-1">
                <div className="space-y-2 p-4">
                  {video.stage2.shots.map((shot) => (
                    <div
                      key={shot.number}
                      onClick={() => setSelectedShot(shot)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedShot?.number === shot.number
                          ? "bg-blue-50 border-blue-300 shadow-sm"
                          : "hover:bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-sm text-slate-800">Shot {shot.number}</span>
                        <Badge
                          variant={
                            shot.status === "generated" ? "default" : "outline"
                          }
                          className="text-xs"
                        >
                          {shot.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {shot.description}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Center: Shot Editor */}
            <div className="flex-1 border rounded-lg overflow-hidden flex flex-col bg-white shadow-sm">
              <div className="border-b px-4 py-3 bg-slate-50">
                <h3 className="font-semibold text-sm text-slate-800">
                  {selectedShot ? `Shot ${selectedShot.number} Editor` : 'Select a Shot'}
                </h3>
              </div>
              <ScrollArea className="flex-1">
                {selectedShot ? (
                  <div className="space-y-4 p-4">
                    <div>
                      <Label className="text-sm text-slate-700">Description</Label>
                      <Textarea
                        value={selectedShot.description}
                        onChange={(e) =>
                          handleShotUpdate({
                            ...selectedShot,
                            description: e.target.value,
                          })
                        }
                        className="mt-1 resize-none"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-slate-700">Image Prompt</Label>
                      <Textarea
                        value={selectedShot.imagePrompt}
                        onChange={(e) =>
                          handleShotUpdate({
                            ...selectedShot,
                            imagePrompt: e.target.value,
                          })
                        }
                        className="mt-1 resize-none"
                        rows={3}
                        placeholder="Describe the image you want to generate..."
                      />
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleGenerateShot(selectedShot.number)}
                      disabled={!selectedShot.imagePrompt}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate AI Image
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8">
                    <VideoIcon className="h-12 w-12 mb-3 text-slate-300" />
                    <p className="text-sm">Select a shot to edit</p>
                  </div>
                )}
              </ScrollArea>
            </div>

            {/* Right: Output Table */}
            <div className="w-72 border rounded-lg overflow-hidden flex flex-col bg-white shadow-sm">
              <div className="border-b px-4 py-3 bg-slate-50">
                <h3 className="font-semibold text-sm text-slate-800">Generated Images ({video.stage3.generatedImages.length})</h3>
              </div>
              <ScrollArea className="flex-1">
                <div className="space-y-2 p-4">
                  {video.stage3.generatedImages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-slate-500">
                      <ImageIcon className="h-8 w-8 mb-2 text-slate-300" />
                      <p className="text-xs text-center">No images generated yet</p>
                    </div>
                  ) : (
                    video.stage3.generatedImages.map((img) => (
                      <div key={img.shotNumber} className="border rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
                        <div className="relative aspect-video bg-slate-100 group">
                          <img
                            src={img.url}
                            alt={`Shot ${img.shotNumber}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <Eye className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        <div className="px-2 py-2 text-xs font-medium border-t bg-slate-50 flex justify-between items-center">
                          <span>Shot {img.shotNumber}</span>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 w-6 p-0"
                            onClick={() => window.open(img.url, '_blank')}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        )}

        {/* Storyboard Tab */}
        {activeStage === 'storyboard' && (
          <div className="h-full p-6 overflow-auto">
            {video.stage3.generatedImages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <Grid3x3 className="h-16 w-16 mb-4 text-slate-300" />
                <p className="text-sm mb-2">No images to display</p>
                <p className="text-xs text-slate-400 text-center max-w-sm">
                  Generate images in the Shots tab first to create your storyboard
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-max">
                {video.stage3.generatedImages.map((img) => (
                  <Dialog key={img.shotNumber}>
                    <DialogTrigger asChild>
                      <div className="relative group cursor-pointer">
                        <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden shadow-sm">
                          <img
                            src={img.url}
                            alt={`Shot ${img.shotNumber}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center rounded-lg">
                          <ZoomIn className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-xs font-medium text-center mt-2 text-slate-700">
                          Shot {img.shotNumber}
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle className="text-slate-800">Shot {img.shotNumber} Preview</DialogTitle>
                      </DialogHeader>
                      <img 
                        src={img.url} 
                        alt={`Shot ${img.shotNumber}`} 
                        className="w-full rounded-lg shadow-lg" 
                      />
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Video Tab */}
        {activeStage === 'video' && (
          <div className="h-full overflow-auto p-6">
            {video.stage4.generatedVideos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <Film className="h-16 w-16 mb-4 text-slate-300" />
                <p className="text-sm mb-2">No videos generated yet</p>
                <p className="text-xs text-slate-400 text-center max-w-sm">
                  Generate videos from your images to create motion sequences
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              </div>
            )}
          </div>
        )}

        {/* Edit Tab */}
        {activeStage === 'edit' && (
          <div className="h-full overflow-auto p-6">
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
            ) : video.stage5.editedVideos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <Scissors className="h-16 w-16 mb-4 text-slate-300" />
                <p className="text-sm mb-2">No videos edited yet</p>
                <p className="text-xs text-slate-400 text-center max-w-sm">
                  Go to the Videos tab and click "Edit Video" on any generated video
                </p>
              </div>
            ) : (
              <div className="space-y-6 max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-slate-800">Edited Videos ({video.stage5.editedVideos.length})</CardTitle>
                    <CardDescription>
                      Preview and manage your edited video sequences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {video.stage5.editedVideos.map((editedVideo) => (
                      <div key={editedVideo.shotNumber} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-slate-800">Shot {editedVideo.shotNumber}</h4>
                            <Badge variant="outline" className="text-xs">
                              Edited
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {editedVideo.edits?.map((edit, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {edit}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-slate-500 mt-2">
                            Edited: {new Date(editedVideo.editedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setEditingVideo(editedVideo)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit Again
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => window.open(editedVideo.url, '_blank')}>
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
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

        {/* Settings Tab */}
        {activeStage === 'settings' && (
          <div className="h-full overflow-auto p-6">
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