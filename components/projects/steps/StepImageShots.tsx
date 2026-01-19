import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function StepImageShots() {
  return (
    <Card>
      <CardContent className="pt-6 flex items-center justify-between">
        <Label>Generate AI Image Shots</Label>
        <Switch defaultChecked />
      </CardContent>
    </Card>
  )
}
