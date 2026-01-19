"use client"

import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function StepBasicDetails() {
  return (
    <div className="space-y-6">
      {/* SECTION HEADER */}
      <div>
        <h3 className="text-lg font-semibold">Basic Project Details</h3>
        <p className="text-sm text-muted-foreground">
          Enter project name, category, and purpose.
        </p>
      </div>

      {/* FORM */}
      <CardContent className="space-y-5 p-0">
        {/* Project Name */}
        <div className="space-y-2">
          <Label>Project Name</Label>
          <Input placeholder="Instagram Reel – Product Launch" />
        </div>

        {/* Project Type */}
        <div className="space-y-2">
          <Label>Project Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="real-estate">Real Estate</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="reels">Reels</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Project Purpose */}
        <div className="space-y-2">
          <Label>Project Purpose</Label>
          <Textarea
            placeholder="Describe what this video is meant to achieve..."
            className="min-h-[120px]"
          />
        </div>
      </CardContent>
    </div>
  )
}
