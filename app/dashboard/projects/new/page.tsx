"use client"

import { useRouter } from "next/navigation"
import ProjectEditor from "@/components/projects/ProjectEditor"
import { Project } from "@/components/projects/types"

export default function NewProjectPage() {
  const router = useRouter()

  const blank: Project = {
    id: `proj-${Date.now()}`,
    name: "",
    description: "",
    type: "Product Marketing",
    status: "active",
    videos: [],
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  }

  return (
    <ProjectEditor initialProject={blank} onSave={(p:any)=>{ console.log('saved', p); router.push('/dashboard/projects') }} onClose={() => router.push('/dashboard/projects')} />
  )
}
