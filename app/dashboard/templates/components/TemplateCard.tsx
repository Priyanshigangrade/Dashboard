"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Copy, Power } from "lucide-react";

interface TemplateCardProps {
  template: any;
  onView?: (id: string) => void;
}

export default function TemplateCard({ template, onView }: TemplateCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      {/* Header / Thumbnail */}
      <div
        className="relative h-32 w-full bg-muted"
        style={{
          backgroundImage: `url('https://source.unsplash.com/collection/190727/800x600?sig=${template.id}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Category */}
        <div className="absolute left-3 top-3">
          <Badge variant="secondary" className="text-xs bg-white/10 text-white">
            {template.category}
          </Badge>
        </div>

        {/* Status */}
        <div className="absolute right-3 top-3">
          <Badge
            variant={template.isActive ? "default" : "outline"}
            className="capitalize text-xs"
          >
            {template.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardContent className="pt-4">
        <h3 className="font-semibold truncate">{template.name}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {template.shortDescription}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col gap-3 pt-0">
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <span>{template.imageParameters?.length || 0} params</span>
          <span>
            {new Intl.DateTimeFormat("en-GB").format(
              new Date(template.createdAt)
            )}
          </span>
        </div>

        <div className="flex items-center gap-2 w-full">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => onView?.(template.id)}
          >
            <Edit className="h-3.5 w-3.5 mr-1" />
            Configure
          </Button>

          <Button size="sm" variant="ghost">
            <Copy className="h-3.5 w-3.5" />
          </Button>

          <Button size="sm" variant="ghost">
            <Power className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
