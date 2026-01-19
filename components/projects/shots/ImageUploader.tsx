import { Card } from "@/components/ui/card"
import { Upload } from "lucide-react"

export default function ImageUploader({ label }: { label: string }) {
  return (
    <Card className="border-dashed p-4 flex items-center justify-center gap-2 text-sm text-muted-foreground cursor-pointer hover:bg-muted/30">
      <Upload className="h-4 w-4" />
      Upload {label}
    </Card>
  )
}
