"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Step1BasicInfo from "./Step1BasicInfo";
import Step2ContentPrompt from "./Step2ContentPrompt";
import Step3ImageParams from "./Step3ImageParams";
import Step4VideoParams from "./Step4VideoParams";

interface NewTemplateWizardProps {
  onClose: () => void;
}

const STEPS = [
  { number: 1, title: "Basic Info", component: Step1BasicInfo },
  { number: 2, title: "Content Prompt", component: Step2ContentPrompt },
  { number: 3, title: "Image Params", component: Step3ImageParams },
  { number: 4, title: "Video Params", component: Step4VideoParams },
];

export default function NewTemplateWizard({ onClose }: NewTemplateWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    purpose: "",
    category: "",
    shortDescription: "",
    contentPrompt: "",
    imageParameters: [],
    videoParameters: [],
  });

  const CurrentStepComponent = STEPS[currentStep].component;
  const canGoNext = currentStep < STEPS.length - 1;
  const canGoPrev = currentStep > 0;

  const handleNext = () => {
    if (canGoNext) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (canGoPrev) setCurrentStep(currentStep - 1);
  };

  const handleCreate = () => {
    console.log("Creating template:", formData);
    onClose();
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Template</DialogTitle>
          <div className="flex gap-2 mt-4">
            {STEPS.map((step, index) => (
              <div
                key={step.number}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  index <= currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </DialogHeader>

        <div className="py-6 min-h-[300px]">
          <CurrentStepComponent
            data={formData}
            onChange={setFormData}
          />
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={!canGoPrev}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentStep === STEPS.length - 1 ? (
            <Button onClick={handleCreate}>Create Template</Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
