import { Template } from "./types"

export const TEMPLATE_CATEGORIES = [
  "Product Marketing",
  "Real Estate",
  "Food",
  "Event",
  "Commercial",
  "Reels",
] as const

export const mockTemplates: Template[] = [
  {
    id: "tpl-001",
    name: "Mixer Grinder – Kitchen Morning Ad",
    description: "Premium ad workflow for product reveal + ingredients shots",
    category: "Product Marketing",
    updatedAt: "2026-01-17",
    aspectRatio: "16:9",
    thumbnailUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1200&auto=format&fit=crop",
    shots: [
      {
        id: "s1",
        title: "Ingredients aesthetic wide shot",
        shotType: "Wide",
        instruction: "Cinematic wide shot of kitchen ingredients...",
        aspectRatio: "16:9",
      },
      {
        id: "s2",
        title: "Product hero reveal",
        shotType: "Close-up",
        instruction: "Reveal mixer grinder naturally on countertop...",
        aspectRatio: "16:9",
      },
      {
        id: "s3",
        title: "Top-down jar close",
        shotType: "Top-down",
        instruction: "Top-down inside jar showing blades and ingredients...",
        aspectRatio: "16:9",
      },
    ],
  },
  {
    id: "tpl-002",
    name: "Real Estate – Walkthrough Storyboard",
    description: "Standard 6-shot real estate marketing reel template",
    category: "Real Estate",
    updatedAt: "2026-01-16",
    aspectRatio: "9:16",
    thumbnailUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop",
    shots: [
      {
        id: "s1",
        title: "Exterior golden hour",
        shotType: "Wide",
        instruction: "Exterior wide shot in warm evening light...",
        aspectRatio: "9:16",
      },
    ],
  },
]
