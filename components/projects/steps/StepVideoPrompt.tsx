import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StepVideoPrompt() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select AI Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="chatgpt">ChatGPT</SelectItem>
            <SelectItem value="gemini">Gemini</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  )
}
