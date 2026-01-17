"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import ReferenceAssetsSheet from "./reference-assets-sheet"

export default function TemplateLeftSidebar() {
  return (
    <div className="h-full">
      <Tabs defaultValue="general" className="h-full">
        <TabsList className="w-full rounded-none">
          <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
          <TabsTrigger value="defaults" className="flex-1">Defaults</TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100%-48px)] p-4">
          <TabsContent value="general" className="space-y-4 mt-0">
            <div className="space-y-2">
              <Label>Template Name</Label>
              <Input placeholder="Product Marketing Template" />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Short description..." />
            </div>

            <Separator />

            <ReferenceAssetsSheet />
          </TabsContent>

          <TabsContent value="defaults" className="space-y-4 mt-0">
            <div className="space-y-2">
              <Label>Default Instructions</Label>
              <Textarea placeholder="Global template instruction..." />
            </div>
            <div className="space-y-2">
              <Label>Output Columns</Label>
              <Textarea placeholder="shot_name, prompt, negative_prompt, style..." />
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-0">
            <div className="space-y-2">
              <Label>Image Settings</Label>
              <Textarea placeholder="Photorealistic, premium, cinematic..." />
            </div>
            <div className="space-y-2">
              <Label>Video Settings (Gemini Veo defaults)</Label>
              <Textarea placeholder={`{"duration":5,"aspect_ratio":"16:9"}`} />
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
