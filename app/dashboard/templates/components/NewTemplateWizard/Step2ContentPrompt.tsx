"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Step2ContentPromptProps {
  data?: any;
  onChange?: (data: any) => void;
}

export default function Step2ContentPrompt({
  data = {},
  onChange,
}: Step2ContentPromptProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Content Creation Prompt</h3>
        <Textarea
          placeholder="Enter AI instructions for content generation..."
          value={data.contentPrompt || ""}
          onChange={(e) =>
            onChange?.({ ...data, contentPrompt: e.target.value })
          }
          className="min-h-[200px]"
        />
        <p className="text-sm text-muted-foreground mt-2">
          Describe what content you want the AI to generate
        </p>
      </Card>
    </div>
  );
}
