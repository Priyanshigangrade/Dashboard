import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"

export default function ApiKeysPage() {
  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-xl">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          API Keys
        </h1>

        <Tabs defaultValue="gemini">
          <TabsContent value="gemini">
            <Card>
              <CardHeader>
                <CardTitle>Gemini Configuration</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <Label>API User Name</Label>
                  <Input placeholder="e.g. Gemini Prod Key" />
                </div>

                <div>
                  <Label>Gemini API Key</Label>
                  <Input type="password" placeholder="AIza..." />
                </div>

                <Button>Save Gemini Key</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
