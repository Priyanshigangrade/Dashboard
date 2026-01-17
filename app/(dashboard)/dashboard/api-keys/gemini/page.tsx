"use client"

import PromptComposer from "@/components/ai/prompt-composer"

export default function GeminiApiKeysPage() {
  return (
    <div className="space-y-6">
      <PromptComposer provider="gemini" />
    </div>
  )
}
