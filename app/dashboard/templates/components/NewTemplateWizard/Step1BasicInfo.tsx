"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step1BasicInfoProps {
  data?: any;
  onChange?: (data: any) => void;
}

const CATEGORIES = [
  "Video Marketing",
  "Social Media",
  "Educational",
  "Entertainment",
  "Tutorial",
  "Product Demo",
];

export default function Step1BasicInfo({
  data = {},
  onChange,
}: Step1BasicInfoProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-2">
              Template Name
            </label>
            <Input
              placeholder="Enter template name"
              value={data.name || ""}
              onChange={(e) => onChange?.({ ...data, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Purpose</label>
            <Textarea
              placeholder="Describe the purpose of this template"
              value={data.purpose || ""}
              onChange={(e) => onChange?.({ ...data, purpose: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Category</label>
            <Select value={data.category || ""} onValueChange={(value) => onChange?.({ ...data, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
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

          <div>
            <label className="text-sm font-medium block mb-2">
              Short Description
            </label>
            <Textarea
              placeholder="A brief description of this template"
              value={data.shortDescription || ""}
              onChange={(e) =>
                onChange?.({ ...data, shortDescription: e.target.value })
              }
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
