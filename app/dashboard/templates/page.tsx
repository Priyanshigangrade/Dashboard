"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus, Search } from "lucide-react";
import TemplateGrid from "./components/TemplateGrid";
import TemplateDetailSidebar from "./components/TemplateDetailSidebar";
import NewTemplateWizard from "./components/NewTemplateWizard";

export default function TemplatesPage() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Header */}
      <div className="px-6 py-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">
              Configure Project Type
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and create reusable project templates
            </p>
          </div>

          <Button onClick={() => setShowNewTemplate(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>

        <Separator className="my-4" />

        <div className="relative max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex w-full h-[calc(100vh-120px)]">
        {/* Grid */}
        <div
          className={`transition-all duration-300 ${
            selectedTemplateId ? "w-[calc(100%-420px)]" : "w-full"
          } overflow-y-auto px-6 py-6`}
        >
          <TemplateGrid
            viewMode="grid"
            searchQuery={searchQuery}
            category="all"
            onTemplateSelect={setSelectedTemplateId}
          />
        </div>

        {/* Sidebar */}
        {selectedTemplateId && (
          <TemplateDetailSidebar
            templateId={selectedTemplateId}
            onClose={() => setSelectedTemplateId(null)}
          />
        )}
      </div>

      {/* Full-screen Wizard */}
      {showNewTemplate && (
        <NewTemplateWizard onClose={() => setShowNewTemplate(false)} />
      )}
    </div>
  );
}
