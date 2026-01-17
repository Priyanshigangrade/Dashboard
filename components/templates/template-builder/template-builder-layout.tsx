"use client"

import TemplateLeftSidebar from "./template-left-sidebar"
import ShotBlockEditor from "./shot-block-editor"
import TemplatePreviewPanel from "./template-preview-panel"

export default function TemplateBuilderLayout() {
  return (
    <div className="grid h-[calc(100vh-80px)] grid-cols-12 gap-4">
      {/* Left */}
      <div className="col-span-3 rounded-2xl border">
        <TemplateLeftSidebar />
      </div>

      {/* Middle */}
      <div className="col-span-6 rounded-2xl border">
        <ShotBlockEditor />
      </div>

      {/* Right */}
      <div className="col-span-3 rounded-2xl border">
        <TemplatePreviewPanel />
      </div>
    </div>
  )
}
