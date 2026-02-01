"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Chrome } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    // ✅ Temporary redirect to dashboard (no backend yet)
    router.push("/dashboard")
  }

  const handleGoogleSignup = () => {
    setLoading(true)
    // Simulate Google signup
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0px rgba(59, 130, 246, 0)",
              "0 0 20px rgba(59, 130, 246, 0.3)",
              "0 0 0px rgba(59, 130, 246, 0)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <Card className="w-full h-[550px] flex flex-col">
            <CardHeader className="space-y-1 flex-shrink-0 pt-6">
              <div>
                <CardTitle className="text-2xl text-center">
                  Create an account
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your details below to create your account
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="grid gap-4 flex-1 p-6 pt-2">
              {/* Google Signup Button */}
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    onClick={handleGoogleSignup}
                    disabled={loading}
                  >
                    <Chrome className="h-4 w-4 mr-2" />
                    Continue with Google
                  </Button>
                </motion.div>
                
                <div className="flex items-center gap-3">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">OR</span>
                  <Separator className="flex-1" />
                </div>
              </div>

              {/* Signup Form */}
              <form
                onSubmit={handleSubmit}
                className="grid gap-4"
              >
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Priyanshi Gangrade" 
                    required 
                    disabled={loading}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    required 
                    disabled={loading}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    disabled={loading}
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    className="w-full mt-2" 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-2 h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                        />
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Login link */}
              <div className="text-center text-sm text-muted-foreground mt-2">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}