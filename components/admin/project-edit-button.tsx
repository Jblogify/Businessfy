"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import Link from "next/link"

interface ProjectEditButtonProps {
  projectId: string
}

export function ProjectEditButton({ projectId }: ProjectEditButtonProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <Link href={`/admin/projects/edit/${projectId}`} passHref>
      <Button variant="outline" size="sm" className="absolute right-2 top-2 bg-amber-100 hover:bg-amber-200">
        <Edit className="mr-1 h-4 w-4" />
        Edit
      </Button>
    </Link>
  )
}
