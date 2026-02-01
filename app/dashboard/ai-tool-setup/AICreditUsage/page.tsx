"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown } from "lucide-react"
import { motion } from "framer-motion"

// Mock data for comprehensive analytics
const mockMonthlyData = [
  { month: "Jan", image: 1200, video: 800, total: 2000 },
  { month: "Feb", image: 1400, video: 1200, total: 2600 },
  { month: "Mar", image: 1100, video: 1500, total: 2600 },
  { month: "Apr", image: 1800, video: 1300, total: 3100 },
  { month: "May", image: 2200, video: 1900, total: 4100 },
  { month: "Jun", image: 2100, video: 2400, total: 4500 },
]

const mockProjectData = [
  { name: "KitchenAid Mixer Campaign", imageCredits: 450, videoCredits: 300, total: 750, status: "active" },
  { name: "Real Estate Virtual Tour", imageCredits: 380, videoCredits: 420, total: 800, status: "active" },
  { name: "Product Launch 2026", imageCredits: 520, videoCredits: 380, total: 900, status: "completed" },
  { name: "Food Commercial", imageCredits: 290, videoCredits: 510, total: 800, status: "active" },
  { name: "Fashion Collection Promo", imageCredits: 410, videoCredits: 280, total: 690, status: "paused" },
]

const mockVideoData = [
  { name: "KitchenAid - Hero Shot", project: "Mixer Campaign", credits: 120, status: "completed", model: "Gemini Veo" },
  { name: "Real Estate - 3D Walk", project: "Real Estate Tour", credits: 180, status: "completed", model: "Gemini Veo" },
  { name: "Product Demo - Unboxing", project: "Product Launch", credits: 95, status: "in-progress", model: "Gemini Veo" },
  { name: "Food Ad - Cooking Scene", project: "Food Commercial", credits: 140, status: "completed", model: "Gemini Veo" },
  { name: "Fashion - Runway", project: "Fashion Promo", credits: 160, status: "pending", model: "ChatGPT + Gemini" },
]

interface MetricCardProps {
  title: string
  value: string | number
  trend?: number
  subtitle?: string
}

