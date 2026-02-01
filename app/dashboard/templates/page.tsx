"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Search,
  Filter,
  Grid3x3,
  List,
  Settings,
  MoreVertical,
} from "lucide-react";
import TemplateGrid from "./components/TemplateGrid";
import TemplateDetailSidebar from "./components/TemplateDetailSidebar";
import NewTemplateWizard from "./components/NewTemplateWizard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  { id: "all", name: "All Templates", count: 12 },
  { id: "ecommerce", name: "E-commerce", count: 4 },
  { id: "property", name: "Property", count: 3 },
  { id: "lifestyle", name: "Lifestyle", count: 2 },
  { id: "technology", name: "Technology", count: 2 },
  { id: "education", name: "Education", count: 1 },
];

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                Configure Project Type
              </h1>
              <p className="mt-2 text-muted-foreground">
                Manage and create reusable project templates
              </p>
            </div>
            <Button
              onClick={() => setShowNewTemplate(true)}
              className="gap-2 bg-foreground text-background hover:bg-foreground/90"
            >
              <Plus className="h-4 w-4" />
              New Template
            </Button>
          </div>
        </motion.div>

        <Separator className="my-6" />

        {/* Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search templates by name, purpose, or description..."
                className="pl-10 bg-muted/50 border-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-input"
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <div className="flex border border-input rounded-md">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-r-none border-r border-input"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={activeCategory === category.id ? "default" : "secondary"}
                className={`cursor-pointer px-3 py-1.5 text-sm font-normal transition-colors ${
                  activeCategory === category.id
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
                <span className="ml-2 rounded-full bg-background/20 px-2 py-0.5 text-xs">
                  {category.count}
                </span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Card className="border-input bg-card/50 overflow-hidden">
          <Tabs defaultValue="active" className="w-full">
            <div className="border-b border-input">
              <TabsList className="h-12 px-4 bg-transparent">
                <TabsTrigger 
                  value="active" 
                  className="data-[state=active]:bg-muted data-[state=active]:text-foreground"
                >
                  Active Templates
                </TabsTrigger>
                <TabsTrigger 
                  value="inactive" 
                  className="data-[state=active]:bg-muted data-[state=active]:text-foreground"
                >
                  Inactive Templates
                </TabsTrigger>
                <TabsTrigger 
                  value="archived" 
                  className="data-[state=active]:bg-muted data-[state=active]:text-foreground"
                >
                  Archived
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="active" className="m-0 p-6">
              <TemplateGrid
                viewMode={viewMode}
                searchQuery={searchQuery}
                category={activeCategory}
                onTemplateSelect={setSelectedTemplate}
              />
            </TabsContent>
            <TabsContent value="inactive" className="m-0 p-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">No inactive templates</p>
              </div>
            </TabsContent>
            <TabsContent value="archived" className="m-0 p-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">No archived templates</p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* Sidebar */}
      <TemplateDetailSidebar
        templateId={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
      />

      {/* New Template Wizard */}
      {showNewTemplate && (
        <NewTemplateWizard onClose={() => setShowNewTemplate(false)} />
      )}
    </div>
  );
}