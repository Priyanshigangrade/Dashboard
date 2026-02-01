export type ParameterType = 'text' | 'number' | 'file';

export interface TemplateParameter {
  id: string;
  key: string;
  value: string;
  type: ParameterType;
  required: boolean;
  description?: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  purpose: string;
  shortDescription: string;
  category: string;
  contentPrompt: string;
  imageParameters: TemplateParameter[];
  videoParameters: TemplateParameter[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateCategory {
  id: string;
  name: string;
  count: number;
}
