"use client";

import React, { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
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
  { title: "Template Basics", component: Step1BasicInfo },
  { title: "Content Prompt", component: Step2ContentPrompt },
  { title: "Image Parameters", component: Step3ImageParams },
  { title: "Video Parameters", component: Step4VideoParams },
];

export default function NewTemplateWizard({ onClose }: NewTemplateWizardProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    purpose: "",
    category: "",
    shortDescription: "",
    contentPrompt: "",
    imageParameters: [],
    videoParameters: [],
  });

  const StepComponent = STEPS[step].component;

  return (
    <Dialog open>
      {/* ❌ DO NOT USE DialogContent */}
      <div className="fixed inset-0 z-[100] bg-background flex flex-col">

        {/* HEADER */}
        <div className="sticky top-0 z-50 border-b px-6 py-4 flex justify-between bg-background">
          <div>
            <h2 className="text-xl font-semibold">
              Step {step + 1} — {STEPS[step].title}
            </h2>
            <p className="text-sm text-muted-foreground">
              Configure reusable project template
            </p>
          </div>

          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>

        {/* PROGRESS */}
        <div className="px-6 pt-4">
          <div className="flex gap-2">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded ${
                  i <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-3xl mx-auto">
            <StepComponent data={formData} onChange={setFormData} />
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t px-6 py-4 flex justify-between bg-background">
          <Button
            variant="outline"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {step === STEPS.length - 1 ? (
            <Button onClick={onClose}>Create Template</Button>
          ) : (
            <Button onClick={() => setStep(step + 1)}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Dialog>
  );
}
