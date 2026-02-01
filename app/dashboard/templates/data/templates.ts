import { ProjectTemplate } from "../types/template.types";

export const templates: ProjectTemplate[] = [
  {
    id: "1",
    name: "Kitchen Appliance Commercial",
    purpose: "Create promotional videos for kitchen appliances",
    shortDescription: "Professional template for showcasing kitchen appliances with lifestyle shots",
    category: "E-commerce",
    contentPrompt: "Create a 30-second commercial video showcasing a kitchen appliance. Focus on the product's features, ease of use, and benefits. Include close-up shots of the appliance in action, lifestyle shots of people enjoying meals prepared with it, and text overlays highlighting key features.",
    imageParameters: [
      { id: "1", key: "aspect_ratio", value: "16:9", type: "text" as const, required: true, description: "Video aspect ratio" },
      { id: "2", key: "resolution", value: "1920x1080", type: "text" as const, required: true, description: "Video resolution" },
      { id: "3", key: "fps", value: "30", type: "number" as const, required: true, description: "Frames per second" },
      { id: "4", key: "product_shot_angle", value: "45 degree", type: "text" as const, required: false },
    ],
    videoParameters: [
      { id: "5", key: "duration", value: "30", type: "number" as const, required: true, description: "Video duration in seconds" },
      { id: "6", key: "brand_logo", value: "", type: "file" as const, required: true, description: "Brand logo file" },
      { id: "7", key: "background_music", value: "upbeat_corporate", type: "text" as const, required: false },
      { id: "8", key: "voiceover_language", value: "English", type: "text" as const, required: true },
    ],
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    name: "Real Estate Virtual Tour",
    purpose: "Create 360° virtual tours for properties",
    shortDescription: "Immersive property tours with detailed room showcases",
    category: "Property",
    contentPrompt: "Generate a virtual tour video for a luxury property. Include smooth transitions between rooms, highlight key features (kitchen appliances, bathrooms, views), add informative text overlays about square footage and amenities. Use a slow, elegant pacing.",
    imageParameters: [
      { id: "9", key: "room_count", value: "5", type: "number" as const, required: true, description: "Number of rooms to feature" },
      { id: "10", key: "transition_style", value: "smooth_fade", type: "text" as const, required: true },
      { id: "11", key: "highlight_points", value: "3", type: "number" as const, required: false, description: "Number of feature highlights" },
    ],
    videoParameters: [
      { id: "12", key: "tour_duration", value: "90", type: "number" as const, required: true, description: "Tour duration in seconds" },
      { id: "13", key: "floor_plan", value: "", type: "file" as const, required: false },
      { id: "14", key: "ambient_sound", value: "gentle_piano", type: "text" as const, required: true },
    ],
    isActive: true,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-10"),
  },
  {
    id: "3",
    name: "Tech Product Launch",
    purpose: "Announce and showcase new technology products",
    shortDescription: "Dynamic template for tech product reveals and demonstrations",
    category: "Technology",
    contentPrompt: "Create an exciting product launch video for a new tech gadget. Start with dramatic reveal shots, show product from multiple angles, demonstrate key features with clear visual indicators, include enthusiastic customer reactions, end with clear call-to-action.",
    imageParameters: [
      { id: "15", key: "product_rotation", value: "360", type: "number" as const, required: true, description: "Degree of product rotation" },
      { id: "16", key: "feature_highlight_count", value: "5", type: "number" as const, required: true },
      { id: "17", key: "animation_style", value: "smooth_3d", type: "text" as const, required: true },
    ],
    videoParameters: [
      { id: "18", key: "launch_intensity", value: "high", type: "text" as const, required: true, description: "Energy level of the launch video" },
      { id: "19", key: "product_specs", value: "", type: "file" as const, required: true },
      { id: "20", key: "sound_effects", value: "futuristic", type: "text" as const, required: true },
    ],
    isActive: true,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
  },
];