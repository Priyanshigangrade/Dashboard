import Link from "next/link"

import { Button } from "@/components/ui/button"
import TemplateBuilderLayout from "@/components/templates/template-builder/template-builder-layout"

export default function NewTemplateBuilderPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Create Template</h1>
          <p className="text-sm text-muted-foreground">
            Build your reusable shot workflow
          </p>
        </div>

        <Button asChild variant="secondary">
          <Link href="/dashboard/templates">Back</Link>
        </Button>
      </div>

      <TemplateBuilderLayout />
    </div>
  )
}
