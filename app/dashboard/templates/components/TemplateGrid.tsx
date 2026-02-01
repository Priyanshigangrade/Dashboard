"use client";

import { motion } from "framer-motion";
import TemplateCard from "./TemplateCard";
import { useTemplates } from "../hooks/useTemplates";

interface TemplateGridProps {
  viewMode: "grid" | "list";
  searchQuery: string;
  category: string;
  onTemplateSelect: (id: string) => void;
}

export default function TemplateGrid({
  viewMode,
  searchQuery,
  category,
  onTemplateSelect,
}: TemplateGridProps) {
  const { templates, searchTemplates, filterTemplatesByCategory } = useTemplates();

  // Apply search filter
  let filteredTemplates = searchQuery.trim() 
    ? searchTemplates(searchQuery)
    : templates;

  // Apply category filter
  if (category && category !== "all" && category !== "ecommerce" && category !== "property" && category !== "lifestyle" && category !== "technology" && category !== "education") {
    filteredTemplates = filteredTemplates.filter(t => t.category.toLowerCase().includes(category.toLowerCase()));
  } else if (category && category !== "all") {
    // Map category IDs to actual category names
    const categoryMap: Record<string, string> = {
      ecommerce: "E-commerce",
      property: "Property",
      lifestyle: "Lifestyle",
      technology: "Technology",
      education: "Education",
    };
    const mappedCategory = categoryMap[category];
    if (mappedCategory) {
      filteredTemplates = filterTemplatesByCategory(mappedCategory);
    }
  }

  // Filter for active templates
  filteredTemplates = filteredTemplates.filter(t => t.isActive);

  if (filteredTemplates.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto max-w-md space-y-4">
          <h3 className="text-lg font-medium text-foreground">No templates found</h3>
          <p className="text-muted-foreground">
            {searchQuery 
              ? "Try adjusting your search terms" 
              : "Create your first template to get started"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={viewMode === "grid" 
      ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" 
      : "space-y-4"
    }>
      {filteredTemplates.map((template, index) => (
        <motion.div
          key={template.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <TemplateCard
            template={template}
            onView={onTemplateSelect}
            variant={viewMode}
          />
        </motion.div>
      ))}
    </div>
  );
}