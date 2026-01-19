"use client"

import { useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

interface Props {
  images: string[]
  onAdd: (files: FileList) => void
  onRemove: (index: number) => void
}

export default function ReferenceUpload({
  images,
  onAdd,
  onRemove,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Reference Images</h4>

        <Button
          size="sm"
          variant="outline"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => e.target.files && onAdd(e.target.files)}
        />
      </div>

      {images.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          Upload reference images to guide AI generation.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative group rounded-md overflow-hidden border"
            >
              <img
                src={src}
                alt="reference"
                className="h-20 w-full object-cover"
              />

              <button
                onClick={() => onRemove(i)}
                className="absolute top-1 right-1 hidden group-hover:flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
