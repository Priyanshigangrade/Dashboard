"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface Shot {
  id: string
  name: string
}

interface Props {
  shots: Shot[]
  activeShotId: string
  onSelect: (id: string) => void
}

export default function ShotList({
  shots,
  activeShotId,
  onSelect,
}: Props) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Shots</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {shots.map((shot) => (
          <Button
            key={shot.id}
            variant="ghost"
            className={cn(
              "w-full justify-start",
              shot.id === activeShotId && "bg-muted"
            )}
            onClick={() => onSelect(shot.id)}
          >
            {shot.name}
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
