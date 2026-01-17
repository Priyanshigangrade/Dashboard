"use client"

import Image from "next/image"
import { mockTemplates } from "../mock"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

export default function TemplatePreviewPanel() {
  const template = mockTemplates[0]

  return (
    <div className="h-full">
      <Tabs defaultValue="images" className="h-full">
        <TabsList className="w-full rounded-none">
          <TabsTrigger value="images" className="flex-1">Image Preview</TabsTrigger>
          <TabsTrigger value="table" className="flex-1">Output Table</TabsTrigger>
          <TabsTrigger value="json" className="flex-1">Veo JSON</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100%-48px)] p-4">
          <TabsContent value="images" className="mt-0">
            <div className="grid grid-cols-2 gap-3">
              {template.shots.map((s) => (
                <div key={s.id} className="relative h-24 overflow-hidden rounded-xl border">
                  <Image
                    src={template.thumbnailUrl}
                    alt={s.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="table" className="mt-0">
            <div className="rounded-xl border">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">shot_name</TableCell>
                    <TableCell>string</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">prompt</TableCell>
                    <TableCell>string</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">negative_prompt</TableCell>
                    <TableCell>string</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="json" className="mt-0">
            <pre className="rounded-xl border bg-muted p-3 text-xs whitespace-pre-wrap">
{JSON.stringify(
  {
    video: {
      aspect_ratio: template.aspectRatio,
      duration_sec: 5,
      resolution: "4K",
      style: "photorealistic, premium appliance commercial",
    },
  },
  null,
  2
)}
            </pre>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
