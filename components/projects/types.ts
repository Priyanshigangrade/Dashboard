export type Parameter = {
  key: string
  type: "text" | "number" | "dropdown"
  value: any
  options?: string[]
}

export type Shot = {
  number: number
  description: string
  imagePrompt: string
  parameters: Parameter[]
  status: "pending" | "generated" | "uploaded"
  generatedImageUrl?: string
}

export type Video = {
  id: string
  name: string
  description: string
  stage1: {
    numShots: number
    durationPerShot: number
    contentPrompt: string
    productImages: string[]
    referenceImages: string[]
    imageParameters: Parameter[]
  }
  stage2: {
    shots: Shot[]
    comments: any[]
  }
  stage3: {
    generatedImages: { shotNumber: number; url: string }[]
  }
  stage4: {
    videoPrompts: { shotNumber: number; json: any }[]
    generatedVideos: { shotNumber: number; url: string; generatedAt?: string }[]
  }
  // ADDED STAGE 5
  stage5: {
    editedVideos: {
      shotNumber: number
      url: string
      editedAt: string
      edits?: string[]
    }[]
    finalVideo: {
      url: string
      generatedAt: string
      quality: string
      duration: number
      shotsIncluded: number[]
    } | null
  }
  created: string
  modified: string
}

export type Project = {
  id: string
  name: string
  description: string
  type: string
  status: "active" | "inactive"
  videos: Video[]
  created: string
  modified: string
}

export type ProjectTypeConfig = {
  id: string
  name: string
  defaultContentPrompt: string
  defaultImageParameters: Parameter[]
}

// Optional: Add Stage type for better type safety
export type Stage = {
  number: 1 | 2 | 3 | 4 | 5
  name: string
  description: string
  isComplete: (video: Video) => boolean
}

// Optional: Add VideoEdit type for better type safety
export type VideoEdit = {
  id: string
  shotNumber: number
  originalUrl: string
  editedUrl: string
  editsApplied: string[]
  createdAt: string
  duration: number
  quality: string
}

// Optional: Add FinalVideo type
export type FinalVideo = {
  id: string
  url: string
  createdAt: string
  quality: "720p" | "1080p" | "4k"
  duration: number
  fileSize: string
  shotsIncluded: number[]
  exportFormat: "mp4" | "mov" | "webm"
}