"use client";

import { useState, useEffect } from "react";
import { ProjectTemplate } from "../types/template.types";

const initialTemplate: ProjectTemplate = {
  id: "",
  name: "",
  purpose: "",
  shortDescription: "",
  category: "E-commerce",
  contentPrompt: "",
  imageParameters: [],
  videoParameters: [],
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function useTemplateWizard() {
  const [template, setTemplate] = useState<ProjectTemplate>(initialTemplate);
  const [isLoading, setIsLoading] = useState(false);

  const updateTemplate = (updates: Partial<ProjectTemplate>) => {
    setTemplate(prev => ({ ...prev, ...updates }));
  };

  const saveTemplate = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTemplate: ProjectTemplate = {
        ...template,
        id: `template-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // In a real app, you would save to your backend here
      console.log("Saving template:", newTemplate);
      
      // Reset form
      setTemplate(initialTemplate);
      
    } catch (error) {
      console.error("Failed to save template:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetTemplate = () => {
    setTemplate(initialTemplate);
  };

  return {
    template,
    updateTemplate,
    saveTemplate,
    resetTemplate,
    isLoading,
  };
}

export default useTemplateWizard;