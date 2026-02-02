"use client";

import TemplateCard from "./TemplateCard";
import { useTemplates } from "../hooks/useTemplates";

interface TemplateGridProps {
  searchQuery: string;
  category: string;
  onTemplateSelect: (id: string) => void;
}

export default function TemplateGrid({
  searchQuery,
  category,
  onTemplateSelect,
}: TemplateGridProps) {
  const { templates, searchTemplates, filterTemplatesByCategory } =
    useTemplates();

  let filtered = searchQuery
    ? searchTemplates(searchQuery)
    : templates;

  if (category && category !== "all") {
    filtered = filterTemplatesByCategory(category);
  }

  filtered = filtered.filter((t) => t.isActive);

  if (filtered.length === 0) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        No templates found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onView={onTemplateSelect}
        />
      ))}
    </div>
  );
}
