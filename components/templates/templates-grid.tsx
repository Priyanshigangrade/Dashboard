"use client"

import { Template } from "./types"
import { NewTemplateCard, TemplateCard } from "./template-card"

export default function TemplatesGrid({
  templates,
  onNewTemplate,
}: {
  templates: Template[]
  onNewTemplate: () => void
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <NewTemplateCard onClick={onNewTemplate} />
      {templates.map((t) => (
        <TemplateCard key={t.id} template={t} />
      ))}
    </div>
  )
}
