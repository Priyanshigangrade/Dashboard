import { Card, CardContent } from "@/components/ui/card"

export default function StepReview() {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">
          Review all selections before creating the project.
        </p>
      </CardContent>
    </Card>
  )
}
