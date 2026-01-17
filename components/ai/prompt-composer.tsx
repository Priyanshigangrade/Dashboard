"use client"

import * as React from "react"
import { Sparkles, Clock3, Zap, Share2, Send } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function PromptComposer({
  provider,
  onSend,
}: {
  provider: "chatgpt" | "gemini"
  onSend?: (payload: { prompt: string; model: string }) => void
}) {
  const [prompt, setPrompt] = React.useState("")

  // ✅ Default model based on provider
  const [model, setModel] = React.useState(
    provider === "chatgpt" ? "gpt-5.0" : "gemini-1.5-pro"
  )

  // ✅ When provider changes, update default model correctly
  React.useEffect(() => {
    setModel(provider === "chatgpt" ? "gpt-5.0" : "gemini-1.5-pro")
  }, [provider])

  function handleSend() {
    if (!prompt.trim()) return
    onSend?.({ prompt, model })
    setPrompt("")
  }

  return (
    <TooltipProvider>
      <Card className="w-full rounded-3xl border bg-background/60 p-6 backdrop-blur">
        {/* Header */}
        <div className="mb-4 space-y-1">
          <div className="text-xs font-semibold tracking-[0.25em] text-muted-foreground">
            PROMPT
          </div>
          <div className="text-sm text-muted-foreground">
            Share goals, context, tone, and desired output.
          </div>
        </div>

        {/* Textarea */}
        <div className="rounded-2xl border bg-background/30 p-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask AI anything..."
            className="min-h-[120px] resize-none border-0 bg-transparent p-0 text-base focus-visible:ring-0"
          />
        </div>

        <Separator className="my-5" />

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left icons */}
          <div className="flex items-center gap-2">
            <IconButton label="Share">
              <Share2 className="h-5 w-5" />
            </IconButton>

            <IconButton label="Quick prompt">
              <Zap className="h-5 w-5" />
            </IconButton>

            <IconButton label="History">
              <Clock3 className="h-5 w-5" />
            </IconButton>

            <IconButton label="Enhance">
              <Sparkles className="h-5 w-5" />
            </IconButton>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3 self-end">
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="h-11 w-[140px] rounded-full">
                <SelectValue placeholder="Model" />
              </SelectTrigger>

              <SelectContent>
                {/* ✅ ChatGPT models */}
                {provider === "chatgpt" ? (
                  <>
                    <SelectItem value="gpt-5.0">GPT 5.0</SelectItem>
                    <SelectItem value="gpt-4.1">GPT 4.1</SelectItem>
                  </>
                ) : (
                  /* ✅ Gemini models */
                  <>
                    <SelectItem value="gemini-1.5-pro">Gemini Pro</SelectItem>
                    <SelectItem value="gemini-1.5-flash">Gemini Flash</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>

            <Button onClick={handleSend} className="h-11 rounded-full px-6">
              SEND <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  )
}

function IconButton({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background/30 text-muted-foreground transition hover:bg-background/60 hover:text-foreground">
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
