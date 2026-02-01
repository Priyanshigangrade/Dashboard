"use client"
import { useEffect, useMemo, useState } from "react"
import { Project, Video } from "./types"
import Stage1 from "./stages/Stage1"
import Stage2 from "./stages/Stage2"
import Stage3 from "./stages/Stage3"
import Stage4 from "./stages/Stage4"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import ProjectEditor from "./ProjectEditor"

export default function ProjectModal({ project: initialProject, onClose, onSave }: any) {
  return (
    <Dialog open>
      <DialogContent className="!fixed !inset-0 !top-0 !left-0 !translate-x-0 !translate-y-0 !m-0 !w-screen !h-screen !max-w-none !rounded-none !p-0">
        <ProjectEditor initialProject={initialProject} onSave={onSave} onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}
