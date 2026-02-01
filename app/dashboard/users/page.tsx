"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Copy, Mail, UserPlus } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  avatarFallback: string
}

export default function UsersPage() {
  const [email, setEmail] = useState("")
  const [accessLevel, setAccessLevel] = useState("viewer")
  const [isLoading, setIsLoading] = useState(false)
  const [showInviteLink, setShowInviteLink] = useState(false)
  const [inviteLink, setInviteLink] = useState("")
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Priyanshi Gangrade",
      email: "priyanshigangrade25@gmail.com",
      role: "Owner",
      avatarFallback: "P"
    }
  ])

  // Generate a unique invite link
  const generateInviteLink = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
    const token = Math.random().toString(36).substring(2, 15)
    const link = `${baseUrl}/invite/${token}`
    setInviteLink(link)
    setShowInviteLink(true)
    
    // Copy to clipboard automatically
    navigator.clipboard.writeText(link)
    toast.success("Invite link copied to clipboard!")
  }

  // Handle email invite
  const handleEmailInvite = async () => {
    if (!email) {
      toast.error("Please enter an email address")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Add new team member to the list
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: email.split('@')[0], // Use email prefix as name
        email: email,
        role: accessLevel === "full-access" ? "Admin" : 
              accessLevel === "editor" ? "Editor" : "Viewer",
        avatarFallback: email[0].toUpperCase()
      }

      setTeamMembers(prev => [...prev, newMember])
      setEmail("")
      setAccessLevel("viewer")
      setIsLoading(false)
      
      toast.success(`Invitation sent to ${email}`)
    }, 1000)
  }

  // Copy invite link to clipboard
  const copyInviteLink = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink)
      toast.success("Invite link copied to clipboard!")
    }
  }

  // Remove team member
  const removeTeamMember = (id: string) => {
    if (id === "1") {
      toast.error("Cannot remove the team owner")
      return
    }
    
    setTeamMembers(prev => prev.filter(member => member.id !== id))
    toast.success("Team member removed")
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 rounded-md">
              <AvatarFallback className="rounded-md text-lg">P</AvatarFallback>
            </Avatar>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Priyanshi Gangrade Team</h2>
                <Badge variant="secondary">Trial</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Manage team members and access.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={generateInviteLink}
              className="gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Invite via link
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Invite Link Display */}
          {showInviteLink && (
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Share this invite link</p>
                  <p className="text-xs text-muted-foreground">
                    Anyone with this link can join your team
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyInviteLink}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Input
                  value={inviteLink}
                  readOnly
                  className="font-mono text-xs"
                />
              </div>
            </div>
          )}

          <Separator />

          {/* Invite form row */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="md:flex-1">
              <Input 
                placeholder="Invite by email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEmailInvite()}
              />
            </div>

            <div>
              <Select value={accessLevel} onValueChange={setAccessLevel}>
                <SelectTrigger className="md:w-[180px]">
                  <SelectValue placeholder="Access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-access">Full access</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Button 
                className="md:w-[120px] gap-2"
                onClick={handleEmailInvite}
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4" />
                    Invite
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold tracking-wide text-muted-foreground">
              ACTIVE TEAM MEMBERS ({teamMembers.length})
            </p>
          </div>

          <Separator />

          {/* Team members list */}
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="flex items-center justify-between gap-4 rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{member.avatarFallback}</AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {member.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge 
                    variant={member.role === "Owner" ? "outline" : "outline"}
                  >
                    {member.role}
                  </Badge>
                  
                  {member.id !== "1" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTeamMember(member.id)}
                      className="h-8 px-2 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}