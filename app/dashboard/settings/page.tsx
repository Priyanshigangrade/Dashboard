"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { toast } from "sonner"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  const [emailNotif, setEmailNotif] = useState(true)
  const [aiAlerts, setAiAlerts] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [model, setModel] = useState("chatgpt")
  const [creativity, setCreativity] = useState("balanced")
  const [timeout, setTimeoutValue] = useState("30")

  function saveSettings() {
    toast.success("Settings saved")
  }

  return (
    <div className="flex justify-center px-4 py-8">
      <Card className="w-full max-w-2xl rounded-xl border bg-background/80 backdrop-blur">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Settings</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 text-sm">
          {/* GENERAL */}
          <div className="space-y-3">
            <p className="font-medium">General</p>

            <div className="flex items-center justify-between">
              <Label>Appearance</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* NOTIFICATIONS */}
          <div className="space-y-3">
            <p className="font-medium">Notifications</p>

            <div className="flex items-center justify-between">
              <Label>Email notifications</Label>
              <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
            </div>

            <div className="flex items-center justify-between">
              <Label>AI generation alerts</Label>
              <Switch checked={aiAlerts} onCheckedChange={setAiAlerts} />
            </div>
          </div>

          <Separator />

          {/* AI PREFERENCES */}
          <div className="space-y-3">
            <p className="font-medium">AI Preferences</p>

            <div className="flex items-center justify-between">
              <Label>Default model</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chatgpt">ChatGPT</SelectItem>
                  <SelectItem value="gemini">Gemini</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label>Creativity</Label>
              <Select value={creativity} onValueChange={setCreativity}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label>Auto-save generations</Label>
              <Switch checked={autoSave} onCheckedChange={setAutoSave} />
            </div>
          </div>

          <Separator />

          {/* SECURITY */}
          <div className="space-y-3">
            <p className="font-medium">Security</p>

            <div className="flex items-center justify-between">
              <Label>Session timeout</Label>
              <Select value={timeout} onValueChange={setTimeoutValue}>
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="60">60 min</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* SAVE */}
          <div className="flex justify-end pt-2">
            <Button size="sm" onClick={saveSettings}>
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}