"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const steps = [
  "Basic Details",
  "Storyboard & Flow",
  "Image Shot Generation",
  "Video Prompt Generation",
  "Review & Create",
]

export default function NewProjectDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [step, setStep] = useState(0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full h-[640px] flex flex-col">
        {/* HEADER */}
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>

        {/* PROGRESS */}
        <div className="space-y-2">
          <Progress value={((step + 1) / steps.length) * 100} />
          <p className="text-sm text-muted-foreground">
            Step {step + 1} of {steps.length}: {steps[step]}
          </p>
        </div>

        <Separator />

        {/* 🔒 FIXED CONTENT AREA (SAME FOR ALL STEPS) */}
        <div className="flex-1 overflow-y-auto py-6 px-1">
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Project Details</h3>
              <p className="text-sm text-muted-foreground">
                Enter project name, category and purpose.
              </p>

              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input placeholder="Instagram Product Launch" />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Input placeholder="Marketing / Real Estate / Reels" />
              </div>

              <div className="space-y-2">
                <Label>Purpose</Label>
                <Textarea placeholder="Describe the goal of this project..." />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Storyboard & Flow</h3>
              <p className="text-sm text-muted-foreground">
                Define the structure and flow of the video.
              </p>

              <Textarea
                className="h-[180px]"
                placeholder="Scene-by-scene storyboard description..."
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Image Shot Generation</h3>
              <p className="text-sm text-muted-foreground">
                Describe each image shot needed for the project.
              </p>

              <Textarea
                className="h-[180px]"
                placeholder="Wide shot, close-up, product focus..."
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Video Prompt Generation</h3>
              <p className="text-sm text-muted-foreground">
                Provide instructions for AI video generation.
              </p>

              <Textarea
                className="h-[180px]"
                placeholder="Lighting, motion, camera movement..."
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Review & Create</h3>
              <p className="text-sm text-muted-foreground">
                Review all details before creating the project.
              </p>

              <div className="rounded-md border p-4 text-sm text-muted-foreground">
                ✔ Project details verified  
                ✔ Storyboard defined  
                ✔ Shots & prompts ready  
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* FOOTER */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            Back
          </Button>

          {step < steps.length - 1 ? (
            <Button onClick={() => setStep(step + 1)}>Next</Button>
          ) : (
            <Button onClick={() => onOpenChange(false)}>
              Create Project
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
