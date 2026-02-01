import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  ShoppingBag,
  Home,
  FileText,
  Coffee,
  Laptop,
  Car,
  Globe,
  BookOpen,
  Palette,
  LucideIcon,
} from "lucide-react";

/**
 * Combines class names with Tailwind CSS merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get category icon component - returns the Icon component itself
 */
export function getCategoryIcon(category: string): LucideIcon {
  const iconMap: Record<string, LucideIcon> = {
    "E-commerce": ShoppingBag,
    "Property": Home,
    "Lifestyle": FileText,
    "Hospitality": Coffee,
    "Technology": Laptop,
    "Automotive": Car,
    "Travel": Globe,
    "Education": BookOpen,
  };

  return iconMap[category] || Palette;
}

// REMOVE any function that returns JSX - ONLY keep the two functions above