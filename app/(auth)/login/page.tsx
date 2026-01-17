"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const router = useRouter()

  // ✅ if already logged in, don't show login again
  React.useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn")
    if (loggedIn === "true") router.push("/dashboard")
  }, [router])

  const handleGoogle = async () => {
    // ✅ DEMO LOGIN (until NextAuth/Firebase)
    localStorage.setItem("isLoggedIn", "true")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Login to continue to your dashboard</CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* ✅ Google Login Button */}
          <Button variant="outline" className="w-full" onClick={handleGoogle}>
            <GoogleIcon />
            Continue with Google
          </Button>

          {/* ✅ OR Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                OR
              </span>
            </div>
          </div>

          {/* Optional: add email/password later */}
          <div className="text-center text-sm text-muted-foreground">
            Email login will be added later.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      className="mr-2 h-4 w-4"
      viewBox="0 0 24 24"
    >
      <path
        d="M21.805 10.023H12v3.955h5.61c-.242 1.312-1.49 3.85-5.61 3.85-3.375 0-6.125-2.795-6.125-6.24s2.75-6.24 6.125-6.24c1.922 0 3.21.82 3.95 1.53l2.69-2.615C17.07 2.69 14.84 1.5 12 1.5 6.82 1.5 2.625 5.742 2.625 11.588c0 5.846 4.195 10.088 9.375 10.088 5.414 0 8.99-3.79 8.99-9.127 0-.613-.07-1.082-.185-1.526Z"
        fill="currentColor"
      />
    </svg>
  )
}
