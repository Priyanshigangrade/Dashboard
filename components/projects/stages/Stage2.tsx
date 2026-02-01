import React, { useState } from "react"
import { Video, Shot } from "../types"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, MessageSquare, Upload, Edit, Trash2, Eye, Settings, X, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

type Props = {
  video: Video
  onChange: (video: Video) => void
  onGenerateImages: () => void
}

type ShotParameter = {
  key: string
  value: string
  type: string
  options?: string[]
}

export default function Stage2({ video, onChange, onGenerateImages }: Props) {
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const [comment, setComment] = useState("")
  const [editingParams, setEditingParams] = useState<number | null>(null)
  const [shotParameters, setShotParameters] = useState<Record<number, ShotParameter[]>>({})
  const [newParamKey, setNewParamKey] = useState("")
  const [newParamValue, setNewParamValue] = useState("")
  const [newParamType, setNewParamType] = useState("text")

  const shots = video.stage2.shots || []
  const expected = video.stage1.numShots || 0
  const rows = Array.from({ length: expected }).map((_, i) => 
    shots[i] || { 
      number: i + 1, 
      description: "", 
      imagePrompt: "", 
      status: "pending", 
      generatedImageUrl: "",
      parameters: shotParameters[i] || []
    }
  )

  function updateShot(index: number, patch: Partial<Shot>) {
    const next = shots.map((s, i) =>
      i === index ? { ...s, ...patch } : s
    )
    onChange({ ...video, stage2: { ...video.stage2, shots: next } })
  }

  function deleteShot(index: number) {
    if (!confirm("Delete this shot?")) return
    const next = shots.filter((_, i) => i !== index)
    onChange({ ...video, stage2: { ...video.stage2, shots: next } })
  }

  function manualUploadShot(index: number, file: File) {
    const url = URL.createObjectURL(file)
    const next = shots.map((s, i) =>
      i === index ? { ...s, status: "uploaded" as const, generatedImageUrl: url } : s
    )
    onChange({ ...video, stage2: { ...video.stage2, shots: next } })
  }

  function handleAddParam(shotIndex: number) {
    if (!newParamKey.trim()) return
    
    const updatedParams = [
      ...(shotParameters[shotIndex] || []),
      { key: newParamKey, value: newParamValue, type: newParamType }
    ]
    
    setShotParameters(prev => ({ ...prev, [shotIndex]: updatedParams }))
    setNewParamKey("")
    setNewParamValue("")
    setNewParamType("text")
  }

  function handleDeleteParam(shotIndex: number, paramIndex: number) {
    const updatedParams = (shotParameters[shotIndex] || []).filter((_, i) => i !== paramIndex)
    setShotParameters(prev => ({ ...prev, [shotIndex]: updatedParams }))
  }

  function handleUpdateParam(shotIndex: number, paramIndex: number, key: string, value: string) {
    const updatedParams = (shotParameters[shotIndex] || []).map((param, i) =>
      i === paramIndex ? { ...param, [key]: value } : param
    )
    setShotParameters(prev => ({ ...prev, [shotIndex]: updatedParams }))
  }

  const handleAddComment = () => {
    if (!comment.trim()) return
    setComment("")
    setIsCommentOpen(false)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Title */}
      <div className="pb-4 border-b">
        <h2 className="text-2xl font-bold">Stage 2 - Storyboard Content Review & Modification</h2>
        <p className="text-sm text-muted-foreground mt-1">Review and modify AI-generated shot descriptions</p>
      </div>

    

      

      {/* Storyboard Shots Table */}
      <Card className="transition-all duration-300 hover:border-primary/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Storyboard Shots</CardTitle>
              <CardDescription>Review and modify {expected} shots for your video</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden transition-all duration-300">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium">Shot Number</th>
                  <th className="text-left p-4 font-medium">Shot Description</th>
                  <th className="text-left p-4 font-medium">Shot Image Prompt</th>
                  <th className="text-left p-4 font-medium">Shot Image Parameters</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((shot, index) => (
                  <tr key={index} className="border-b last:border-b-0 transition-all duration-200 hover:bg-accent/30">
                    {/* Shot Number */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-bold text-primary">{shot.number}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Duration: {video.stage1.durationPerShot}s
                          
                        </div>
                      </div>
                    </td>

                    {/* Shot Description */}
                    <td className="p-4">
                      <Textarea
                        placeholder="Describe this shot..."
                        className="min-h-[100px] w-full text-sm transition-all duration-200 focus:ring-1 focus:ring-primary hover:border-primary/50"
                        value={shot.description}
                        onChange={(e) => updateShot(index, { description: e.target.value })}
                      />
                    </td>

                    {/* Shot Image Prompt */}
                    <td className="p-4">
                      <Textarea
                        placeholder="AI image generation prompt..."
                        className="min-h-[100px] w-full text-sm transition-all duration-200 focus:ring-1 focus:ring-primary hover:border-primary/50"
                        value={shot.imagePrompt}
                        onChange={(e) => updateShot(index, { imagePrompt: e.target.value })}
                      />
                    </td>

                    {/* Shot Image Parameters */}
                    <td className="p-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {(shotParameters[index] || []).map((param, paramIndex) => (
                            <Badge key={paramIndex} variant="outline" className="transition-all duration-200 hover:scale-105">
                              {param.key}: {param.value}
                              <button
                                onClick={() => handleDeleteParam(index, paramIndex)}
                                className="ml-1 hover:text-destructive transition-colors duration-200"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingParams(index)}
                          className="transition-all duration-200 hover:scale-105 hover:bg-primary/10 hover:text-primary"
                        >
                          <Settings className="h-3.5 w-3.5 mr-2" />
                          Edit Parameters
                        </Button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <Label className="text-xs font-medium text-muted-foreground">Don't Generate + Upload Shot</Label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files && manualUploadShot(index, e.target.files[0])}
                            className="block w-full text-xs text-muted-foreground file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all duration-200"
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 transition-all duration-200 hover:scale-105 hover:border-primary hover:bg-primary/10"
                          >
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteShot(index)}
                            className="transition-all duration-200 hover:scale-105 hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Generate Action */}
      <div className="flex justify-end pt-4 border-t transition-all duration-300">
        <Button 
          onClick={onGenerateImages}
          size="lg"
          className="transition-all duration-200 hover:scale-105"
        >
          Generate Image Shots
        </Button>
      </div>

      {/* Edit Parameters Dialog */}
      <Dialog open={editingParams !== null} onOpenChange={(open) => !open && setEditingParams(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Shot Parameters</DialogTitle>
            <DialogDescription>
              Add or modify parameters for Shot {editingParams !== null ? rows[editingParams]?.number : ''}
            </DialogDescription>
          </DialogHeader>
          
          {editingParams !== null && (
            <div className="space-y-4">
              {/* Existing Parameters */}
              <div className="space-y-2">
                <h4 className="font-medium">Current Parameters</h4>
                {(shotParameters[editingParams] || []).length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">No parameters added yet</p>
                ) : (
                  <div className="space-y-2">
                    {(shotParameters[editingParams] || []).map((param, paramIndex) => (
                      <div key={paramIndex} className="flex items-center gap-2 p-2 border rounded">
                        <Input
                          value={param.key}
                          onChange={(e) => handleUpdateParam(editingParams, paramIndex, 'key', e.target.value)}
                          className="flex-1 text-sm"
                          placeholder="Parameter name"
                        />
                        <Input
                          value={param.value}
                          onChange={(e) => handleUpdateParam(editingParams, paramIndex, 'value', e.target.value)}
                          className="flex-1 text-sm"
                          placeholder="Value"
                        />
                        <select
                          value={param.type}
                          onChange={(e) => handleUpdateParam(editingParams, paramIndex, 'type', e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option value="text">Text</option>
                          <option value="number">Number</option>
                          <option value="dropdown">Dropdown</option>
                        </select>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteParam(editingParams, paramIndex)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add New Parameter */}
              <div className="space-y-2 border-t pt-4">
                <h4 className="font-medium">Add New Parameter</h4>
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    placeholder="Key"
                    value={newParamKey}
                    onChange={(e) => setNewParamKey(e.target.value)}
                    className="text-sm"
                  />
                  <Input
                    placeholder="Value"
                    value={newParamValue}
                    onChange={(e) => setNewParamValue(e.target.value)}
                    className="text-sm"
                  />
                  <select
                    value={newParamType}
                    onChange={(e) => setNewParamType(e.target.value)}
                    className="border rounded px-2 py-2 text-sm"
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="dropdown">Dropdown</option>
                  </select>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleAddParam(editingParams)}
                  disabled={!newParamKey.trim()}
                  className="transition-all duration-200 hover:scale-105"
                >
                  <Plus className="h-3.5 w-3.5 mr-2" />
                  Add Parameter
                </Button>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setEditingParams(null)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}