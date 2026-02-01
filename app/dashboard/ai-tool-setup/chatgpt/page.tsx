"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"

export default function ApiKeysPage() {
  return (
    <div className="flex justify-center px-6 py-10">
      <div className="w-full max-w-2xl space-y-6">
        {/* PAGE TITLE */}
        <h1 className="text-3xl font-semibold text-center">
          API Keys
        </h1>

        <Tabs defaultValue="chatgpt">
          <TabsContent value="chatgpt">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>ChatGPT Configuration</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* API USER NAME */}
                <div className="space-y-2">
                  <Label htmlFor="api-name">API User Name</Label>
                  <Input
                    id="api-name"
                    placeholder="e.g. OpenAI Main Key"
                  />
                </div>

                {/* API KEY */}
                <div className="space-y-2">
                  <Label htmlFor="api-key">OpenAI API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="sk-..."
                  />
                </div>

                {/* ACTION */}
                <div className="pt-2">
                  <Button>Save ChatGPT Key</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}