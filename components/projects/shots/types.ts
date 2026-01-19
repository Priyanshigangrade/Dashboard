export type ShotType = "wide" | "closeup" | "top-down"

export interface Shot {
  id: string
  name: string
  prompt: string
  aspectRatio: "16:9" | "9:16" | "1:1"
  type: ShotType
}
