"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Save, X } from "lucide-react";
import Step1BasicInfo from "./Step1BasicInfo";
import Step2ContentPrompt from "./Step2ContentPrompt";
import Step3ImageParams from "./Step3ImageParams";
import Step4VideoParams from "./Step4VideoParams";
import { useTemplateWizard } from "../../hooks/useTemplateWizard";
import { ProjectTemplate } from "../../types/template.types";

interface NewTemplateWizardProps {
  onClose: () => void;
}

const steps = [
  { id: 1, title: "Basic Info", description: "Name, purpose, and description" },
  { id: 2, title: "Content Prompt", description: "AI instructions for generation" },
  { id: 3, title: "Image Parameters", description: "Configure image shot settings" },
  { id: 4, title: "Video Parameters", description: "Configure video shot settings" },
];

export default function NewTemplateWizard({ onClose }: NewTemplateWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const { template, updateTemplate, saveTemplate, isLoading } = useTemplateWizard();

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    await saveTemplate();
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo template={template} onUpdate={updateTemplate} />;
      case 2:
        return <Step2ContentPrompt template={template} onUpdate={updateTemplate} />;
      case 3:
        return <Step3ImageParams template={template} onUpdate={updateTemplate} />;
      case 4:
        return <Step4VideoParams template={template} onUpdate={updateTemplate} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
 <DialogContent className="w-full h-screen p-0 border-0">
        {/* Full screen container */}
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="border-b border-input bg-muted/30 shrink-0">
            <div className="flex items-center justify-between p-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Create New Template</h2>
                <p className="text-sm text-muted-foreground">
                  Configure a reusable project template
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress Steps */}
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                          currentStep >= step.id
                            ? "border-foreground bg-foreground text-background"
                            : "border-input bg-background text-muted-foreground"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <ChevronRight className="h-5 w-5" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <p className={`text-xs font-medium ${
                          currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-muted-foreground hidden sm:block">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-0.5 w-16 sm:w-24 ${
                          currentStep > step.id ? "bg-foreground" : "bg-input"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content - Takes remaining height with proper scroll */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="h-full overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-input bg-muted/30 p-6 shrink-0">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Step {currentStep} of {steps.length}
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="border-input hover:bg-accent"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                {currentStep < steps.length ? (
                  <Button
                    onClick={handleNext}
                    className="bg-foreground text-background hover:bg-foreground/90"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-foreground text-background hover:bg-foreground/90"
                  >
                    {isLoading ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create Template
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}