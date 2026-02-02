"use client"

import React, { useState } from "react"
import { Video } from "@/components/projects/types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, MessageSquare, Upload, FileImage, Settings, Hash, Clock } from "lucide-react"

type Props = {
  video: Video;
  projectType?: any;
  onChange: (patch: Partial<Video>) => void;
  onGenerateShots: () => void;
};

export default function Stage1({ video, projectType, onChange, onGenerateShots }: Props) {
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const [comment, setComment] = useState("")

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, which: "product" | "ref") {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files).slice(0, 10).map((f) => URL.createObjectURL(f));
    if (which === "product") {
      onChange({ stage1: { ...video.stage1, productImages: urls } });
    } else {
      onChange({ stage1: { ...video.stage1, referenceImages: urls } });
    }
  }

  function setParam(index: number, key: string, value: any) {
    const updated = [...video.stage1.imageParameters];
    updated[index] = { ...updated[index], [key]: value };
    onChange({ stage1: { ...video.stage1, imageParameters: updated } });
  }

  const handleAddComment = () => {
    if (!comment.trim()) return
    setComment("")
    setIsCommentOpen(false)
  }

  const handleGenerateShots = () => {
    // Call the parent function to navigate to Stage2
    onGenerateShots();
  }

  const handleModifyContent = () => {
    // Also navigate to Stage2 for modification
    onGenerateShots();
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Title */}
      <div className="pb-4 border-b">
        <h2 className="text-2xl font-bold">Stage 1 - New/Modify Video</h2>
        <p className="text-sm text-muted-foreground mt-1">Define and configure your video specifications</p>
      </div>

      {/* Video Details Card */}
      <Card className="transition-all duration-300 hover:border-primary/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Video Details</CardTitle>
              <CardDescription>Define your video specifications and parameters</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Video Name */}
          <div className="space-y-2 transition-all duration-200 hover:bg-accent/30 p-3 rounded-lg">
            <Label className="text-sm font-medium flex items-center gap-2 transition-colors duration-200">
              <span>Video Name</span>
            </Label>
            <Input 
              placeholder="Enter video name"
              value={video.name} 
              onChange={(e) => onChange({ name: e.target.value })}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary hover:border-primary/50"
            />
          </div>

          {/* Video Description */}
          <div className="space-y-2 transition-all duration-200 hover:bg-accent/30 p-3 rounded-lg">
            <Label className="text-sm font-medium flex items-center gap-2 transition-colors duration-200">
              <span>Video Description</span>
            </Label>
            <Textarea 
              placeholder="Describe your video purpose and content"
              value={video.description}
              onChange={(e) => onChange({ description: e.target.value })}
              className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary hover:border-primary/50"
            />
          </div>

          {/* Number of Shots and Duration - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Number of Shots */}
            <div className="space-y-2 transition-all duration-200 hover:bg-accent/30 p-3 rounded-lg">
              <Label className="text-sm font-medium flex items-center gap-2 transition-colors duration-200">
                <Hash className="h-4 w-4" />
                <span>Number of Shots for Storyboard</span>
              </Label>
              <div className="flex items-center gap-3">
                <Input 
                  type="number" 
                  min="1"
                  max="20"
                  value={video.stage1.numShots} 
                  onChange={(e) => onChange({ stage1: { ...video.stage1, numShots: Math.max(1, Number(e.target.value)) } })}
                  className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary hover:border-primary/50"
                />
                <span className="text-sm text-muted-foreground whitespace-nowrap">shots</span>
              </div>
            </div>

            {/* Video Duration per shot */}
            <div className="space-y-2 transition-all duration-200 hover:bg-accent/30 p-3 rounded-lg">
              <Label className="text-sm font-medium flex items-center gap-2 transition-colors duration-200">
                <Clock className="h-4 w-4" />
                <span>Video Duration per shot</span>
              </Label>
              <div className="flex items-center gap-3">
                <Input 
                  type="number" 
                  min="0.5"
                  step="0.5"
                  value={video.stage1.durationPerShot} 
                  onChange={(e) => onChange({ stage1: { ...video.stage1, durationPerShot: Number(e.target.value) } })}
                  className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary hover:border-primary/50"
                />
                <span className="text-sm text-muted-foreground whitespace-nowrap">seconds</span>
              </div>
            </div>
          </div>

          {/* Content Creation Prompt */}
          <div className="space-y-2 transition-all duration-200 hover:bg-accent/30 p-3 rounded-lg">
            <Label className="text-sm font-medium transition-colors duration-200">
              Content Creation Prompt - Auto populated from Project Type (Editable)
            </Label>
            <Textarea 
              placeholder="Auto-populated content prompt based on project type. You can edit this as needed."
              className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-primary hover:border-primary/50"
              value={video.stage1.contentPrompt} 
              onChange={(e) => onChange({ stage1: { ...video.stage1, contentPrompt: e.target.value } })} 
            />
            <p className="text-xs text-muted-foreground mt-1">
              This prompt guides the AI in generating appropriate shot descriptions. Edit to refine the content direction.
            </p>
          </div>

          {/* Upload Product Images and Reference Images - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Upload Product Images */}
            <div className="space-y-2 transition-all duration-200 hover:bg-accent/30 p-3 rounded-lg border">
              <Label className="text-sm font-medium flex items-center gap-2 transition-colors duration-200">
                <FileImage className="h-4 w-4" />
                <span>Upload Product images (if relevant)</span>
              </Label>
              <div className="mt-2">
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={(e) => handleFileChange(e, "product")}
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all duration-200"
                />
                {video.stage1.productImages.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium mb-2">{video.stage1.productImages.length} product image(s) uploaded</p>
                    <div className="grid grid-cols-2 gap-2">
                      {video.stage1.productImages.map((u, i) => (
                        <div key={i} className="relative group transition-all duration-200 hover:scale-105">
                          <img src={u} alt={`product-${i}`} className="w-full h-16 object-cover rounded border" />
                          <button
                            onClick={() => {
                              const updated = video.stage1.productImages.filter((_, idx) => idx !== i);
                              onChange({ stage1: { ...video.stage1, productImages: updated } });
                            }}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded text-white text-xs transition-all duration-200"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Reference Images - FIXED */}
            <div className="space-y-2 transition-all duration-200 hover:bg-accent/30 p-3 rounded-lg border">
              <Label className="text-sm font-medium flex items-center gap-2 transition-colors duration-200">
                <FileImage className="h-4 w-4" />
                <span>Upload Reference images</span>
              </Label>
              <div className="mt-2">
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={(e) => handleFileChange(e, "ref")}
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all duration-200"
                />
                {video.stage1.referenceImages.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium mb-2">{video.stage1.referenceImages.length} reference image(s) uploaded</p>
                    <div className="grid grid-cols-2 gap-2">
                      {video.stage1.referenceImages.map((u, i) => (
                        <div key={i} className="relative group transition-all duration-200 hover:scale-105">
                          <img src={u} alt={`reference-${i}`} className="w-full h-16 object-cover rounded border" />
                          <button
                            onClick={() => {
                              const updated = video.stage1.referenceImages.filter((_, idx) => idx !== i);
                              onChange({ stage1: { ...video.stage1, referenceImages: updated } });
                            }}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded text-white text-xs transition-all duration-200"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Image Parameters - Tabular Format */}
          <div className="space-y-2 transition-all duration-200 hover:bg-accent/30 p-3 rounded-lg border">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium transition-colors duration-200">
                Image Parameters - Tabular Format Auto populated from Project Type (Editable)
              </Label>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onChange({ stage1: { ...video.stage1, imageParameters: [...video.stage1.imageParameters, { key: "newParam", type: "text", value: "", options: [] }] } })}
                className="transition-all duration-200 hover:scale-105 hover:border-primary"
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Parameter
              </Button>
            </div>

            {video.stage1.imageParameters.length === 0 ? (
              <Alert className="transition-all duration-200">
                <AlertDescription>No custom parameters added yet. Add parameters to control AI image generation.</AlertDescription>
              </Alert>
            ) : (
              <div className="border rounded-lg overflow-hidden transition-all duration-300">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left p-3 font-medium">Parameter Name</th>
                      <th className="text-left p-3 font-medium">Type</th>
                      <th className="text-left p-3 font-medium">Value</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {video.stage1.imageParameters.map((p, idx) => (
                      <tr key={idx} className="border-b last:border-b-0 transition-all duration-200 hover:bg-accent/30">
                        <td className="p-3">
                          <Input 
                            value={p.key}
                            onChange={(e) => setParam(idx, "key", e.target.value)}
                            placeholder="e.g., Lighting Style"
                            className="text-sm transition-all duration-200 focus:ring-1 focus:ring-primary"
                          />
                        </td>
                        <td className="p-3">
                          <select 
                            value={p.type}
                            onChange={(e) => setParam(idx, "type", e.target.value)}
                            className="w-full border rounded px-2 py-1 text-sm bg-background transition-all duration-200 focus:ring-1 focus:ring-primary"
                          >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="dropdown">Dropdown</option>
                          </select>
                        </td>
                        <td className="p-3">
                          {p.type === "dropdown" ? (
                            <select 
                              value={p.value} 
                              onChange={(e) => setParam(idx, "value", e.target.value)} 
                              className="w-full border rounded px-2 py-1 text-sm bg-background transition-all duration-200 focus:ring-1 focus:ring-primary"
                            >
                              {p.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                            </select>
                          ) : (
                            <Input 
                              value={p.value} 
                              onChange={(e) => setParam(idx, "value", e.target.value)} 
                              placeholder="Value" 
                              className="text-sm transition-all duration-200 focus:ring-1 focus:ring-primary"
                            />
                          )}
                        </td>
                        <td className="p-3">
                          <Button 
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              const updated = video.stage1.imageParameters.filter((_, i) => i !== idx);
                              onChange({ stage1: { ...video.stage1, imageParameters: updated } });
                            }}
                            className="text-red-600 hover:bg-red-50 transition-all duration-200 hover:scale-110"
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end pt-4 border-t transition-all duration-300">
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={handleModifyContent}
            disabled={!video.name || !video.stage1.contentPrompt || video.stage1.numShots < 1}
            className="transition-all duration-200 hover:scale-105 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Modify Storyboard Content
          </Button>
          <Button 
            onClick={handleGenerateShots}
            disabled={!video.name || !video.stage1.contentPrompt || video.stage1.numShots < 1}
            className="transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate New Storyboard Content
          </Button>
        </div>
      </div>
    </div>
  );
}