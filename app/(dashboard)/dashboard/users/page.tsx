import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UsersPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
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

          <Button variant="outline">
            Invite via link
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <Separator />

          {/* Invite form row */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <Input placeholder="Invite by email" className="md:flex-1" />

            <Select defaultValue="full-access">
              <SelectTrigger className="md:w-[180px]">
                <SelectValue placeholder="Access level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-access">Full access</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>

            <Button className="md:w-[120px]">Invite</Button>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold tracking-wide text-muted-foreground">
              ACTIVE TEAM MEMBERS (1)
            </p>
          </div>

          <Separator />

          {/* Member row */}
          <div className="flex items-center justify-between gap-4 py-2">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>P</AvatarFallback>
              </Avatar>

              <div>
                <div className="font-medium">Priyanshi Gangrade</div>
                <div className="text-sm text-muted-foreground">
                  priyanshigangrade25@gmail.com
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline">Owner</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
