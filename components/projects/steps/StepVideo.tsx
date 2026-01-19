import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function StepVideo() {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <Label>Video Mode</Label>

        <RadioGroup defaultValue="new">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="new" />
            <Label>Create New Video</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="modify" />
            <Label>Modify Existing Video</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
