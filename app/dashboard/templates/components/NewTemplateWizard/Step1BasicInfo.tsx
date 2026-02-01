"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingBag,
  Home,
  FileText,
  Coffee,
  Laptop,
  Car,
  Globe,
  BookOpen,
  Palette,
} from "lucide-react";
import { ProjectTemplate } from "../../types/template.types";

interface Step1BasicInfoProps {
  template: ProjectTemplate;
  onUpdate: (updates: Partial<ProjectTemplate>) => void;
}

const categories = [
  { value: "E-commerce", label: "E-commerce", icon: ShoppingBag },
  { value: "Property", label: "Property", icon: Home },
  { value: "Lifestyle", label: "Lifestyle", icon: FileText },
  { value: "Hospitality", label: "Hospitality", icon: Coffee },
  { value: "Technology", label: "Technology", icon: Laptop },
  { value: "Automotive", label: "Automotive", icon: Car },
  { value: "Travel", label: "Travel", icon: Globe },
  { value: "Education", label: "Education", icon: BookOpen },
  { value: "Other", label: "Other", icon: Palette },
];

export default function Step1BasicInfo({ template, onUpdate }: Step1BasicInfoProps) {
  return (
   <div className="w-full h-screen flex flex-col animate-in fade-in duration-300">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
        <p className="text-sm text-muted-foreground">
          Define the core details of your template
        </p>
      </div>

      <Card className="border-input bg-card/50 p-6">
        <div className="w-full h-screen flex flex-col animate-in fade-in duration-300">
          {/* Template Name */}
          <div className="w-full h-screen flex flex-col animate-in fade-in duration-300">
            <Label htmlFor="name" className="text-foreground/80">
              Template Name *
            </Label>
            <Input
              id="name"
              value={template.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="e.g., Kitchen Appliance Commercial"
              className="border-input"
              required
            />
            <p className="text-xs text-muted-foreground">
              Choose a descriptive name for easy identification
            </p>
          </div>

          {/* Category */}
          <div className="w-full h-screen flex flex-col animate-in fade-in duration-300">
            <Label htmlFor="category" className="text-foreground/80">
              Category *
            </Label>
            <Select
              value={template.category}
              onValueChange={(value) => onUpdate({ category: value })}
            >
              <SelectTrigger className="border-input">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {category.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 pt-2">
              {categories.slice(0, 5).map((cat) => (
                <Badge
                  key={cat.value}
                  variant={template.category === cat.value ? "default" : "secondary"}
                  className={`cursor-pointer ${template.category === cat.value ? "bg-foreground text-background" : "bg-muted"}`}
                  onClick={() => onUpdate({ category: cat.value })}
                >
                  <cat.icon className="mr-1 h-3 w-3" />
                  {cat.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Purpose */}
          <div className="w-full h-screen flex flex-col animate-in fade-in duration-300">
            <Label htmlFor="purpose" className="text-foreground/80">
              Purpose *
            </Label>
            <Input
              id="purpose"
              value={template.purpose}
              onChange={(e) => onUpdate({ purpose: e.target.value })}
              placeholder="e.g., Create promotional videos for kitchen appliances"
              className="border-input"
              required
            />
            <p className="text-xs text-muted-foreground">
              What is this template designed to accomplish?
            </p>
          </div>

          {/* Short Description */}
         <div className="w-full h-screen flex flex-col animate-in fade-in duration-300">
            <Label htmlFor="description" className="text-foreground/80">
              Short Description *
            </Label>
            <Textarea
              id="description"
              value={template.shortDescription}
              onChange={(e) => onUpdate({ shortDescription: e.target.value })}
              placeholder="e.g., Professional template for showcasing kitchen appliances with lifestyle shots"
              className="min-h-[100px] border-input"
              required
            />
            <p className="text-xs text-muted-foreground">
              Brief description that appears in template listings
            </p>
          </div>

          {/* Example Preview */}
          <div className="rounded-lg border border-input p-4">
            <h4 className="mb-3 text-sm font-medium text-foreground">Preview</h4>
         <div className="w-full h-screen flex flex-col animate-in fade-in duration-300">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  {(() => {
                    const cat = categories.find(c => c.value === template.category);
                    const Icon = cat?.icon || Palette;
                    return <Icon className="h-5 w-5 text-muted-foreground" />;
                  })()}
                </div>
                <div>
                  <h5 className="font-medium text-foreground">
                    {template.name || "Template Name"}
                  </h5>
                  <Badge variant="secondary" className="mt-1 bg-muted">
                    {template.category || "Category"}
                  </Badge>
                </div>
              </div>
         <div className="w-full h-screen flex flex-col animate-in fade-in duration-300">
                <div>
                  <span className="text-xs font-medium text-foreground/80">Purpose:</span>
                  <p className="text-sm text-muted-foreground">
                    {template.purpose || "Template purpose will appear here"}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium text-foreground/80">Description:</span>
                  <p className="text-sm text-muted-foreground">
                    {template.shortDescription || "Template description will appear here"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}