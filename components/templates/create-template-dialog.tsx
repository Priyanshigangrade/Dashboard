"use client"

import * as React from "react"
import { X, GripVertical, Trash2, Mic, PenLine, StickyNote } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

type TextField = {
  id: string
  name: string
  icon: React.ReactNode
}

function uid() {
  return Math.random().toString(36).slice(2)
}

export function CreateTemplateDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [label, setLabel] = React.useState("")
  const [namePlaceholder, setNamePlaceholder] = React.useState("")

  const [aspectRatio, setAspectRatio] = React.useState("16:9")
  const [frameCount, setFrameCount] = React.useState("no_frames")

  const [sharing, setSharing] = React.useState({
    enableComments: true,
    allowGuestsChangeStatus: false,
    allowCommentsOldVersions: false,
    shareWithVersionNumber: false,
    allowVersionSwitching: false,
    showVersionNotification: false,
  })

  const [textFields, setTextFields] = React.useState<TextField[]>([
    { id: uid(), name: "Voiceover", icon: <Mic className="h-4 w-4" /> },
    { id: uid(), name: "Direction", icon: <PenLine className="h-4 w-4" /> },
    { id: uid(), name: "Notes", icon: <StickyNote className="h-4 w-4" /> },
  ])

  const canCreate = label.trim().length > 0

  function addTextField() {
    setTextFields((p) => [
      ...p,
      { id: uid(), name: `Field ${p.length + 1}`, icon: <StickyNote className="h-4 w-4" /> },
    ])
  }

  function removeField(id: string) {
    setTextFields((p) => p.filter((x) => x.id !== id))
  }

  function onCreate() {
    // ✅ later you will connect to DB API
    const payload = {
      label,
      namePlaceholder,
      aspectRatio,
      frameCount,
      sharing,
      textFields: textFields.map((f) => f.name),
    }

    console.log("Create Template:", payload)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl rounded-3xl p-0 overflow-hidden">
        {/* Header */}
        <div className="p-8 pb-4">
          <div className="flex items-start justify-between gap-4">
            <DialogHeader>
              <DialogTitle className="text-4xl font-semibold">Create a template</DialogTitle>
              <div className="text-sm text-muted-foreground">
                Set up standard fields and settings to use across your chosen storyboards.
              </div>
            </DialogHeader>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Body */}
        <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            <div className="space-y-2">
              <Label>Label</Label>
              <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Add a description for your template"
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label>Name Placeholder</Label>
              <Input
                value={namePlaceholder}
                onChange={(e) => setNamePlaceholder(e.target.value)}
                placeholder="Shown in new storyboard name field"
                className="h-11 rounded-xl"
              />
            </div>

            {/* Sharing Settings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="text-lg font-semibold">Sharing Settings</div>
                <Badge variant="secondary" className="rounded-full">⚡ Workflow</Badge>
              </div>

              <div className="space-y-4">
                <RowSwitch
                  label="Enable comments"
                  checked={sharing.enableComments}
                  onCheckedChange={(v) =>
                    setSharing((p) => ({ ...p, enableComments: v }))
                  }
                />
                <RowSwitch
                  label="Allow guests to change storyboard status"
                  checked={sharing.allowGuestsChangeStatus}
                  onCheckedChange={(v) =>
                    setSharing((p) => ({ ...p, allowGuestsChangeStatus: v }))
                  }
                />
                <RowSwitch
                  label="Allow comments in old versions"
                  checked={sharing.allowCommentsOldVersions}
                  onCheckedChange={(v) =>
                    setSharing((p) => ({ ...p, allowCommentsOldVersions: v }))
                  }
                />
                <RowSwitch
                  label="Share with version number"
                  checked={sharing.shareWithVersionNumber}
                  onCheckedChange={(v) =>
                    setSharing((p) => ({ ...p, shareWithVersionNumber: v }))
                  }
                />
                <RowSwitch
                  label="Allow version switching"
                  checked={sharing.allowVersionSwitching}
                  onCheckedChange={(v) =>
                    setSharing((p) => ({ ...p, allowVersionSwitching: v }))
                  }
                />
                <RowSwitch
                  label="Show version notification"
                  checked={sharing.showVersionNotification}
                  onCheckedChange={(v) =>
                    setSharing((p) => ({ ...p, showVersionNotification: v }))
                  }
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Image Aspect Ratio</Label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select aspect ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                    <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                    <SelectItem value="1:1">Square (1:1)</SelectItem>
                    <SelectItem value="4:3">Classic (4:3)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Frame Count</Label>
                <Select value={frameCount} onValueChange={setFrameCount}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select frame count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no_frames">No frames</SelectItem>
                    <SelectItem value="3">3 frames</SelectItem>
                    <SelectItem value="6">6 frames</SelectItem>
                    <SelectItem value="12">12 frames</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Text Fields */}
            <div className="space-y-4">
              <div className="text-lg font-semibold">Text Fields</div>

              <div className="space-y-3">
                {textFields.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center gap-3 rounded-xl border bg-background px-3 py-2"
                  >
                    <div className="text-muted-foreground">{f.icon}</div>
                    <Input
                      value={f.name}
                      onChange={(e) =>
                        setTextFields((p) =>
                          p.map((x) => (x.id === f.id ? { ...x, name: e.target.value } : x))
                        )
                      }
                      className="h-9 border-0 shadow-none focus-visible:ring-0"
                    />

                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-lg"
                      onClick={() => removeField(f.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <Button size="icon" variant="ghost" className="rounded-lg">
                      <GripVertical className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button variant="secondary" className="rounded-xl" onClick={addTextField}>
                + Add text field
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6">
          <Button variant="outline" className="rounded-xl" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="rounded-xl" disabled={!canCreate} onClick={onCreate}>
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function RowSwitch({
  label,
  checked,
  onCheckedChange,
}: {
  label: string
  checked: boolean
  onCheckedChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-sm">{label}</div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}
