"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Copy, Edit, Power, ChevronRight, Search, Filter, ArrowUpDown, Plus, Monitor, Camera, Sun, Music, Palette, FileJson } from "lucide-react"
import ProjectModal from "./ProjectModal"
import NewProjectDialog from "./NewProjectDialog"
import { Project } from "./types"

const initialProjects: Project[] = [
  {
    id: "PRJ-001",
    name: "KitchenAid Mixer Campaign",
    description: "Spring campaign for new KitchenAid mixer",
    type: "Kitchen Appliance Commercial",
    status: "active",
    videos: [],
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
    config: {
      video: {
        aspect_ratio: "16:9",
        duration_sec: 5,
        resolution: "4K",
        style: "photorealistic, premium appliance commercial"
      },
      source_image: {
        path: "/mnt/data/kitchen_scene_1.png",
        type: "single_frame_reference"
      },
      shot: {
        shot_name: "Everyday Indian Kitchen – Product Reveal Pull-Out",
        shot_type: "single continuous shot",
        camera: {
          start_framing: {
            description: "Close focus on vegetables and ingredients on the wooden counter — green chillies, dry red chillies, spices and coconut in the foreground",
            focal_length: "50mm equivalent",
            depth_of_field: "shallow"
          },
          movement: {
            type: "slow pull-out",
            duration_sec: 5,
            easing: "ease-in-out",
            end_framing: {
              description: "Full KitchenAid mixer visible in frame with jars, kitchen context clearly established",
              focal_length: "35mm equivalent",
              depth_of_field: "natural, balanced"
            }
          },
          stabilization: "smooth cinematic"
        },
        lighting: {
          base_light: "soft morning sunlight from window",
          animation: {
            type: "subtle sunlight drift",
            direction: "left to right",
            intensity_change: "very gentle",
            purpose: "create lived-in, morning warmth"
          }
        },
        environment: {
          kitchen_style: "warm modern kitchen",
          background: {
            tiles: "soft beige",
            shelves: "wooden with jars and plants",
            focus: "slightly out of focus (bokeh)"
          }
        }
      },
      audio: {
        music: {
          track_type: "soft premium instrumental",
          mood: "warm, calm, everyday",
          fade_in_sec: 1,
          volume: "low"
        },
        sound_effects: [
          {
            type: "soft kitchen ambience",
            elements: ["subtle room tone", "very faint utensil presence"],
            volume: "very low"
          }
        ]
      },
      color_grading: {
        tone: "warm natural",
        contrast: "soft",
        saturation: "realistic",
        highlights: "gentle glow on steel surfaces"
      },
      restrictions: {
        no_people: true,
        no_text: true,
        no_graphics: true,
        no_brand_overlays: true
      }
    }
  },
  {
    id: "PRJ-002",
    name: "Real Estate Virtual Tour",
    description: "360° virtual tour for luxury apartment complex",
    type: "Real Estate Marketing",
    status: "active",
    videos: [],
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
    config: {
      video: {
        aspect_ratio: "16:9",
        duration_sec: 15,
        resolution: "4K",
        style: "cinematic, architectural walkthrough"
      },
      source_image: {
        path: "/mnt/data/apartment_layout.png",
        type: "floor_plan_reference"
      },
      shot: {
        shot_name: "Luxury Living Room Walkthrough",
        shot_type: "continuous panning shot",
        camera: {
          start_framing: {
            description: "Wide angle view of living room entrance",
            focal_length: "24mm equivalent",
            depth_of_field: "deep focus"
          },
          movement: {
            type: "slow pan right",
            duration_sec: 15,
            easing: "ease-in-out",
            end_framing: {
              description: "Focus on balcony with city view",
              focal_length: "35mm equivalent",
              depth_of_field: "moderate"
            }
          },
          stabilization: "fluid motion"
        },
        lighting: {
          base_light: "golden hour natural light",
          animation: {
            type: "sunlight progression",
            direction: "right to left",
            intensity_change: "gradual",
            purpose: "showcase space throughout the day"
          }
        },
        environment: {
          style: "modern luxury apartment",
          background: {
            walls: "neutral tones",
            furniture: "minimalist design",
            focus: "architectural details"
          }
        }
      },
      audio: {
        music: {
          track_type: "ambient piano",
          mood: "calm, sophisticated, spacious",
          fade_in_sec: 2,
          volume: "medium"
        },
        sound_effects: [
          {
            type: "urban ambience",
            elements: ["distant city sounds", "subtle wind"],
            volume: "low"
          }
        ]
      },
      color_grading: {
        tone: "warm golden",
        contrast: "medium-high",
        saturation: "rich",
        highlights: "glowing"
      },
      restrictions: {
        no_people: true,
        no_text: false,
        no_graphics: false,
        no_brand_overlays: false
      }
    }
  },
]

