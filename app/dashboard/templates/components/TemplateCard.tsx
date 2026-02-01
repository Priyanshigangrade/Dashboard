"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface TemplateCardProps {
  template: any;
  onView?: (id: string) => void;
  variant?: "grid" | "list";
}

export default function TemplateCard({
  template,
  onView,
  variant = "grid",
}: TemplateCardProps) {
  console.log('TemplateCard rendering with:', template);

  if (variant === "list") {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{template?.name || "Template"}</h3>
            <Badge variant="secondary" className="mt-1">
              {template?.category || "General"}
            </Badge>
          </div>
          <Button size="sm" onClick={() => onView?.(template?.id)}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
        </div>
      </Card>
    );
  }

  // Grid variant
  return (
    <Card className="p-6">
      <div className="mb-4">
        <Badge variant="outline" className="mb-2">
          {template?.category || "General"}
        </Badge>
        <h3 className="font-semibold text-lg">{template?.name || "Template"}</h3>
        <p className="text-sm text-muted-foreground mt-2">
          {template?.purpose || "No description available"}
        </p>
      </div>
      <Button 
        className="w-full" 
        onClick={() => onView?.(template?.id)}
      >
        Configure
      </Button>
    </Card>
  );
}