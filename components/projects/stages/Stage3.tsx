import React, { useState, useEffect } from "react"
import { Video } from "@/components/projects/types"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Plus, 
  MessageSquare, 
  Image, 
  Download, 
  Edit, 
  Trash2, 
  RefreshCw, 
  Eye, 
  Check, 
  X,
  Save,
  ExternalLink
} from "lucide-react"

type Props = {
  video: Video;
  onChange: (patch: Partial<Video>) => void;
  onGenerateImages: () => void;
};

type GeneratedImage = {
  shotNumber: number;
  url: string;
  prompt?: string;
  parameters?: Record<string, any>;
  createdAt?: string;
};

export default function Stage3({ video, onChange, onGenerateImages }: Props) {
  const [progress, setProgress] = useState<number | null>(null);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedShots, setSelectedShots] = useState<number[]>([]);
  const [editingImage, setEditingImage] = useState<GeneratedImage | null>(null);
  const [editPrompt, setEditPrompt] = useState("");
  const [editParameters, setEditParameters] = useState<Record<string, any>>({});
  
  const images = video.stage3.generatedImages || [];

  // Simulate progress for demo
  useEffect(() => {
    if (progress !== null && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => prev !== null ? prev + 10 : 0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const handleGenerateImages = () => {
    setProgress(0);
    setTimeout(() => {
      // Simulate generating some images
      const newImages: GeneratedImage[] = [];
      for (let i = 1; i <= video.stage1.numShots; i++) {
        if (Math.random() > 0.3) { // 70% chance to generate each image
          newImages.push({
            shotNumber: i,
            url: `https://source.unsplash.com/random/800x600?sig=${i}`,
            prompt: `AI generated image for shot ${i} - ${video.stage1.contentPrompt?.substring(0, 50)}...`,
            parameters: {
              style: "photorealistic",
              lighting: "studio",
              aspectRatio: "16:9"
            },
            createdAt: new Date().toISOString()
          });
        }
      }
      onChange({ stage3: { generatedImages: newImages } });
      setProgress(null);
    }, 3000);
  };

  const handleRegenerateSelected = () => {
    if (selectedShots.length === 0) {
      alert("Please select shots to regenerate");
      return;
    }
    
    setProgress(0);
    setTimeout(() => {
      const updatedImages = [...images];
      selectedShots.forEach(shotNumber => {
        const index = updatedImages.findIndex(img => img.shotNumber === shotNumber);
        if (index !== -1) {
          updatedImages[index] = {
            ...updatedImages[index],
            url: `https://source.unsplash.com/random/800x600?sig=${shotNumber}-${Date.now()}`,
            createdAt: new Date().toISOString()
          };
        }
      });
      onChange({ stage3: { generatedImages: updatedImages } });
      setProgress(null);
      alert(`Regenerated ${selectedShots.length} shot(s)`);
    }, 2000);
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    // In a real app, you would save the comment to your backend
    console.log("Comment added:", comment);
    setComment("");
    setIsCommentOpen(false);
  };

  const toggleShotSelection = (shotNumber: number) => {
    setSelectedShots(prev => 
      prev.includes(shotNumber)
        ? prev.filter(num => num !== shotNumber)
        : [...prev, shotNumber]
    );
  };

  const selectAllShots = () => {
    const allShots = Array.from({ length: video.stage1.numShots }).map((_, i) => i + 1);
    setSelectedShots(allShots);
  };

  const clearSelection = () => {
    setSelectedShots([]);
  };

  const handleDownload = (imageUrl: string, shotNumber: number) => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `shot-${shotNumber}-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show download confirmation
    alert(`Downloaded shot ${shotNumber}`);
  };

  const handleOpenEditModal = (image: GeneratedImage) => {
    setEditingImage(image);
    setEditPrompt(image.prompt || "");
    setEditParameters(image.parameters || {});
  };

  const handleSaveEdit = () => {
    if (!editingImage) return;
    
    const updatedImages = images.map(img => 
      img.shotNumber === editingImage.shotNumber
        ? {
            ...img,
            prompt: editPrompt,
            parameters: editParameters,
            // Mark as edited
            status: "edited"
          }
        : img
    );
    
    onChange({ stage3: { generatedImages: updatedImages } });
    setEditingImage(null);
    setEditPrompt("");
    setEditParameters({});
    alert(`Saved edits for shot ${editingImage.shotNumber}`);
  };

  const handleDeleteShot = (shotNumber: number) => {
    if (!confirm(`Are you sure you want to delete shot ${shotNumber}?`)) return;
    
    const updatedImages = images.filter(img => img.shotNumber !== shotNumber);
    onChange({ stage3: { generatedImages: updatedImages } });
    
    // Also remove from selection if it was selected
    setSelectedShots(prev => prev.filter(num => num !== shotNumber));
    
    alert(`Deleted shot ${shotNumber}`);
  };

  const totalShots = video.stage1.numShots;
  const generatedCount = images.length;
  const generationStatus = generatedCount === totalShots 
    ? "complete" 
    : generatedCount > 0 
      ? "partial" 
      : "pending";

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Title */}
      <div className="pb-4 border-b">
        <h2 className="text-2xl font-bold">Stage 3 - Image Shot Generation</h2>
        <p className="text-sm text-muted-foreground mt-1">Generate and review AI-created images for your storyboard</p>
      </div>

      {/* Generation Controls */}
      <Card className="transition-all duration-300 hover:border-primary/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Image className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Image Generation</CardTitle>
              <CardDescription>Generate and manage AI-created images for your shots</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-accent/30 p-4 rounded-lg border transition-all duration-200 hover:border-primary/50">
              <div className="text-sm font-medium text-muted-foreground">Total Shots</div>
              <div className="text-2xl font-bold">{totalShots}</div>
            </div>
            <div className="bg-accent/30 p-4 rounded-lg border transition-all duration-200 hover:border-primary/50">
              <div className="text-sm font-medium text-muted-foreground">Generated</div>
              <div className="text-2xl font-bold text-green-600">{generatedCount}</div>
            </div>
            <div className="bg-accent/30 p-4 rounded-lg border transition-all duration-200 hover:border-primary/50">
              <div className="text-sm font-medium text-muted-foreground">Status</div>
              <Badge 
                variant={generationStatus === "complete" ? "default" : generationStatus === "partial" ? "outline" : "secondary"}
                className="mt-1 transition-all duration-200"
              >
                {generationStatus === "complete" ? "Complete" : generationStatus === "partial" ? "In Progress" : "Pending"}
              </Badge>
            </div>
          </div>

          {/* Progress Bar */}
          {progress !== null && (
            <div className="space-y-2 animate-in slide-in-from-top duration-200">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Generating images...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="transition-all duration-500" />
              <p className="text-xs text-muted-foreground">AI is creating images based on your shot descriptions</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={handleGenerateImages}
              disabled={progress !== null || totalShots === 0}
              className="transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image className="h-4 w-4 mr-2" />
              Generate Image Shots
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleRegenerateSelected}
              disabled={selectedShots.length === 0 || progress !== null}
              className="transition-all duration-200 hover:scale-105 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate Selected Shots ({selectedShots.length})
            </Button>

            {selectedShots.length > 0 && (
              <>
                <Button 
                  variant="outline"
                  onClick={selectAllShots}
                  className="transition-all duration-200 hover:scale-105 hover:border-primary"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Select All
                </Button>
                <Button 
                  variant="outline"
                  onClick={clearSelection}
                  className="transition-all duration-200 hover:scale-105 hover:border-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Selection
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generated Images Grid */}
      <Card className="transition-all duration-300 hover:border-primary/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <Eye className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <CardTitle className="text-xl">Generated Images</CardTitle>
                <CardDescription>Review and manage your AI-generated shot images</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="transition-all duration-200">
              {generatedCount} of {totalShots} generated
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {totalShots === 0 ? (
            <Alert className="transition-all duration-200">
              <AlertDescription>
                No shots defined. Go back to Stage 1 to define the number of shots.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: totalShots }).map((_, i) => {
                const shotNumber = i + 1;
                const img = images.find((gi: GeneratedImage) => gi.shotNumber === shotNumber);
                const isSelected = selectedShots.includes(shotNumber);
                
                return (
                  <Card 
                    key={i} 
                    className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                      isSelected ? 'ring-2 ring-primary scale-[1.02] shadow-lg' : 'hover:border-primary/50'
                    }`}
                    onClick={() => toggleShotSelection(shotNumber)}
                  >
                    <CardContent className="p-0">
                      {/* Image Container */}
                      <div className="aspect-video bg-accent/30 flex items-center justify-center overflow-hidden relative group transition-all duration-200">
                        {img ? (
                          <>
                            <img 
                              src={img.url} 
                              alt={`shot-${shotNumber}`} 
                              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200">
                              <Eye className="h-8 w-8 text-white" />
                            </div>
                          </>
                        ) : (
                          <div className="text-center p-4">
                            <Image className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
                            <span className="text-sm text-muted-foreground">Not Generated</span>
                          </div>
                        )}
                        
                        {/* Selection Checkbox */}
                        <div className="absolute top-2 right-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                            isSelected ? 'bg-primary' : 'bg-white/80'
                          }`}>
                            {isSelected && <Check className="h-4 w-4 text-white" />}
                          </div>
                        </div>
                      </div>
                      
                      {/* Card Footer */}
                      <div className="p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-sm transition-colors duration-200">Shot {shotNumber}</div>
                          {img && (
                            <Badge variant="secondary" className="text-xs transition-all duration-200">
                              Generated
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-1 flex-wrap">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (img) {
                                handleDownload(img.url, shotNumber);
                              }
                            }}
                            disabled={!img}
                            className="transition-all duration-200 hover:scale-105 hover:bg-green-50 hover:text-green-600 disabled:opacity-30"
                            title="Download"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (img) {
                                handleOpenEditModal(img);
                              }
                            }}
                            disabled={!img}
                            className="transition-all duration-200 hover:scale-105 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30"
                            title="Edit Details"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (img) {
                                handleDeleteShot(shotNumber);
                              }
                            }}
                            disabled={!img}
                            className="text-destructive hover:bg-destructive/10 transition-all duration-200 hover:scale-105 disabled:opacity-30"
                            title="Delete Shot"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Image Details Dialog */}
      <Dialog open={editingImage !== null} onOpenChange={(open) => !open && setEditingImage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Image Details - Shot {editingImage?.shotNumber}</DialogTitle>
            <DialogDescription>
              Modify the prompt and parameters for this generated image
            </DialogDescription>
          </DialogHeader>
          
          {editingImage && (
            <div className="space-y-6">
              {/* Image Preview */}
              <div className="space-y-2">
                <Label>Image Preview</Label>
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src={editingImage.url} 
                    alt={`shot-${editingImage.shotNumber}`}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>

              {/* Prompt Editor */}
              <div className="space-y-2">
                <Label htmlFor="edit-prompt">AI Prompt</Label>
                <Textarea
                  id="edit-prompt"
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary"
                  placeholder="Edit the AI prompt used to generate this image..."
                />
              </div>

              {/* Parameters Editor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Image Parameters</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const newKey = prompt("Enter parameter name:");
                      if (newKey) {
                        setEditParameters(prev => ({ ...prev, [newKey]: "" }));
                      }
                    }}
                  >
                    <Plus className="h-3.5 w-3.5 mr-2" />
                    Add Parameter
                  </Button>
                </div>
                
                {Object.keys(editParameters).length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">No parameters defined</p>
                ) : (
                  <div className="space-y-2">
                    {Object.entries(editParameters).map(([key, value], index) => (
                      <div key={key} className="flex items-center gap-2 p-2 border rounded">
                        <Input
                          value={key}
                          onChange={(e) => {
                            const newKey = e.target.value;
                            const { [key]: oldValue, ...rest } = editParameters;
                            setEditParameters({ ...rest, [newKey]: oldValue });
                          }}
                          className="flex-1"
                          placeholder="Parameter name"
                        />
                        <Input
                          value={value as string}
                          onChange={(e) => {
                            setEditParameters(prev => ({ ...prev, [key]: e.target.value }));
                          }}
                          className="flex-1"
                          placeholder="Value"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            const { [key]: _, ...rest } = editParameters;
                            setEditParameters(rest);
                          }}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Shot Number</Label>
                  <div className="font-medium">{editingImage.shotNumber}</div>
                </div>
                {editingImage.createdAt && (
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Generated</Label>
                    <div className="font-medium">
                      {new Date(editingImage.createdAt).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingImage(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="transition-all duration-200 hover:scale-105">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}