"use client";

import { X, Edit, Copy, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useTemplates } from "../hooks/useTemplates";

interface Props {
  templateId: string | null;
  onClose: () => void;
}

export default function TemplateDetailSidebar({ templateId, onClose }: Props) {
  const {
    templates,
    updateTemplate,
    duplicateTemplate,
  } = useTemplates();

  const template = templates.find(t => t.id === templateId);
  if (!template) return null;

  return (
    <div className="w-[380px] h-screen border-l bg-background animate-in slide-in-from-right">
      {/* Header */}
      <div className="p-4 border-b flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">{template.name}</h2>
          <div className="flex gap-2 mt-1">
            <Badge variant="secondary">{template.category}</Badge>
            {template.isActive && <Badge>Active</Badge>}
          </div>
        </div>
        <Button size="icon" variant="ghost" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-200px)]">
        <Card className="p-3">
          <p className="text-sm font-medium mb-1">Purpose</p>
          <p className="text-sm text-muted-foreground">
            {template.purpose}
          </p>
        </Card>

        <Card className="p-3">
          <p className="text-sm font-medium mb-1">Content Prompt</p>
          <pre className="text-xs bg-muted p-2 rounded whitespace-pre-wrap">
            {template.contentPrompt}
          </pre>
        </Card>

        <Card className="p-3">
          <p className="text-sm font-medium">
            Image Parameters ({template.imageParameters.length})
          </p>
        </Card>

        <Card className="p-3">
          <p className="text-sm font-medium">
            Video Parameters ({template.videoParameters.length})
          </p>
        </Card>
      </div>

      {/* Actions */}
      <div className="p-4 border-t space-y-2">
        <Button className="w-full">
          <Edit className="h-4 w-4 mr-2" />
          Edit Template
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => duplicateTemplate(template.id)}
        >
          <Copy className="h-4 w-4 mr-2" />
          Duplicate
        </Button>

        <Button
          variant="destructive"
          className="w-full"
          onClick={() => {
            updateTemplate(template.id, { isActive: false });
            onClose();
          }}
        >
          <Power className="h-4 w-4 mr-2" />
          Deactivate
        </Button>
      </div>
    </div>
  );
}
