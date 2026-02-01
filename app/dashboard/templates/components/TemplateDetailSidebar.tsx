"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  X,
  Edit2,
  Save,
  Copy,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Video,
  ChevronDown,
  ChevronRight,
  Settings,
} from "lucide-react";
import { templates } from "../data/templates";
import ParameterEditor from "./ParameterEditor";
import { getCategoryIcon } from "@/lib/utils";

interface TemplateDetailSidebarProps {
  templateId: string | null;
  onClose: () => void;
}

export default function TemplateDetailSidebar({
  templateId,
  onClose,
}: TemplateDetailSidebarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTemplate, setEditedTemplate] = useState<any>(null);
  const [expandedSections, setExpandedSections] = useState({
    contentPrompt: true,
    imageParams: true,
    videoParams: true,
  });

  const template = templates.find((t) => t.id === templateId);

  useEffect(() => {
    if (template) {
      setEditedTemplate({ ...template });
    }
  }, [template]);

  if (!template || !editedTemplate) return null;

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSave = () => {
    // Save logic here
    console.log("Saving template:", editedTemplate);
    setIsEditing(false);
  };

  // Get the Icon component
  const Icon = getCategoryIcon(template.category);

  return (
    <AnimatePresence>
      <Sheet open={!!templateId} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="w-full sm:max-w-2xl border-l border-input bg-background overflow-y-auto">
          <SheetHeader className="border-b border-input pb-6">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  {isEditing ? (
                    <Input
                      value={editedTemplate.name}
                      onChange={(e) => setEditedTemplate({
                        ...editedTemplate,
                        name: e.target.value
                      })}
                      className="text-lg font-semibold border-input"
                    />
                  ) : (
                    <span className="text-lg font-semibold text-foreground">
                      {template.name}
                    </span>
                  )}
                  <Badge variant="secondary" className="mt-1 bg-muted">
                    {template.category}
                  </Badge>
                </div>
              </SheetTitle>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(false)}
                      className="border-input"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="bg-foreground text-background hover:bg-foreground/90"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="border-input"
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-input"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </Button>
                  </>
                )}
              </div>
            </div>
            <SheetDescription className="pt-4">
              {isEditing ? (
                <Input
                  value={editedTemplate.purpose}
                  onChange={(e) => setEditedTemplate({
                    ...editedTemplate,
                    purpose: e.target.value
                  })}
                  placeholder="Template purpose"
                  className="border-input"
                />
              ) : (
                <p className="text-muted-foreground">{template.purpose}</p>
              )}
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 py-6">
            {/* Basic Information */}
            <Card className="border-input bg-card/50">
              <div className="p-4">
                <h3 className="mb-4 flex items-center justify-between text-sm font-semibold text-foreground">
                  <span>Basic Information</span>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground/80">
                      Short Description
                    </label>
                    {isEditing ? (
                      <Textarea
                        value={editedTemplate.shortDescription}
                        onChange={(e) => setEditedTemplate({
                          ...editedTemplate,
                          shortDescription: e.target.value
                        })}
                        className="min-h-[80px] border-input"
                        placeholder="Enter a brief description of this template..."
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {template.shortDescription}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Content Creation Prompt */}
            <Card className="border-input bg-card/50">
              <button
                onClick={() => toggleSection('contentPrompt')}
                className="flex w-full items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-foreground">
                      Content Creation Prompt
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      AI instructions for content generation
                    </p>
                  </div>
                </div>
                {expandedSections.contentPrompt ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              
              <AnimatePresence>
                {expandedSections.contentPrompt && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="border-t border-input p-4">
                      {isEditing ? (
                        <Textarea
                          value={editedTemplate.contentPrompt}
                          onChange={(e) => setEditedTemplate({
                            ...editedTemplate,
                            contentPrompt: e.target.value
                          })}
                          className="min-h-[200px] border-input font-mono text-sm"
                          placeholder="Enter AI prompt for content generation..."
                        />
                      ) : (
                        <div className="rounded-md bg-muted/30 p-4">
                          <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-mono">
                            {template.contentPrompt}
                          </pre>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Image Shot Parameters */}
            <Card className="border-input bg-card/50">
              <button
                onClick={() => toggleSection('imageParams')}
                className="flex w-full items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-foreground">
                      Image Shot Parameters
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {template.imageParameters.length} parameters configured
                    </p>
                  </div>
                </div>
                {expandedSections.imageParams ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              
              <AnimatePresence>
                {expandedSections.imageParams && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="border-t border-input p-4">
                      <ParameterEditor
                        parameters={editedTemplate.imageParameters}
                        onChange={(params) => setEditedTemplate({
                          ...editedTemplate,
                          imageParameters: params
                        })}
                        isEditing={isEditing}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Video Shot Parameters */}
            <Card className="border-input bg-card/50">
              <button
                onClick={() => toggleSection('videoParams')}
                className="flex w-full items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                    <Video className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-foreground">
                      Video Shot Parameters
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {template.videoParameters.length} parameters configured
                    </p>
                  </div>
                </div>
                {expandedSections.videoParams ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              
              <AnimatePresence>
                {expandedSections.videoParams && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="border-t border-input p-4">
                      <ParameterEditor
                        parameters={editedTemplate.videoParameters}
                        onChange={(params) => setEditedTemplate({
                          ...editedTemplate,
                          videoParameters: params
                        })}
                        isEditing={isEditing}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>

          <div className="sticky bottom-0 border-t border-input bg-background p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <p>Created: {new Date(template.createdAt).toLocaleDateString()}</p>
                <p>Last Modified: {new Date(template.updatedAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-input"
                >
                  Close
                </Button>
                {!isEditing && (
                  <Button
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive/10 border-input"
                    onClick={() => {
                      // Deactivate logic
                      onClose();
                    }}
                  >
                    <EyeOff className="mr-2 h-4 w-4" />
                    Deactivate
                  </Button>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </AnimatePresence>
  );
}