"use client"

import * as React from "react"
import { ChevronDown, Copy, Trash2, ArrowUp, ArrowDown } from "lucide-react"

import { mockTemplates } from "../mock"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default function ShotBlockEditor() {
  const template = mockTemplates[0] // mock
  const [openShotId, setOpenShotId] = React.useState<string | null>(template.shots[0]?.id ?? null)

  return (
    <div className="h-full p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">Shot Builder</div>
          <div className="text-sm text-muted-foreground">
            Edit shot instructions and parameters
          </div>
        </div>
        <Button variant="secondary">+ Add Shot</Button>
      </div>

      <div className="space-y-3">
        {template.shots.map((shot, idx) => {
          const isOpen = openShotId === shot.id
          return (
            <Card key={shot.id} className="rounded-2xl p-4">
              <Collapsible open={isOpen} onOpenChange={() => setOpenShotId(isOpen ? null : shot.id)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="font-semibold">{shot.title}</div>
                    <Badge variant="secondary">{shot.shotType}</Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" disabled={idx === 0}>
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" disabled={idx === template.shots.length - 1}>
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>

                    <CollapsibleTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>

                <CollapsibleContent className="mt-4 space-y-3">
                  <Separator />
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Instruction</div>
                    <Textarea defaultValue={shot.instruction} />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Aspect Ratio</div>
                      <Badge variant="outline">{shot.aspectRatio ?? "16:9"}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Shot Type</div>
                      <Badge variant="outline">{shot.shotType}</Badge>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
