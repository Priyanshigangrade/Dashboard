"use client"

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface OutputField {
  key: string
  value: string
}

// 🔹 mock output (later replace with Gemini response)
const mockOutput: OutputField[] = [
  {
    key: "Hook",
    value: "Attention-grabbing opening line for the reel",
  },
  {
    key: "Description",
    value: "High-quality product description optimized for engagement",
  },
  {
    key: "CTA",
    value: "Shop now and experience the difference",
  },
]

export default function OutputTable() {
  const hasOutput = mockOutput.length > 0

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Generated Output</CardTitle>
          <Badge variant="outline">AI</Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto">
        {!hasOutput ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No output generated yet.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">Field</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {mockOutput.map((row) => (
                <TableRow key={row.key}>
                  <TableCell className="font-medium">
                    {row.key}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {row.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
