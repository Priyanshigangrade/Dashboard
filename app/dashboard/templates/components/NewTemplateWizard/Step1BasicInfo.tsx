"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step1BasicInfoProps {
  data: any;
  onChange: (data: any) => void;
}

const CATEGORIES = [
  "E-commerce",
  "Property",
  "Lifestyle",
  "Technology",
  "Education",
];

export default function Step1BasicInfo({
  data,
  onChange,
}: Step1BasicInfoProps) {
  return (
    <div className="w-full h-full overflow-y-auto px-8 py-8">
      {/* Header */}
      <div className="mb-8 border-b pb-4">
        <h2 className="text-2xl font-semibold">
          Step 1 — Template Basics
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Define the identity and purpose of this reusable project template
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl">
        <Card className="p-6 space-y-6">
          {/* Template Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Template Name</label>
            <Input
              placeholder="e.g. Kitchen Appliance Commercial"
              value={data.name || ""}
              onChange={(e) =>
                onChange({ ...data, name: e.target.value })
              }
            />
          </div>

          {/* Purpose */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Purpose</label>
            <Textarea
              placeholder="Describe what this template is used for"
              className="min-h-[100px]"
              value={data.purpose || ""}
              onChange={(e) =>
                onChange({ ...data, purpose: e.target.value })
              }
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              value={data.category || ""}
              onValueChange={(value) =>
                onChange({ ...data, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Short Description
            </label>
            <Textarea
              placeholder="One-line summary shown in template cards"
              className="min-h-[80px]"
              value={data.shortDescription || ""}
              onChange={(e) =>
                onChange({
                  ...data,
                  shortDescription: e.target.value,
                })
              }
            />
            <p className="text-xs text-muted-foreground">
              This appears in the template grid and sidebar preview.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
