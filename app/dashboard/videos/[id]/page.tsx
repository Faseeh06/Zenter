"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Play, CheckCircle2, Clock, Share2, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const mockVideos = [
    {
        id: "vibe-coding",
        title: "Vibe Coding Secrets for Maximum Productivity 🔥",
        description: "Learn how to vibe code your way to shipping products faster than ever. This tutorial covers practical examples and hidden secrets to maximizing your output without burning out.",
        category: "Career",
        duration: "10m",
        progress: 0,
        instructor: "Vibe Coder",
        publishDate: "Today",
        youtubeId: "k4ox3iHLH-Q"
    },
    {
        id: "v1",
        title: "Next.js 14 App Router Fundamentals",
        description: "Learn the core concepts of the new App Router in Next.js 14, including Server Components, routing, layouts, and data fetching techniques.",
        category: "Frontend",
        duration: "45m",
        progress: 100,
        instructor: "Sarah Jenkins",
        publishDate: "Oct 24, 2024",
    }
];

export default function VideoDetailPage() {
    const params = useParams();
    const router = useRouter();
    const videoId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : "v1";
    const mockVideo = mockVideos.find(v => v.id === videoId) || mockVideos[1];

    const [isPlaying, setIsPlaying] = useState(false);
    const [isCompleted, setIsCompleted] = useState(mockVideo.progress === 100);

    const handleMarkComplete = () => {
        setIsCompleted(!isCompleted);
        // In a real app, this would trigger an API call to update progress
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto pb-10">
            {/* Back Navigation */}
            <Button asChild variant="ghost" size="sm" className="hover:bg-foreground/5 -ml-3">
                <Link href="/dashboard/videos">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Videos
                </Link>
            </Button>

            {/* Video Player Area */}
            <div className="w-full aspect-video bg-foreground/5 border border-foreground/10 rounded-2xl overflow-hidden relative group">
                {!isPlaying ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/20 backdrop-blur-sm">
                        <Button
                            size="icon"
                            className="w-16 h-16 rounded-full bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-transform shadow-xl"
                            onClick={() => setIsPlaying(true)}
                        >
                            <Play className="w-8 h-8 ml-1" />
                        </Button>
                        <p className="mt-4 font-mono text-sm tracking-widest uppercase text-muted-foreground">Click to watch</p>
                    </div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                        {mockVideo.youtubeId ? (
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${mockVideo.youtubeId}?autoplay=1`}
                                title={mockVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        ) : (
                            <p className="text-white/50 font-mono text-sm">(Video Player Placeholder)</p>
                        )}
                    </div>
                )}
            </div>

            {/* Video Metadata */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge variant="secondary" className="font-mono bg-foreground/5 pointer-events-none">
                                {mockVideo.category}
                            </Badge>
                            <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-foreground/5 px-2 py-1 rounded-md border border-foreground/10">
                                <Clock className="w-3 h-3" />
                                {mockVideo.duration}
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-4">
                            {mockVideo.title}
                        </h1>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {mockVideo.description}
                        </p>
                    </div>

                    <Separator className="bg-foreground/10" />

                    {/* Instructor Info */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center font-display text-xl text-foreground">
                            {mockVideo.instructor.charAt(0)}
                        </div>
                        <div>
                            <p className="font-medium">{mockVideo.instructor}</p>
                            <p className="text-sm font-mono text-muted-foreground">Senior Engineer • Published {mockVideo.publishDate}</p>
                        </div>
                    </div>
                </div>

                {/* Action Panel */}
                <div className="space-y-4">
                    <div className="p-6 rounded-xl border border-foreground/10 bg-background/50 backdrop-blur-md">
                        <h3 className="font-display tracking-tight text-xl mb-4">Your Progress</h3>

                        <Button
                            onClick={handleMarkComplete}
                            variant={isCompleted ? "outline" : "default"}
                            className={`w-full h-12 rounded-full mb-4 text-base transition-all ${isCompleted
                                ? "border-primary/50 text-foreground bg-primary/10 hover:bg-primary/20"
                                : "bg-foreground text-background hover:bg-foreground/90"
                                }`}
                        >
                            <CheckCircle2 className={`w-5 h-5 mr-2 ${isCompleted ? "text-primary" : ""}`} />
                            {isCompleted ? "Completed" : "Mark as Complete"}
                        </Button>

                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" className="w-full h-10 border-foreground/20 hover:bg-foreground/5">
                                <BookmarkPlus className="w-4 h-4 mr-2" />
                                Save
                            </Button>
                            <Button variant="outline" className="w-full h-10 border-foreground/20 hover:bg-foreground/5">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
