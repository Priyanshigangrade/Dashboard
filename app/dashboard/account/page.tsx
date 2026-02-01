"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function AccountPage() {
  const [name, setName] = useState("Priyanshi")
  const [loading, setLoading] = useState(false)

  function handleUpdateProfile() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Profile updated successfully")
    }, 800)
  }

  return (
    <div className="flex justify-center px-4 py-8">
      <Card className="w-full max-w-2xl rounded-xl border bg-background/80 backdrop-blur">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 text-sm">
          {/* PROFILE INFORMATION */}
          <div className="space-y-3">
            <p className="font-medium">Profile Information</p>
            
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Email</Label>
                <Input 
                  value="priyanshi@example.com" 
                  disabled 
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button 
                size="sm" 
                onClick={handleUpdateProfile} 
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </div>

          <Separator />

          {/* SECURITY */}
          <div className="space-y-3">
            <p className="font-medium">Security</p>
            
            <div className="space-y-4">
              <div>
                <Label>Password</Label>
                <Input 
                  type="password" 
                  value="********" 
                  disabled 
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.info("Password change coming soon")}
              >
                Change Password
              </Button>
            </div>
          </div>

          <Separator />

          {/* ROLE & ACCESS */}
          <div className="space-y-3">
            <p className="font-medium">Role & Access</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-foreground">Role</Label>
                <span className="text-sm font-medium">Admin</span>
              </div>
              
              <p className="text-xs text-muted-foreground pt-1">
                Roles are managed by system administrators.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}