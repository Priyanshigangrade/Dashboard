"use client"

import PromptComposer from "@/components/ai/prompt-composer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ChatGPTApiKeysPage() {
  return (
    <div className="space-y-6">
      

      <PromptComposer
        provider="chatgpt"
        onSend={({ prompt, model }) => {
          console.log("ChatGPT prompt:", prompt, "model:", model)
        }}
      />
    </div>
  )
}
