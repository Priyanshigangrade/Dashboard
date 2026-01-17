export type TemplateCategory =
  | "Product Marketing"
  | "Real Estate"
  | "Food"
  | "Event"
  | "Commercial"
  | "Reels"

export type ShotType = "Wide" | "Close-up" | "Top-down"

export type TemplateShot = {
  id: string
  title: string
  shotType: ShotType
  instruction: string
  aspectRatio?: "16:9" | "9:16" | "1:1"
}

export type Template = {
  id: string
  name: string
  description: string
  category: TemplateCategory
  updatedAt: string
  aspectRatio: "16:9" | "9:16" | "1:1"
  thumbnailUrl: string
  shots: TemplateShot[]
}
