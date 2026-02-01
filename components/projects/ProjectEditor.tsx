"use client"

import { useEffect, useState } from "react"
import { Project, Video } from "./types"
import Stage1 from "./stages/Stage1"
import Stage2 from "./stages/Stage2"
import Stage3 from "./stages/Stage3"
import Stage4 from "./stages/Stage4"
import Stage5 from "./stages/Stage5"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function ProjectEditor({ initialProject, onSave, onClose }: { initialProject: Project, onSave?: (p: Project) => void, onClose?: () => void }) {
  const makeDefaultVideo = (): Video => ({
    id: `vid-${Date.now()}`,
    name: "Video 1",
    description: "",
    stage1: { numShots: 8, durationPerShot: 8, contentPrompt: "", productImages: [], referenceImages: [], imageParameters: [] },
    stage2: { shots: [], comments: [] },
    stage3: { generatedImages: [] },
    stage4: { videoPrompts: [], generatedVideos: [] },
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  })

  const [project, setProject] = useState<Project>(() => {
    if (initialProject.videos && initialProject.videos.length > 0) return initialProject
    return { ...initialProject, videos: [makeDefaultVideo()] }
  })

  const [stage, setStage] = useState(1)

  const video = project.videos[0]

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between py-4 px-4">
          <DialogTitle>Project: {project.name || 'New Project'}</DialogTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => { onSave && onSave(project); onClose && onClose(); }}>Save</Button>
            <Button onClick={() => { onClose && onClose(); }}>Close</Button>
          </div>
        </div>

        <div className="flex gap-2 items-center pb-3 px-4">
          {[1, 2, 3, 4].map((n) => (
            <Button key={n} variant={stage === n ? "default" : "ghost"} onClick={() => setStage(n)}>
              Stage {n}
            </Button>
          ))}
        </div>

        <div className="px-4 pb-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Project Name*</Label>
              <Input value={project.name} onChange={(e)=>setProject(p=>({...p, name: e.target.value}))} />
            </div>
            <div>
              <Label>Project Type*</Label>
              <select value={project.type} onChange={(e)=>setProject(p=>({...p, type: e.target.value}))} className="w-full border rounded px-2 py-1 mt-1">
                <option>Kitchen Appliance Commercial</option>
                <option>Real Estate Marketing</option>
                <option>Product Marketing</option>
                <option>Social Media Ads</option>
              </select>
            </div>
            <div className="col-span-2">
              <Label>Project Description</Label>
              <Textarea value={project.description} onChange={(e)=>setProject(p=>({...p, description: e.target.value}))} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Videos</h3>
            <div>
              <Button size="sm" onClick={() => {
                const newVid: Video = {
                  id: `vid-${Date.now()}`,
                  name: `Video ${project.videos.length + 1}`,
                  description: "",
                  stage1: { numShots: 8, durationPerShot: 8, contentPrompt: "", productImages: [], referenceImages: [], imageParameters: [] },
                  stage2: { shots: [], comments: [] },
                  stage3: { generatedImages: [] },
                  stage4: { videoPrompts: [], generatedVideos: [] },
                  created: new Date().toISOString(),
                  modified: new Date().toISOString(),
                }
                setProject(p => ({ ...p, videos: [...p.videos, newVid] }))
                setStage(1)
              }}>Create New Video</Button>
            </div>
          </div>

          <div className="mb-6">
            <table className="w-full text-sm">
              <thead className="text-slate-600">
                <tr>
                  <th className="text-left">Video ID</th>
                  <th className="text-left">Video Name</th>
                  <th className="text-left">Description</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {project.videos.map((v, idx) => (
                  <tr key={v.id} className="border-t">
                    <td className="py-2">{v.id}</td>
                    <td className="py-2"><input value={v.name} onChange={(e)=>{ const next = [...project.videos]; next[idx] = { ...v, name: e.target.value }; setProject(p=>({...p, videos: next})); }} className="w-full border rounded px-2 py-1"/></td>
                    <td className="py-2"><input value={v.description} onChange={(e)=>{ const next = [...project.videos]; next[idx] = { ...v, description: e.target.value }; setProject(p=>({...p, videos: next})); }} className="w-full border rounded px-2 py-1"/></td>
                    <td className="py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={()=>{ setStage(1); const next = [...project.videos]; const sel = next.splice(idx,1)[0]; next.unshift(sel); setProject(p=>({...p, videos: next})); }}>Edit</Button>
                        <Button size="sm" variant="ghost" onClick={()=>{ if (!confirm('Duplicate video?')) return; const copy = { ...v, id: `${v.id}-copy-${Date.now()}`, name: `${v.name} - Copy` }; setProject(p=>({...p, videos: [...p.videos, copy]})); }}>Duplicate</Button>
                        <Button size="sm" variant="ghost" onClick={()=>{ if (!confirm('Delete video?')) return; setProject(p=>({...p, videos: project.videos.filter(x=>x.id!==v.id)})); }}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="min-h-[70vh] max-h-[calc(100vh-160px)] overflow-y-auto">
            {stage === 1 && <Stage1 video={project.videos[0]} onChange={(patch:any)=>{ setProject(p=>({ ...p, videos: p.videos.map((vv,i)=> i===0?{...vv,...patch}:vv) })) }} onGenerateShots={()=>setStage(2)} />}
            {stage === 2 && <Stage2 video={project.videos[0]} onChange={(patch:any)=>{ setProject(p=>({ ...p, videos: p.videos.map((vv,i)=> i===0?{...vv,...patch}:vv) })) }} onGenerateImages={()=>setStage(3)} />}
            {stage === 3 && <Stage3 video={project.videos[0]} onChange={(patch:any)=>{ setProject(p=>({ ...p, videos: p.videos.map((vv,i)=> i===0?{...vv,...patch}:vv) })) }} onGenerateImages={()=>{}} />}
            {stage === 4 && <Stage4 video={project.videos[0]} onChange={(patch:any)=>{ setProject(p=>({ ...p, videos: p.videos.map((vv,i)=> i===0?{...vv,...patch}:vv) })) }} onGenerateVideoPrompts={()=>{}} onGenerateVideos={()=>{}} />}
          </div>
        </div>
      </div>
    </div>
  )
}
