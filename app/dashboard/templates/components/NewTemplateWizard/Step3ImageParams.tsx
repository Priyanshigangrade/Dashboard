"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ParameterEditor from "../ParameterEditor";

interface Step3ImageParamsProps {
  data?: any;
  onChange?: (data: any) => void;
}

export default function Step3ImageParams({
  data = { imageParameters: [] },
  onChange,
}: Step3ImageParamsProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Image Shot Parameters</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Define the parameters for image generation in your template
        </p>
        <ParameterEditor
          parameters={data.imageParameters || []}
          onChange={(params) =>
            onChange?.({ ...data, imageParameters: params })
          }
          allowedTypes={['text', 'number', 'file']}
        />
      </Card>
    </div>
  );
}
