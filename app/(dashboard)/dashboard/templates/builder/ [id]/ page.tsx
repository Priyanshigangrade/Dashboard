import TemplateBuilderLayout from "@/components/templates/template-builder/template-builder-layout"

export default function EditTemplateBuilderPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Edit Template</h1>
        <p className="text-sm text-muted-foreground">
          Modify workflow, shots and preview output
        </p>
      </div>

      <TemplateBuilderLayout />
    </div>
  )
}
