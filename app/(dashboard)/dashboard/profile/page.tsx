"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

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
    // ✅ SAME WIDTH + CENTER AS SETTINGS
    <div className="flex justify-center">
      <div className="w-full max-w-3xl">
        {/* ✅ SINGLE OUTER CARD (IMPORTANT) */}
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Account</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage your personal information and account details.
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* ================= PROFILE ================= */}
            <section className="space-y-4">
              <h3 className="font-semibold">Profile Information</h3>

              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Email</Label>
                <Input value="priyanshi@example.com" disabled />
              </div>

              <Button onClick={handleUpdateProfile} disabled={loading}>
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </section>

            <Separator />

            {/* ================= SECURITY ================= */}
            <section className="space-y-4">
              <h3 className="font-semibold">Security</h3>

              <div className="grid gap-2">
                <Label>Password</Label>
                <Input type="password" value="********" disabled />
              </div>

              <Button
                variant="outline"
                onClick={() => toast.info("Password change coming soon")}
              >
                Change Password
              </Button>
            </section>

            <Separator />

            {/* ================= ROLE ================= */}
            <section className="space-y-2">
              <h3 className="font-semibold">Role & Access</h3>
              <p className="text-sm">
                Role: <span className="font-medium">Admin</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Roles are managed by system administrators.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
