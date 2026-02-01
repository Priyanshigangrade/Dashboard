"use client";

import { useState, useEffect, useCallback } from "react";
import { ProjectTemplate } from "../types/template.types";
import { templates as initialTemplates } from "../data/templates";

// In a real app, you would fetch from an API
const API_DELAY = 500; // Simulate API delay

export function useTemplates() {
  const [templates, setTemplates] = useState<ProjectTemplate[]>(initialTemplates);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate API call
  const simulateApiCall = async <T,>(data: T): Promise<T> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), API_DELAY);
    });
  };

  // Fetch templates (simulated)
  const fetchTemplates = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await simulateApiCall(initialTemplates);
      setTemplates(data);
      return data;
    } catch (err) {
      setError("Failed to fetch templates");
      console.error(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize with templates
  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  // Create a new template
  const createTemplate = async (templateData: Omit<ProjectTemplate, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    setError(null);
    try {
      const newTemplate: ProjectTemplate = {
        ...templateData,
        id: `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const updatedTemplates = await simulateApiCall([...templates, newTemplate]);
      setTemplates(updatedTemplates);
      return newTemplate;
    } catch (err) {
      setError("Failed to create template");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing template
  const updateTemplate = async (id: string, updates: Partial<ProjectTemplate>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTemplates = templates.map(template => {
        if (template.id === id) {
          return {
            ...template,
            ...updates,
            updatedAt: new Date(),
          };
        }
        return template;
      });
      
      const result = await simulateApiCall(updatedTemplates);
      setTemplates(result);
      return result.find(t => t.id === id);
    } catch (err) {
      setError("Failed to update template");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a template
  const deleteTemplate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTemplates = templates.filter(template => template.id !== id);
      const result = await simulateApiCall(updatedTemplates);
      setTemplates(result);
      return true;
    } catch (err) {
      setError("Failed to delete template");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Duplicate a template
  const duplicateTemplate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const templateToDuplicate = templates.find(t => t.id === id);
      if (!templateToDuplicate) {
        throw new Error("Template not found");
      }

      const duplicatedTemplate: ProjectTemplate = {
        ...templateToDuplicate,
        id: `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: `${templateToDuplicate.name} (Copy)`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedTemplates = await simulateApiCall([...templates, duplicatedTemplate]);
      setTemplates(updatedTemplates);
      return duplicatedTemplate;
    } catch (err) {
      setError("Failed to duplicate template");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle template active status
  const toggleTemplateStatus = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTemplates = templates.map(template => {
        if (template.id === id) {
          return {
            ...template,
            isActive: !template.isActive,
            updatedAt: new Date(),
          };
        }
        return template;
      });
      
      const result = await simulateApiCall(updatedTemplates);
      setTemplates(result);
      return result.find(t => t.id === id);
    } catch (err) {
      setError("Failed to toggle template status");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get template by ID
  const getTemplateById = useCallback((id: string) => {
    return templates.find(template => template.id === id);
  }, [templates]);

  // Search templates
  const searchTemplates = useCallback((query: string) => {
    if (!query.trim()) return templates;
    
    const lowerQuery = query.toLowerCase();
    return templates.filter(template =>
      template.name.toLowerCase().includes(lowerQuery) ||
      template.purpose.toLowerCase().includes(lowerQuery) ||
      template.shortDescription.toLowerCase().includes(lowerQuery) ||
      template.category.toLowerCase().includes(lowerQuery)
    );
  }, [templates]);

  // Filter templates by category
  const filterTemplatesByCategory = useCallback((category: string) => {
    if (category === "all") return templates;
    return templates.filter(template => 
      template.category.toLowerCase() === category.toLowerCase()
    );
  }, [templates]);

  // Get template statistics
  const getTemplateStats = useCallback(() => {
    const total = templates.length;
    const active = templates.filter(t => t.isActive).length;
    const inactive = total - active;
    
    const categories = templates.reduce((acc, template) => {
      acc[template.category] = (acc[template.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      active,
      inactive,
      categories,
    };
  }, [templates]);

  // Reset templates to initial state (for development/testing)
  const resetTemplates = async () => {
    setIsLoading(true);
    try {
      const result = await simulateApiCall(initialTemplates);
      setTemplates(result);
      return result;
    } catch (err) {
      setError("Failed to reset templates");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    templates,
    isLoading,
    error,
    
    // Actions
    fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    duplicateTemplate,
    toggleTemplateStatus,
    resetTemplates,
    
    // Queries
    getTemplateById,
    searchTemplates,
    filterTemplatesByCategory,
    getTemplateStats,
    
    // Status
    hasTemplates: templates.length > 0,
  };
}

// Export a hook for individual template management
export function useTemplate(id: string) {
  const [template, setTemplate] = useState<ProjectTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { getTemplateById, updateTemplate: updateTemplateApi } = useTemplates();

  useEffect(() => {
    const fetchTemplate = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const foundTemplate = getTemplateById(id);
        if (!foundTemplate) {
          throw new Error("Template not found");
        }
        setTemplate(foundTemplate);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load template");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTemplate();
    }
  }, [id, getTemplateById]);

  const updateTemplate = async (updates: Partial<ProjectTemplate>) => {
    if (!template) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const updated = await updateTemplateApi(template.id, updates);
      if (updated) {
        setTemplate(updated);
      }
      return updated;
    } catch (err) {
      setError("Failed to update template");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    template,
    isLoading,
    error,
    updateTemplate,
    refetch: () => {
      const foundTemplate = getTemplateById(id);
      setTemplate(foundTemplate || null);
    },
  };
}

export default useTemplates;