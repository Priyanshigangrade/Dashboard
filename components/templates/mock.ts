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

    // ✅ changed from meat image to your local image
    thumbnailUrl:
  "https://images.unsplash.com/photo-1556910096-6f5e72db6803?q=80&w=1200&auto=format&fit=crop",


    shots: [
      {
        id: "s1",
        title: "Ingredients aesthetic wide shot",
        shotType: "Wide",
        instruction:
          "A warm, sunlit Indian home kitchen in the morning. Wide cinematic frame of a white marble kitchen counter naturally styled with everyday Indian cooking ingredients (turmeric, red chilli powder, coriander seeds, dried red chillies, green chillies, soaked lentils, coconut halves, coriander leaves, curry leaves, garlic). No people. No text. Photorealistic. 4K. Premium advertising style.",
        aspectRatio: "16:9",
      },
      {
        id: "s2",
        title: "Product hero reveal",
        shotType: "Close-up",
        instruction:
          "Reveal Crompton DuroGrand mixer grinder placed naturally at the center of the kitchen counter, surrounded by ingredients. Soft morning sunlight highlights steel jar. Shallow depth of field. Premium appliance commercial photography. No branding overlays.",
        aspectRatio: "16:9",
      },
      {
        id: "s3",
        title: "Top-down jar close",
        shotType: "Top-down",
        instruction:
          "Top-down close-up inside the blender jar showing raw ingredients arranged around blades. High detail, ultra realistic lighting, soft contrast. 4K. No text.",
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

    // ✅ kept Unsplash house image (works fine)
    thumbnailUrl:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop",

    shots: [
      {
        id: "s1",
        title: "Exterior golden hour",
        shotType: "Wide",
        instruction:
          "Real estate exterior wide shot in warm golden hour light, cinematic framing, premium marketing style, no people, clean composition, 4K.",
        aspectRatio: "9:16",
      },
    ],
  },
]
