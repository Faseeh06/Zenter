"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Link as LinkIcon, Video as VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddVideoPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock network request to "save" video
        setTimeout(() => {
            setIsLoading(false);
            // Automatically navigate back to videos lists
            router.push("/dashboard/videos");
        }, 1200);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto pb-10">
            {/* Back Navigation */}
            <Button asChild variant="ghost" size="sm" className="hover:bg-foreground/5 -ml-3 mb-4">
                <Link href="/dashboard/videos">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Videos
                </Link>
            </Button>

            {/* Header */}
            <div>
                <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                    <VideoIcon className="w-4 h-4" />
                    Content Management
                </span>
                <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">
                    Add New Video
                </h1>
                <p className="text-muted-foreground">
                    Upload a new lecture or attach an external URL to the learning library.
                </p>
            </div>

            <div className="p-6 md:p-8 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-md relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-foreground/5 pointer-events-none" />

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="space-y-3">
                        <Label htmlFor="title" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Video Title</Label>
                        <Input
                            id="title"
                            placeholder="e.g. Introduction to React Hooks"
                            required
                            disabled={isLoading}
                            className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="description" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Provide a brief summary of what learners will get out of this module..."
                            required
                            disabled={isLoading}
                            className="bg-transparent border-foreground/20 min-h-[120px] rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground resize-y"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label htmlFor="category" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Category</Label>
                            <select
                                id="category"
                                required
                                disabled={isLoading}
                                className="flex h-14 w-full bg-transparent border border-foreground/20 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-foreground appearance-none rounded-none"
                            >
                                <option value="Frontend" className="bg-background">Frontend</option>
                                <option value="Backend" className="bg-background">Backend</option>
                                <option value="UI/UX" className="bg-background">UI/UX</option>
                                <option value="Career" className="bg-background">Career</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="duration" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Duration (approx)</Label>
                            <Input
                                id="duration"
                                placeholder="e.g. 45m or 1h 20m"
                                required
                                disabled={isLoading}
                                className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="url" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Video URL</Label>
                        <div className="relative">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="url"
                                type="url"
                                placeholder="https://youtube.com/watch?v=..."
                                required
                                disabled={isLoading}
                                className="pl-11 bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-4 border-t border-foreground/10 mt-8 pt-8">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isLoading}
                            onClick={() => router.push("/dashboard/videos")}
                            className="h-12 rounded-full px-8 border-foreground/20 hover:bg-foreground/5 font-mono text-sm"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="h-12 rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 font-mono text-sm"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Publishing
                                </>
                            ) : "Publish Video"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
