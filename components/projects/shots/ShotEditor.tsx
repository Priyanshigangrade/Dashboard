"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import ReferenceUpload from "./ReferenceUpload"

export interface Shot {
  id: string
  name: string
  instruction?: string
  references?: string[]
}

interface Props {
  shot: Shot
  onChange: (updated: Shot) => void
  onDelete: (id: string) => void
}

export default function ShotEditor({ shot, onChange }: Props) {
  function updateInstruction(value: string) {
    onChange({ ...shot, instruction: value })
  }

  function addReferences(files: FileList) {
    const urls = Array.from(files).map(f =>
      URL.createObjectURL(f)
    )

    onChange({
      ...shot,
      references: [...(shot.references ?? []), ...urls],
    })
  }

  function removeReference(index: number) {
    onChange({
      ...shot,
      references: shot.references?.filter((_, i) => i !== index),
    })
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{shot.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Instruction */}
        <div>
          <label className="text-sm font-medium">
            Shot Instruction
          </label>
          <Textarea
            value={shot.instruction ?? ""}
            onChange={(e) => updateInstruction(e.target.value)}
            placeholder="Describe how this shot should look..."
            className="mt-2 min-h-[120px]"
          />
        </div>

        {/* Reference Images */}
        <ReferenceUpload
          images={shot.references ?? []}
          onAdd={addReferences}
          onRemove={removeReference}
        />
      </CardContent>
    </Card>
  )
}