// Add this debounce hook (create a separate file or include here)
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useMemo(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default function ManageProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"created" | "modified" | "name">("created")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [page, setPage] = useState(1)
  const pageSize = 10

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
  const [projectToDeactivate, setProjectToDeactivate] = useState<string | null>(null)
  const [projectToDuplicate, setProjectToDuplicate] = useState<string | null>(null)
  const [inspectorOpen, setInspectorOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    video: true,
    shot: true,
    audio: true,
    color: true,
    restrictions: false
  })

  const debouncedQuery = useDebounce(query, 300)

  const filtered = useMemo(() => {
    let out = projects
    
    if (debouncedQuery) {
      out = out.filter((p) => 
        p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        p.type.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    }
    
    if (statusFilter !== "all") {
      out = out.filter((p) => p.status === statusFilter)
    }
    
    // Sorting logic
    out.sort((a, b) => {
      let comparison = 0
      if (sortBy === "created") {
        comparison = new Date(a.created).getTime() - new Date(b.created).getTime()
      } else if (sortBy === "modified") {
        comparison = new Date(a.modified).getTime() - new Date(b.modified).getTime()
      } else if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name)
      }
      return sortOrder === "asc" ? comparison : -comparison
    })
    
    return out
  }, [projects, debouncedQuery, statusFilter, sortBy, sortOrder])

  const paged = useMemo(() => 
    filtered.slice((page - 1) * pageSize, page * pageSize), 
    [filtered, page]
  )

  function handleToggleActive(id: string) {
    setProjects((s) => s.map((p) => 
      p.id === id ? { 
        ...p, 
        status: p.status === 'active' ? 'inactive' : 'active', 
        modified: new Date().toISOString() 
      } : p
    ))
  }

  function handleDeactivate(id: string) {
    setProjectToDeactivate(id)
  }

  function confirmDeactivate() {
    if (projectToDeactivate) {
      handleToggleActive(projectToDeactivate)
      setProjectToDeactivate(null)
      if (selectedProject?.id === projectToDeactivate) {
        setSelectedProject(null)
        setInspectorOpen(false)
      }
    }
  }

  function confirmDuplicate() {
    if (projectToDuplicate) {
      const src = projects.find((p) => p.id === projectToDuplicate)
      if (src) {
        const copy: Project = {
          ...src,
          id: `${src.id}-copy-${Date.now()}`,
          name: `${src.name} (Copy)`,
          created: new Date().toISOString(),
          modified: new Date().toISOString(),
        }
        setProjects((s) => [copy, ...s])
      }
      setProjectToDuplicate(null)
    }
  }

  function handleSave(updated: Project) {
    setProjects((s) => {
      const exists = s.find((p) => p.id === updated.id)
      if (exists) {
        return s.map((p) => p.id === updated.id ? { 
          ...updated, 
          modified: new Date().toISOString() 
        } : p)
      }
      return [{ 
        ...updated, 
        id: `PRJ-${Date.now()}`, 
        created: new Date().toISOString(), 
        modified: new Date().toISOString() 
      }, ...s]
    })
    setEditingProject(null)
    setIsEditModalOpen(false)
  }

  function toggleSection(section: string) {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="flex gap-6 transition-all duration-300">
      {/* Main Projects Grid */}
      <div className="flex-1 space-y-6 transition-all">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 w-full max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search projects by name, description, or type..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
            </div>
            
          
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select 
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value)
                  setPage(1)
                }}
                className="border rounded-md px-3 py-1.5 text-sm bg-background transition-all duration-200 hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border rounded-md px-3 py-1.5 text-sm bg-background transition-all duration-200 hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="created">Sort by Created</option>
                <option value="modified">Sort by Modified</option>
                <option value="name">Sort by Name</option>
              </select>
              
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="transition-all duration-200 hover:bg-accent"
              >
                {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
              </Button>
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground transition-all duration-300">
          {filtered.length === 0 ? (
            <span>No projects found</span>
          ) : (
            <span>Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} project{filtered.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {paged.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-lg transition-all duration-300 hover:border-primary/50">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">No projects found</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {query || statusFilter !== "all" 
                    ? "Try adjusting your search or filter to find what you're looking for."
                    : "Get started by creating your first project."
                  }
                </p>
              </div>
              {(!query && statusFilter === "all") && (
                <Button 
                  onClick={() => setIsNewProjectOpen(true)} 
                  className="mt-2 transition-all duration-200 hover:scale-105"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Project
                </Button>
              )}
              {(query || statusFilter !== "all") && (
                <Button 
                  variant="outline"
                  onClick={() => {
                    setQuery("")
                    setStatusFilter("all")
                  }} 
                  className="mt-2 transition-all duration-200"
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300">
            {paged.map((p) => (
              <Card 
                key={p.id} 
                className={`
                  cursor-pointer transition-all duration-300 
                  hover:shadow-lg hover:scale-[1.02] hover:border-primary/50
                  ${selectedProject?.id === p.id ? 'ring-2 ring-primary scale-[1.02] shadow-lg' : ''}
                `}
                onClick={() => {
                  setSelectedProject(p)
                  setInspectorOpen(true)
                }}
              >
                {/* Thumbnail */}
                <div 
                  className="relative h-32 w-full bg-muted transition-all duration-300 group-hover:brightness-110"
                  style={{ 
                    backgroundImage: `url('https://source.unsplash.com/collection/190727/800x600?sig=${p.id}')`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300 group-hover:from-black/70" />
                  <div className="absolute left-3 top-3 transition-all duration-300">
                    <Badge 
                      variant="secondary" 
                      className="capitalize text-xs backdrop-blur-sm bg-white/10 text-white border-white/20 transition-all duration-200 hover:bg-white/20"
                    >
                      {p.type.split(' ')[0]}
                    </Badge>
                  </div>
                  <div className="absolute right-3 top-3 transition-all duration-300">
                    <Badge 
                      className="capitalize text-xs backdrop-blur-sm border-white/20 transition-all duration-200"
                      variant={p.status === 'active' ? 'default' : 'outline'}
                    >
                      {p.status}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="pt-4">
                  <CardTitle className="text-base truncate transition-colors duration-200 group-hover:text-primary">
                    {p.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-1 line-clamp-2 transition-colors duration-200">
                    {p.description}
                  </CardDescription>
                </CardContent>

                {/* Footer with Actions */}
                <CardFooter className="flex flex-col gap-3 pt-0">
                  <div className="flex items-center justify-between w-full text-xs text-muted-foreground transition-colors duration-200">
                    <span>{p.videos.length} video{p.videos.length !== 1 ? 's' : ''}</span>
                    <span>{new Intl.DateTimeFormat('en-GB').format(new Date(p.created))}</span>
                  </div>

                  <div className="flex items-center gap-2 w-full">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 transition-all duration-200 hover:border-primary hover:bg-primary/5"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedProject(p)
                        setInspectorOpen(true)
                      }}
                    >
                      <Edit className="h-3.5 w-3.5 mr-1 transition-transform duration-200 group-hover:scale-110" />
                      Edit
                    </Button>

                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        setProjectToDuplicate(p.id)
                      }}
                      title="Duplicate project"
                      className="transition-all duration-200 hover:scale-110 hover:bg-accent"
                    >
                      <Copy className="h-3.5 w-3.5 transition-transform duration-200" />
                    </Button>

                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeactivate(p.id)
                      }}
                      title={p.status === 'active' ? 'Deactivate project' : 'Activate project'}
                      className={`transition-all duration-200 hover:scale-110 ${
                        p.status === 'active' 
                          ? 'hover:text-destructive hover:bg-destructive/10' 
                          : 'hover:text-green-600 hover:bg-green-50'
                      }`}
                    >
                      <Power className="h-3.5 w-3.5 transition-transform duration-200" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <div className="flex items-center justify-between pt-4 border-t transition-all duration-300">
            <div className="text-sm text-muted-foreground transition-colors duration-200">
              Page {page} of {Math.ceil(filtered.length / pageSize)}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary"
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => p + 1)}
                disabled={page * pageSize >= filtered.length}
                className="transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Right Inspector Panel */}
      {inspectorOpen && selectedProject && (
        <div className="w-96 border-l pl-6 space-y-6 pb-6 animate-in slide-in-from-right duration-300 overflow-y-auto max-h-screen">
          {/* Inspector Header */}
          <div className="flex items-start justify-between pt-6 sticky top-0 bg-background pb-4 z-10">
            <div className="transition-all duration-200">
              <h2 className="text-lg font-semibold truncate hover:text-primary transition-colors duration-200">
                {selectedProject.name}
              </h2>
              <p className="text-sm text-muted-foreground transition-colors duration-200">
                {selectedProject.type}
              </p>
            </div>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setInspectorOpen(false)}
              className="transition-all duration-200 hover:scale-110 hover:bg-accent"
            >
              <ChevronRight className="h-4 w-4 transition-transform duration-200" />
            </Button>
          </div>

          {/* Inspector Content */}
          <div className="space-y-3">
            {/* Basic Info */}
            <div className="border rounded-lg p-3 transition-all duration-200 hover:border-primary/50">
              <p className="text-sm font-medium mb-2 transition-colors duration-200">Basic Information</p>
              <div className="space-y-2 text-xs">
                <div className="transition-colors duration-200">
                  <p className="font-medium text-muted-foreground">ID</p>
                  <p className="font-mono text-foreground break-all transition-colors duration-200">
                    {selectedProject.id}
                  </p>
                </div>
                <div className="transition-colors duration-200">
                  <p className="font-medium text-muted-foreground">Status</p>
                  <Badge 
                    className="capitalize mt-1 transition-all duration-200" 
                    variant={selectedProject.status === 'active' ? 'default' : 'outline'}
                  >
                    {selectedProject.status}
                  </Badge>
                </div>
                <div className="transition-colors duration-200">
                  <p className="font-medium text-muted-foreground">Type</p>
                  <p className="text-foreground transition-colors duration-200">
                    {selectedProject.type}
                  </p>
                </div>
                <div className="transition-colors duration-200">
                  <p className="font-medium text-muted-foreground">Description</p>
                  <p className="text-foreground transition-colors duration-200">
                    {selectedProject.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Project Configuration */}
            {selectedProject.config && (
              <div className="border rounded-lg overflow-hidden transition-all duration-200 hover:border-primary/50">
                <div 
                  className="flex items-center justify-between p-3 cursor-pointer bg-accent/30 hover:bg-accent/50 transition-colors duration-200"
                  onClick={() => toggleSection('config')}
                >
                  <div className="flex items-center gap-2">
                    <FileJson className="h-4 w-4" />
                    <p className="text-sm font-medium">Project Configuration</p>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSections.config ? 'rotate-90' : ''}`} />
                </div>
                
                {expandedSections.config && selectedProject.config && (
                  <div className="p-3 space-y-4 animate-in slide-in-from-top duration-200">
                    {/* Video Specs */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4 text-muted-foreground" />
                        <p className="text-xs font-medium">Video Specifications</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="space-y-1">
                          <p className="font-medium text-muted-foreground">Aspect Ratio</p>
                          <Badge variant="outline" className="text-xs font-normal">
                            {selectedProject.config.video.aspect_ratio}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-muted-foreground">Duration</p>
                          <Badge variant="outline" className="text-xs font-normal">
                            {selectedProject.config.video.duration_sec}s
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-muted-foreground">Resolution</p>
                          <Badge variant="outline" className="text-xs font-normal">
                            {selectedProject.config.video.resolution}
                          </Badge>
                        </div>
                        <div className="space-y-1 col-span-2">
                          <p className="font-medium text-muted-foreground">Style</p>
                          <p className="text-foreground">{selectedProject.config.video.style}</p>
                        </div>
                      </div>
                    </div>

                    {/* Shot Details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Camera className="h-4 w-4 text-muted-foreground" />
                        <p className="text-xs font-medium">Shot Details</p>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div>
                          <p className="font-medium text-muted-foreground">Shot Name</p>
                          <p className="text-foreground">{selectedProject.config.shot.shot_name}</p>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground">Camera Movement</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {selectedProject.config.shot.camera.movement.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {selectedProject.config.shot.camera.movement.duration_sec}s
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground">Framing</p>
                          <p className="text-foreground text-xs mt-1">
                            {selectedProject.config.shot.camera.start_framing.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Lighting */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-muted-foreground" />
                        <p className="text-xs font-medium">Lighting</p>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div>
                          <p className="font-medium text-muted-foreground">Base Light</p>
                          <p className="text-foreground">{selectedProject.config.shot.lighting.base_light}</p>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground">Animation</p>
                          <div className="flex gap-2 mt-1 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {selectedProject.config.shot.lighting.animation.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {selectedProject.config.shot.lighting.animation.direction}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Audio */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Music className="h-4 w-4 text-muted-foreground" />
                        <p className="text-xs font-medium">Audio</p>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div>
                          <p className="font-medium text-muted-foreground">Music</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {selectedProject.config.audio.music.track_type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {selectedProject.config.audio.music.mood}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground">Sound Effects</p>
                          {selectedProject.config.audio.sound_effects.map((sfx, idx) => (
                            <div key={idx} className="mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {sfx.type}
                              </Badge>
                              <p className="text-muted-foreground text-xs mt-1">
                                {sfx.elements.join(', ')}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Color Grading */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4 text-muted-foreground" />
                        <p className="text-xs font-medium">Color Grading</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="space-y-1">
                          <p className="font-medium text-muted-foreground">Tone</p>
                          <Badge variant="outline" className="text-xs font-normal">
                            {selectedProject.config.color_grading.tone}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-muted-foreground">Contrast</p>
                          <Badge variant="outline" className="text-xs font-normal">
                            {selectedProject.config.color_grading.contrast}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-muted-foreground">Saturation</p>
                          <Badge variant="outline" className="text-xs font-normal">
                            {selectedProject.config.color_grading.saturation}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Restrictions */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-medium">Restrictions</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(selectedProject.config.restrictions).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${value ? 'bg-green-500' : 'bg-red-500'}`} />
                              <p className="font-medium text-muted-foreground capitalize">
                                {key.replace('_', ' ')}
                              </p>
                            </div>
                            <Badge 
                              variant={value ? 'default' : 'outline'} 
                              className="text-xs font-normal"
                            >
                              {value ? 'Yes' : 'No'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Source Image */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium">Source Image</p>
                      <div className="text-xs space-y-1">
                        <p className="font-medium text-muted-foreground">Path</p>
                        <p className="font-mono text-foreground break-all text-xs">
                          {selectedProject.config.source_image.path}
                        </p>
                        <div className="mt-1">
                          <Badge variant="outline" className="text-xs">
                            {selectedProject.config.source_image.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Dates */}
            <div className="border rounded-lg p-3 transition-all duration-200 hover:border-primary/50">
              <p className="text-sm font-medium mb-2 transition-colors duration-200">Timeline</p>
              <div className="space-y-2 text-xs">
                <div className="transition-colors duration-200">
                  <p className="font-medium text-muted-foreground">Created</p>
                  <p className="text-foreground transition-colors duration-200">
                    {new Intl.DateTimeFormat('en-GB', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(new Date(selectedProject.created))}
                  </p>
                </div>
                <div className="transition-colors duration-200">
                  <p className="font-medium text-muted-foreground">Modified</p>
                  <p className="text-foreground transition-colors duration-200">
                    {new Intl.DateTimeFormat('en-GB', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(new Date(selectedProject.modified))}
                  </p>
                </div>
              </div>
            </div>

            {/* Videos */}
            <div className="border rounded-lg p-3 transition-all duration-200 hover:border-primary/50">
              <p className="text-sm font-medium mb-2 transition-colors duration-200">
                Videos ({selectedProject.videos.length})
              </p>
              {selectedProject.videos.length === 0 ? (
                <p className="text-xs text-muted-foreground transition-colors duration-200">
                  No videos yet
                </p>
              ) : (
                <ul className="space-y-2 text-xs">
                  {selectedProject.videos.map((v) => (
                    <li 
                      key={v.id} 
                      className="border-l-2 border-muted pl-2 transition-all duration-200 hover:border-primary hover:pl-3"
                    >
                      <p className="font-medium text-foreground transition-colors duration-200">
                        {v.name}
                      </p>
                      <p className="text-muted-foreground transition-colors duration-200">
                        {v.description}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 border-t transition-all duration-200 sticky bottom-0 bg-background pb-2">
            <Button 
              size="sm" 
              className="w-full transition-all duration-200 hover:scale-[1.02]"
              onClick={() => {
                setEditingProject(selectedProject)
                setIsEditModalOpen(true)
              }}
            >
              <Edit className="h-3.5 w-3.5 mr-2 transition-transform duration-200 group-hover:scale-110" />
              Edit Project
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="w-full transition-all duration-200 hover:scale-[1.02] hover:border-primary"
              onClick={() => setProjectToDuplicate(selectedProject.id)}
            >
              <Copy className="h-3.5 w-3.5 mr-2 transition-transform duration-200 group-hover:scale-110" />
              Duplicate
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              className="w-full transition-all duration-200 hover:scale-[1.02]"
              onClick={() => handleDeactivate(selectedProject.id)}
            >
              <Power className="h-3.5 w-3.5 mr-2 transition-transform duration-200" />
              {selectedProject.status === 'active' ? 'Deactivate' : 'Activate'}
            </Button>
          </div>
        </div>
      )}

      {/* Deactivation Confirmation Dialog */}
      <Dialog open={!!projectToDeactivate} onOpenChange={(open: boolean) => !open && setProjectToDeactivate(null)}>
        <DialogContent className="animate-in zoom-in-95 duration-200">
          <DialogHeader>
            <DialogTitle className="transition-colors duration-200">
              {projects.find(p => p.id === projectToDeactivate)?.status === 'active' 
                ? 'Deactivate Project?' 
                : 'Activate Project?'
              }
            </DialogTitle>
            <DialogDescription className="transition-colors duration-200">
              {projects.find(p => p.id === projectToDeactivate)?.status === 'active'
                ? 'This project will be marked as inactive and will not appear in active projects list. You can reactivate it later.'
                : 'This project will be marked as active again and appear in your projects list.'
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setProjectToDeactivate(null)}
              className="transition-all duration-200 hover:border-primary"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDeactivate}
              className="transition-all duration-200 hover:scale-105"
            >
              {projects.find(p => p.id === projectToDeactivate)?.status === 'active' ? 'Deactivate' : 'Activate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Duplicate Confirmation Dialog */}
      <Dialog open={!!projectToDuplicate} onOpenChange={(open: boolean) => !open && setProjectToDuplicate(null)}>
        <DialogContent className="animate-in zoom-in-95 duration-200">
          <DialogHeader>
            <DialogTitle className="transition-colors duration-200">
              Duplicate Project?
            </DialogTitle>
            <DialogDescription className="transition-colors duration-200">
              A copy of "{projects.find(p => p.id === projectToDuplicate)?.name}" will be created with "(Copy)" appended to the name.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setProjectToDuplicate(null)}
              className="transition-all duration-200 hover:border-primary"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDuplicate}
              className="transition-all duration-200 hover:scale-105"
            >
              Duplicate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Project Modal */}
      {editingProject && (
        <ProjectModal 
          project={editingProject} 
          open={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setEditingProject(null)
          }} 
          onSave={handleSave}
        />
      )}

      <NewProjectDialog 
        open={isNewProjectOpen} 
        onClose={() => setIsNewProjectOpen(false)} 
        onSave={handleSave}
      />
    </div>
  )
}