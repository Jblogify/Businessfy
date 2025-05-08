"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    if (!isLoading) {
      if (!user && !isLoginPage) {
        router.push(`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`)
      } else if (user && isLoginPage) {
        router.push("/admin")
      }
    }
  }, [user, isLoading, router, pathname, isLoginPage])

  // Show nothing while checking authentication
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  // Show login page without admin layout
  if (isLoginPage) {
    return children
  }

  // Show admin layout for authenticated users
  if (user) {
    return (
      <div className="flex h-screen flex-col md:flex-row">
        <AdminSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto bg-gray-100 p-4">{children}</main>
        </div>
      </div>
    )
  }

  // Fallback while redirecting
  return null
}
