"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface DuplicateTemplateProps {
  template?: any;
  onDuplicate?: (template: any) => void;
}

export default function DuplicateTemplate({
  template,
  onDuplicate,
}: DuplicateTemplateProps) {
  const handleDuplicate = () => {
    const duplicated = {
      ...template,
      id: "template_" + Date.now(),
      name: `${template?.name} (Copy)`,
    };
    onDuplicate?.(duplicated);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDuplicate}
      className="gap-2"
    >
      <Copy className="h-4 w-4" />
      Duplicate
    </Button>
  );
}