function MetricCard({ title, value, trend, subtitle }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-bold text-foreground">{value}</div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? "text-green-600" : "text-red-600"}`}>
              {trend >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}

export default function AICreditUsageAnalytics() {
  const [loading] = useState(false)
  const [selectedProject, setSelectedProject] = useState("all")
  const [selectedTimeRange, setSelectedTimeRange] = useState("6m")
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null)

  const creditsSummary = {
    totalUsed: 5890,
    imageCredits: 3450,
    videoCredits: 2440,
    remaining: 4110,
    limit: 10000,
    percentUsed: 58.9,
  }

  const maxMonthly = Math.max(...mockMonthlyData.map((d) => d.total))
  const maxProjectValue = Math.max(...mockProjectData.map((d) => d.total))
  const maxVideoValue = Math.max(...mockVideoData.map((d) => d.credits))

  const totalImage = mockMonthlyData.reduce((sum, m) => sum + m.image, 0)
  const totalVideo = mockMonthlyData.reduce((sum, m) => sum + m.video, 0)

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Active"
      case "completed": return "Completed"
      case "in-progress": return "In Progress"
      case "paused": return "Paused"
      case "pending": return "Pending"
      default: return status
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">AI Credits Usage Analytics</h1>
        <p className="text-muted-foreground mt-2">Monitor and analyze AI credit consumption across projects, videos, and time periods</p>
      </div>

      {/* Filters */}
      <div>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Filters & Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Project</label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="mixer">KitchenAid Mixer Campaign</SelectItem>
                    <SelectItem value="realestate">Real Estate Virtual Tour</SelectItem>
                    <SelectItem value="product">Product Launch 2026</SelectItem>
                    <SelectItem value="food">Food Commercial</SelectItem>
                    <SelectItem value="fashion">Fashion Collection Promo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Time Range</label>
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">Last Month</SelectItem>
                    <SelectItem value="3m">Last 3 Months</SelectItem>
                    <SelectItem value="6m">Last 6 Months</SelectItem>
                    <SelectItem value="1y">Last Year</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Export</label>
                <button className="w-full px-4 py-2 border border-border rounded-md text-sm font-medium text-foreground hover:bg-accent">
                  Download CSV
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {loading ? (
          <>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </>
        ) : (
          <>
            <MetricCard title="Total Credits Used" value={creditsSummary.totalUsed.toLocaleString()} trend={12} subtitle="vs last month" />
            <MetricCard title="Image Credits" value={creditsSummary.imageCredits.toLocaleString()} subtitle="58.6% of total" />
            <MetricCard title="Video Credits" value={creditsSummary.videoCredits.toLocaleString()} subtitle="41.4% of total" />
            <MetricCard title="Remaining Credits" value={creditsSummary.remaining.toLocaleString()} subtitle={`of ${creditsSummary.limit.toLocaleString()}`} />
            <MetricCard title="Usage Rate" value={`${creditsSummary.percentUsed}%`} trend={8} subtitle="of quota" />
          </>
        )}
      </div>

      {/* Usage Progress Bar */}
      <div>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Monthly Quota</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-foreground">{creditsSummary.remaining.toLocaleString()} / {creditsSummary.limit.toLocaleString()} credits used</span>
                <span className="text-muted-foreground">{creditsSummary.percentUsed}%</span>
              </div>
              <Progress value={creditsSummary.percentUsed} className="h-3" />
            </div>
            <p className="text-xs text-muted-foreground">
              {creditsSummary.remaining.toLocaleString()} credits remaining. Upgrade your plan to increase quota.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Different Views */}
      <div>
        <Tabs defaultValue="monthly" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="monthly">Monthly Trend</TabsTrigger>
            <TabsTrigger value="projects">By Project</TabsTrigger>
            <TabsTrigger value="videos">By Video</TabsTrigger>
          </TabsList>

          {/* Monthly Trend Chart */}
          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle>Credits by Month</CardTitle>
                <CardDescription>Image vs Video usage trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-96 rounded-lg" />
                ) : (
                  <div className="space-y-8">
                    {/* Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Image Credits */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-sm bg-foreground" />
                            <span className="text-sm font-medium text-foreground">Image Credits</span>
                          </div>
                          <span className="text-sm text-muted-foreground font-medium">
                            Total: {totalImage}
                          </span>
                        </div>
                        <div className="h-32 space-y-3">
                          {mockMonthlyData.map((month, index) => (
                            <div key={month.month} className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground w-12">{month.month}</span>
                                <div className="flex-1 mx-2">
                                  <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                      className="absolute left-0 top-0 h-full bg-foreground rounded-full"
                                      style={{ width: `${(month.image / maxMonthly) * 100}%` }}
                                      whileHover={{ scaleY: 1.3 }}
                                      transition={{ duration: 0.2 }}
                                    />
                                  </div>
                                </div>
                                <span className="font-medium text-foreground w-16 text-right">
                                  {month.image} cr
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Video Credits */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-sm bg-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">Video Credits</span>
                          </div>
                          <span className="text-sm text-muted-foreground font-medium">
                            Total: {totalVideo}
                          </span>
                        </div>
                        <div className="h-32 space-y-3">
                          {mockMonthlyData.map((month, index) => (
                            <div key={month.month} className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground w-12">{month.month}</span>
                                <div className="flex-1 mx-2">
                                  <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                      className="absolute left-0 top-0 h-full bg-muted-foreground rounded-full"
                                      style={{ width: `${(month.video / maxMonthly) * 100}%` }}
                                      whileHover={{ scaleY: 1.3 }}
                                      transition={{ duration: 0.2 }}
                                    />
                                  </div>
                                </div>
                                <span className="font-medium text-foreground w-16 text-right">
                                  {month.video} cr
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="border-t pt-4 flex gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-foreground rounded-full" />
                        <span className="text-sm text-foreground">Image Credits</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-muted-foreground rounded-full" />
                        <span className="text-sm text-foreground">Video Credits</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Chart */}
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Credits by Project</CardTitle>
                <CardDescription>Image and video credit distribution per project</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-96 rounded-lg" />
                ) : (
                  <div className="space-y-6">
                    {mockProjectData.map((project, idx) => (
                      <div key={idx} className="space-y-3 p-3 rounded-lg hover:bg-accent/30">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{project.name}</p>
                            <p className="text-xs text-muted-foreground">{project.total} total credits</p>
                          </div>
                          <Badge variant={project.status === "active" ? "default" : project.status === "completed" ? "secondary" : "outline"}>
                            {getStatusText(project.status)}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-foreground" />
                              <span>Image: {project.imageCredits} cr</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                              <span>Video: {project.videoCredits} cr</span>
                            </div>
                          </div>
                          <div className="relative h-3 w-full bg-muted rounded-full overflow-hidden">
                            {/* Image segment */}
                            <motion.div
                              className="absolute left-0 top-0 h-full bg-foreground rounded-full"
                              style={{ width: `${(project.imageCredits / maxProjectValue) * 100}%` }}
                              whileHover={{ scaleY: 1.5 }}
                              transition={{ duration: 0.2 }}
                            />
                            {/* Video segment */}
                            <motion.div
                              className="absolute left-0 top-0 h-full bg-muted-foreground rounded-full"
                              style={{ width: `${(project.videoCredits / maxProjectValue) * 100}%`, left: `${(project.imageCredits / maxProjectValue) * 100}%` }}
                              whileHover={{ scaleY: 1.5 }}
                              transition={{ duration: 0.2 }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Videos Chart */}
          <TabsContent value="videos">
            <Card>
              <CardHeader>
                <CardTitle>Credits by Video</CardTitle>
                <CardDescription>Detailed credit usage for each video in projects</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-96 rounded-lg" />
                ) : (
                  <div className="space-y-4">
                    {mockVideoData.map((video, idx) => (
                      <div key={idx} className="border border-border rounded-lg p-4 hover:bg-accent/50">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm text-foreground">{video.name}</p>
                              <Badge variant="outline" className="text-xs">
                                {video.model}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{video.project}</p>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>0 cr</span>
                                <span>{maxVideoValue} cr</span>
                              </div>
                              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                  className="absolute left-0 top-0 h-full rounded-full bg-foreground"
                                  style={{ width: `${(video.credits / maxVideoValue) * 100}%` }}
                                  whileHover={{ scaleY: 2 }}
                                  transition={{ duration: 0.2 }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-sm font-medium text-foreground w-16 text-right">{video.credits} cr</span>
                            <Badge
                              variant={
                                video.status === "completed"
                                  ? "default"
                                  : video.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {getStatusText(video.status)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}