"use client";

import Link from "next/link";
import { PlayCircle, Plus, Search, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data
const videoCategories = ["All", "Frontend", "Backend", "UI/UX", "Career"];

const mockVideos = [
    {
        id: "vibe-coding",
        title: "Vibe Coding Secrets for Maximum Productivity 🔥",
        description: "Learn how to vibe code your way to shipping products faster than ever.",
        category: "Career",
        duration: "10m",
        progress: 0,
        status: "not-started",
        thumbnail: "bg-red-500/20",
        youtubeId: "k4ox3iHLH-Q"
    },
    {
        id: "v1",
        title: "Next.js 14 App Router Fundamentals",
        description: "Learn the core concepts of the new App Router in Next.js 14, including Server Components and routing.",
        category: "Frontend",
        duration: "45m",
        progress: 100,
        status: "completed",
        thumbnail: "bg-blue-500/20",
    },
    {
        id: "v2",
        title: "Advanced React Patterns",
        description: "Master advanced React design patterns like compound components, render props, and custom hooks.",
        category: "Frontend",
        duration: "1h 20m",
        progress: 30,
        status: "in-progress",
        thumbnail: "bg-purple-500/20",
    },
    {
        id: "v3",
        title: "Intro to Supabase Auth & DB",
        description: "Build severe backend systems quickly with Supabase. Covering authentication, row-level security, and edge functions.",
        category: "Backend",
        duration: "55m",
        progress: 0,
        status: "not-started",
        thumbnail: "bg-green-500/20",
    },
    {
        id: "v4",
        title: "Figma to Code Workflow",
        description: "Translate high-fidelity Figma designs into pixel-perfect React code using Tailwind CSS and shadcn ui.",
        category: "UI/UX",
        duration: "1h 10m",
        progress: 0,
        status: "not-started",
        thumbnail: "bg-orange-500/20",
    },
    {
        id: "v5",
        title: "Resume & Interview Prep",
        description: "Optimize your resume for ATS, build a standout portfolio, and ace technical behavioral interviews.",
        category: "Career",
        duration: "40m",
        progress: 0,
        status: "not-started",
        thumbnail: "bg-rose-500/20",
    },
];

export default function VideosPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto flex flex-col h-full">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">Video Lectures</h1>
                    <p className="text-muted-foreground">
                        Curated content to help you learn, build, and grow your engineering skills.
                    </p>
                </div>
                <Button asChild className="rounded-full bg-foreground text-background hover:bg-foreground/90 shrink-0">
                    <Link href="/dashboard/videos/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Video
                    </Link>
                </Button>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center no-scrollbar">
                <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 w-full md:w-auto">
                    {videoCategories.map((cat, i) => (
                        <Badge
                            key={cat}
                            variant={i === 0 ? "default" : "outline"}
                            className={`rounded-full px-4 py-1.5 font-mono text-xs cursor-pointer whitespace-nowrap ${i === 0 ? "" : "hover:bg-foreground/5 border-foreground/20"
                                }`}
                        >
                            {cat}
                        </Badge>
                    ))}
                </div>
                <div className="relative w-full md:w-64 shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search videos..."
                        className="pl-9 bg-background/50 border-foreground/20 rounded-md focus-visible:ring-1 focus-visible:ring-foreground"
                    />
                </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {mockVideos.map((video) => (
                    <Card key={video.id} className="bg-background/50 border-foreground/10 rounded-xl overflow-hidden flex flex-col group hover:border-foreground/30 transition-all">
                        <Link href={`/dashboard/videos/${video.id}`} className="flex flex-col flex-1">
                            {/* Thumbnail Area */}
                            <div className={`aspect-video w-full ${video.thumbnail} relative flex items-center justify-center border-b border-foreground/10 group-hover:bg-foreground/5 transition-colors`}>
                                <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                                        <PlayCircle className="w-6 h-6 ml-1" />
                                    </div>
                                </div>
                                {/* Meta badges on thumbnail */}
                                <div className="absolute top-3 left-3">
                                    <Badge variant="secondary" className="bg-background/80 backdrop-blur font-mono border-foreground/10">
                                        {video.category}
                                    </Badge>
                                </div>
                                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs font-mono bg-background/80 backdrop-blur px-2 py-1 rounded-md border border-foreground/10 shadow-sm">
                                    <Clock className="w-3 h-3" />
                                    {video.duration}
                                </div>
                            </div>

                            {/* Content Area */}
                            <CardContent className="p-5 flex-1 flex flex-col">
                                <h3 className="text-lg font-medium leading-tight mb-2 group-hover:underline decoration-foreground/50 underline-offset-4">
                                    {video.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-auto">
                                    {video.description}
                                </p>
                            </CardContent>

                            {/* Footer Progress Area */}
                            <CardFooter className="p-5 pt-0 block">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-mono text-muted-foreground">
                                        {video.status === 'completed' ? 'Completed' :
                                            video.status === 'in-progress' ? 'In Progress' :
                                                'Not Started'}
                                    </span>
                                    {video.status === 'completed' ? (
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                    ) : (
                                        <span className="text-xs font-mono font-medium">{video.progress}%</span>
                                    )}
                                </div>
                                <Progress
                                    value={video.progress}
                                    className={`h-1.5 bg-foreground/10 ${video.status === 'completed' ? 'text-primary' : ''}`}
                                />
                            </CardFooter>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    );
}
