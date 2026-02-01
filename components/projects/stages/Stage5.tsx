// stages/Stage5.tsx
import React, { useState } from "react"
import { Video } from "@/components/projects/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Download, Film, Layers, CheckCircle } from "lucide-react"

type Props = {
  video: Video;
  onChange: (patch: Partial<Video>) => void;
  onFinalizeVideo: () => void;
};

export default function Stage5({ video, onChange, onFinalizeVideo }: Props) {
  const [progress, setProgress] = useState<number | null>(null);
  
  const generatedVideos = video.stage4.generatedVideos || [];
  const editedVideos = video.stage5?.editedVideos || [];
  const finalVideo = video.stage5?.finalVideo || null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Stage 5 - Final Video Assembly</h2>
        <p className="text-slate-600 mt-2">Combine all shots into a final video with transitions and effects</p>
      </div>

      <Alert>
        <AlertDescription>
          This stage combines all generated video shots, applies transitions, audio, and exports the final video.
        </AlertDescription>
      </Alert>

      {/* Video Assembly Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Video Assembly</CardTitle>
          <CardDescription>
            Combine and export your final video
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{generatedVideos.length}</div>
              <p className="text-sm text-slate-600">Generated Videos</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{editedVideos.length}</div>
              <p className="text-sm text-slate-600">Edited Videos</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{finalVideo ? "Ready" : "Pending"}</div>
              <p className="text-sm text-slate-600">Final Status</p>
            </div>
          </div>

          <Button 
            onClick={() => {
              setProgress(0);
              // Simulate progress
              const interval = setInterval(() => {
                setProgress(prev => {
                  if (prev === null || prev >= 100) {
                    clearInterval(interval);
                    // Update final video
                    onChange({
                      stage5: {
                        ...video.stage5,
                        finalVideo: {
                          url: `https://video.example.com/${video.id}-final-${Date.now()}.mp4`,
                          generatedAt: new Date().toISOString(),
                          quality: "1080p",
                          duration: generatedVideos.length * 3
                        }
                      }
                    });
                    return 100;
                  }
                  return prev + 10;
                });
              }, 300);
            }}
            disabled={generatedVideos.length === 0}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <Layers className="h-4 w-4 mr-2" />
            Assemble Final Video
          </Button>
          
          {progress !== null && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Assembly Progress</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Final Video Preview */}
      {finalVideo && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Final Video Ready
            </CardTitle>
            <CardDescription className="text-green-700">
              Your video has been assembled and is ready for download
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video 
                src={finalVideo.url} 
                controls 
                className="w-full h-full"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-lg border">
                <p className="text-xs text-slate-500">Duration</p>
                <p className="font-medium">{finalVideo.duration}s</p>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <p className="text-xs text-slate-500">Quality</p>
                <p className="font-medium">{finalVideo.quality}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => window.open(finalVideo.url, "_blank")}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Final Video
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
              >
                <Film className="h-4 w-4 mr-2" />
                Preview Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}