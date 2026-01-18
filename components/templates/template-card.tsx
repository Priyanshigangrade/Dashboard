"use client"

import Image from "next/image"
import Link from "next/link"
import { MoreVertical } from "lucide-react"

import { Template } from "./types"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function TemplateCard({ template }: { template: Template }) {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
          <Image
            src={template.thumbnailUrl}
            alt={template.name}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <Badge variant="secondary">{template.category}</Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/templates/builder/${template.id}`}>
                  Edit
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>Duplicate</DropdownMenuItem>

              <DropdownMenuItem className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <div className="text-base font-semibold">{template.name}</div>
          <div className="text-sm text-muted-foreground">
            {template.description}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <Badge variant="outline">{template.shots.length} shots</Badge>
          <Badge variant="outline">{template.aspectRatio}</Badge>
          <Badge variant="outline">Updated {template.updatedAt}</Badge>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button className="flex-1">Use Template</Button>

        <Button variant="secondary" className="flex-1" asChild>
          <Link href={`/dashboard/templates/builder/${template.id}`}>Preview</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export function NewTemplateCard({ onClick }: { onClick: () => void }) {
  return (
    <Card className="flex min-h-[320px] items-center justify-center rounded-2xl border-dashed">
      <Button variant="outline" className="h-auto py-10" onClick={onClick}>
        <div className="flex flex-col items-center gap-2">
          <div className="text-4xl font-semibold">+</div>
          <div className="font-medium">New Template</div>
        </div>
      </Button>
    </Card>
  )
}
