# Project Specification — Manage Projects Feature

Date: 26 January 2026

## Overview
Build a video content creation platform where users can manage video projects using pre-configured project types (templates). The platform guides users through a 4-stage workflow: content creation → storyboard → image generation → video generation.

## Screens (In Scope)

1. Screen to manage users (if admin).
2. Screen to configure ChatGPT & Gemini keys to be used for content creation (if admin).
3. Screen to Login/Authenticate into the application.
4. Screen to add/modify default instructions, add/edit/remove parameters for every shot and video based on type of Project (e.g., Product Marketing, Real Estate Marketing).
5. Screen to create / manage project:
   1. Screen to create content for different shots to be used in a video with ability to:
      - Upload Product images (if relevant).
      - Upload Reference images (to guide AI to provide prompts accordingly).
      - View generated Output in Tabular Format.
      - Edit Content before creating Storyboard.
   2. Screen to create Storyboard with different shots in a collage grid format:
      - Ability to modify instructions and parameters to be used to generate images in Gemini for every shot until satisfactory.
      - Ability to download shot images.
      - Ability to export storyboard with images in collage in PDF/JPG format.
   3. Screen to create videos for different shots in a collage grid format:
      - Ability to modify instructions and parameters to be used to generate videos in Gemini for every shot until satisfactory.
      - Ability to download shot videos.

## Out of Scope

1. Writing custom instructions to get satisfactory outputs.
2. Any other feature or screen beyond the above listed screens.
3. Any Feature/ability to generate specific output from AI (we provide integration points but not domain-specific prompt engineering in scope).

## Hosting & Billing

Application will run on your AWS servers. Billing: 1000 Rs after 3 months of project kick-off (per your note).

## Data Structures (JS)

```js
Project = {
  id: string,
  name: string,
  description: string,
  type: ProjectTypeID,
  status: 'active'|'inactive',
  videos: Video[],
  created: timestamp,
  modified: timestamp
}

Video = {
  id: string,
  name: string,
  description: string,
  stage1: {
    numShots: number,
    durationPerShot: number,
    contentPrompt: string,
    productImages: string[],
    referenceImages: string[],
    imageParameters: Parameter[]
  },
  stage2: {
    shots: Shot[],
    comments: Comment[]
  },
  stage3: {
    generatedImages: GeneratedImage[]
  },
  stage4: {
    videoPrompts: VideoPrompt[],
    generatedVideos: GeneratedVideo[]
  }
}

Shot = {
  number: number,
  description: string,
  imagePrompt: string,
  parameters: Parameter[],
  status: 'pending'|'generated'|'uploaded'
}

Parameter = {
  key: string,
  type: 'text'|'number'|'file'|'dropdown',
  value: any,
  defaultValue: any
}
```

## UI/UX Requirements

- Progress Tracker: Visual indicator of current stage (1-4).
- Save State: Auto-save on field change (or explicit Save with auto-save fallback).
- Validation: Required fields marked with `*`.
- Responsive: Desktop primary, tablet compatible.
- Loading States: For AI generation processes.
- Confirmation Dialogs: For delete/duplicate/deactivate actions.
- Breadcrumb Navigation: Between stages.
- Export Options: Storyboard as PDF/JPG, download shots.

## AI Integration Points

- Content Generation: Use Project Type prompt + product/reference images to generate shot descriptions.
- Image Generation: Convert shot descriptions + parameters to image prompts for Gemini.
- Video Generation: Convert shot descriptions + parameters to video JSON for Gemini Veo.
- Smart Defaults: Auto-fill parameters based on Project Type configuration.

## Special Features

- "Don't Generate + Upload Shot": Manual override option.
- Edit Parameters Modal: Customizable per-shot parameters.
- Collage Grid: Visual storyboard layout.
- Tabular Parameter Editing: Spreadsheet-like interface for bulk edits.
- Project Type Dropdown: Dynamic loading of configured templates.

## Expected User Flow

User clicks "New Project" → fills Basic Details → Selects Project Type (auto-populates prompts/parameters) → Uploads product/reference images → Clicks through stages 1-4 sequentially (review → modify → generate → review) → Final export/download of assets.

## Key Technical Challenges

- State management across 4-stage workflow.
- Image/Video file handling and preview.
- AI API integration (response handling, error states).
- Real-time collaboration (comments).
- Performance with multiple large images.
- Data persistence between stages.

---

## Reference Use Case (Example Prompts)

### Image Instruction (example)

A warm, sunlit Indian home kitchen in the morning, captured in a wide cinematic frame. A white marble kitchen counter is naturally styled with everyday Indian cooking ingredients — small bowls of turmeric, red chilli powder, coriander seeds, whole dried red chillies, fresh green chillies, soaked lentils in a glass bowl, coconut halves with white flesh visible, fresh coriander leaves, curry leaves, garlic cloves.

At the center of the counter sits a Crompton DuroGrand mixer grinder, clean and premium, fully assembled with a stainless-steel jar on top. The mixer is clearly visible but feels organically placed, not staged — like part of daily cooking.

Soft morning sunlight streams in from a window to the side, creating gentle highlights on the steel jar and subtle shadows across the ingredients. The background shows a lived-in Indian kitchen — tiled backsplash, white cabinets, glass jars, plants — slightly out of focus.

Color palette is cool and natural: soft greens, spice reds, muted creams.

Camera feels like a wide shot with a gentle push-in, shallow depth of field, cinematic realism, photorealistic, premium advertising style.

Mood: warm, authentic, everyday Indian household, calm and inviting.

No people present. No text. No branding overlays.

Ultra-realistic lighting, high detail, soft contrast, commercial food & appliance photography, 4K quality.

### Video Instruction (example)

Create a cinematic product video set in a warm Indian kitchen during morning light.

Start with a slow, atmospheric shot of fresh Indian cooking ingredients neatly arranged on a wooden kitchen counter — lentils, spices, coconut, herbs — with sunlight streaming through the window.

Transition smoothly to the mixer grinder placed on the same counter, surrounded by the ingredients, establishing it as a natural part of everyday Indian cooking.

End with a top-down close-up inside the blender jar, clearly showing raw ingredients arranged around the blades.

Use shallow depth of field, warm tones, gentle camera movement, and a premium, realistic product-advertising style.

### Gemini Veo 3 - Video Json (example)

```json
{
  "video": {
    "aspect_ratio": "16:9",
    "duration_sec": 5,
    "resolution": "4K",
    "style": "photorealistic, premium appliance commercial"
  },
  "source_image": {
    "path": "/mnt/data/1.png",
    "type": "single_frame_reference"
  },
  "shot": { /* ... truncated for brevity ... */ }
}
```

---

*This document is the canonical spec for the Manage Projects feature. Use it as the reference for UI and API changes.*
