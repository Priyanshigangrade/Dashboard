import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function StepStoryboard() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-3">
        <p className="text-sm text-muted-foreground">
          Review or edit storyboard instructions.
        </p>
        <Textarea rows={6} placeholder="Scene 1: Opening shot..." />
      </CardContent>
    </Card>
  )
}
