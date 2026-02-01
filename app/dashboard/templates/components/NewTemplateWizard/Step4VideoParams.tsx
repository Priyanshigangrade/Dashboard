"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ParameterEditor from "../ParameterEditor";

interface Step4VideoParamsProps {
  data?: any;
  onChange?: (data: any) => void;
}

export default function Step4VideoParams({
  data = { videoParameters: [] },
  onChange,
}: Step4VideoParamsProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Video Shot Parameters</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Define the parameters for video generation in your template
        </p>
        <ParameterEditor
          parameters={data.videoParameters || []}
          onChange={(params) =>
            onChange?.({ ...data, videoParameters: params })
          }
          isEditing={true}
        />
      </Card>
    </div>
  );
}
