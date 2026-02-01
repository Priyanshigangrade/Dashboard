"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Parameter {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  defaultValue?: any;
}

interface ParameterEditorProps {
  parameters: Parameter[];
  onChange: (parameters: Parameter[]) => void;
  isEditing?: boolean;
}

export default function ParameterEditor({
  parameters,
  onChange,
  isEditing = false,
}: ParameterEditorProps) {
  const handleParameterChange = (
    index: number,
    field: string,
    value: any
  ) => {
    const updated = [...parameters];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  const removeParameter = (index: number) => {
    const updated = parameters.filter((_, i) => i !== index);
    onChange(updated);
  };

  const addParameter = () => {
    onChange([
      ...parameters,
      { name: "param_" + Date.now(), type: "string" },
    ]);
  };

  if (!isEditing) {
    return (
      <div className="space-y-2">
        {parameters.length === 0 ? (
          <p className="text-sm text-muted-foreground">No parameters</p>
        ) : (
          parameters.map((param, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded">
              <div>
                <p className="font-medium text-sm">{param.name}</p>
                <p className="text-xs text-muted-foreground">{param.type}</p>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {parameters.map((param, i) => (
        <div key={i} className="flex gap-2 items-end">
          <div className="flex-1 space-y-1">
            <label className="text-xs font-medium">Name</label>
            <Input
              value={param.name}
              onChange={(e) => handleParameterChange(i, "name", e.target.value)}
              className="h-8"
              placeholder="Parameter name"
            />
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-xs font-medium">Type</label>
            <Input
              value={param.type}
              onChange={(e) => handleParameterChange(i, "type", e.target.value)}
              className="h-8"
              placeholder="Type"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeParameter(i)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={addParameter}
        className="w-full"
      >
        Add Parameter
      </Button>
    </div>
  );
}
