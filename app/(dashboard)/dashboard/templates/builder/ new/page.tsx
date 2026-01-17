import TemplateBuilderLayout from "@/components/templates/template-builder/template-builder-layout"

export default function NewTemplateBuilderPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Create Template</h1>
        <p className="text-sm text-muted-foreground">
          Build your reusable shot workflow
        </p>
      </div>

      <TemplateBuilderLayout />
    </div>
  )
}
