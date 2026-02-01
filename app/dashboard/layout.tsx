"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/dashboard/app-sidebar"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"

export default function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      // Check for auth token in cookies
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1]

      if (!token) {
        // Redirect to login if no token
        router.push("/login")
      } else {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}