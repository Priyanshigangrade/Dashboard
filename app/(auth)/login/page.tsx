"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Chrome, Mail } from "lucide-react"

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
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [isForgotPassword, setIsForgotPassword] = React.useState(false)
  const [email, setEmail] = React.useState("")

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    document.cookie = "token=demo-token; path=/; max-age=86400"
    router.push("/dashboard")
    setLoading(false)
  }

  const handleGoogleLogin = () => {
    setLoading(true)
    // Simulate Google login
    setTimeout(() => {
      document.cookie = "token=demo-token; path=/; max-age=86400"
      router.push("/dashboard")
    }, 1500)
  }

  const handleForgotPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    // Simulate sending reset link
    setTimeout(() => {
      setLoading(false)
      setIsForgotPassword(false)
      alert("Password reset link has been sent to your email!")
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
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs uppercase tracking-[0.28em] text-muted-foreground">
                <Mail className="h-3 w-3" />
                Welcome Back
              </div>
              <div>
                <CardTitle className="text-2xl text-center">
                  {isForgotPassword ? "Reset Password" : "Login"}
                </CardTitle>
                <CardDescription className="text-center">
                  {isForgotPassword 
                    ? "Enter your email to reset your password"
                    : "Enter your email below to login to your account"
                  }
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="grid gap-4 flex-1 p-6 pt-2">
              {/* Google Login Button - Only show on main login */}
              {!isForgotPassword && (
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleLogin}
                      disabled={loading}
                      className="w-full"
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
              )}

              {/* Login Form or Forgot Password Form */}
              <form
                onSubmit={isForgotPassword ? handleForgotPasswordSubmit : handleLoginSubmit}
                className="grid gap-4"
              >
                {isForgotPassword ? (
                  // Forgot Password Form
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="forgot-email">Email</Label>
                      <Input
                        id="forgot-email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                      />
                    </div>

                    <div className="flex gap-3 mt-2">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => setIsForgotPassword(false)}
                          disabled={loading}
                        >
                          Back
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1"
                      >
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={loading}
                        >
                          {loading ? "Sending..." : "Send Reset Link"}
                        </Button>
                      </motion.div>
                    </div>
                  </>
                ) : (
                  // Login Form
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                      />
                    </div>

                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <button
                          type="button"
                          onClick={() => setIsForgotPassword(true)}
                          className="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                          disabled={loading}
                        >
                          Forgot your password?
                        </button>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm text-muted-foreground">
                        Remember me
                      </Label>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full mt-2"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="mr-2 h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                            />
                            Signing in...
                          </>
                        ) : (
                          "Sign in"
                        )}
                      </Button>
                    </motion.div>
                  </>
                )}
              </form>

              {/* Sign up link - Only show on main login */}
              {!isForgotPassword && (
                <div className="text-center text-sm text-muted-foreground mt-2">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}