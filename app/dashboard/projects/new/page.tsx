"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Link as LinkIcon, FolderPlus, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function AddProjectPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock network request to "save" project
        setTimeout(() => {
            setIsLoading(false);
            // Automatically navigate back to projects lists
            router.push("/dashboard/projects");
        }, 1200);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto pb-10">
            {/* Back Navigation */}
            <Button asChild variant="ghost" size="sm" className="hover:bg-foreground/5 -ml-3 mb-4">
                <Link href="/dashboard/projects">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Projects
                </Link>
            </Button>

            {/* Header */}
            <div>
                <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                    <FolderPlus className="w-4 h-4" />
                    Showcase Management
                </span>
                <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">
                    Add New Project
                </h1>
                <p className="text-muted-foreground">
                    Submit your latest work. Approved projects will be featured securely in your public portfolio and across the Zenter platform.
                </p>
            </div>

            <div className="p-6 md:p-8 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-md relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-foreground/5 pointer-events-none" />

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="space-y-3">
                        <Label htmlFor="title" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Project Title</Label>
                        <Input
                            id="title"
                            placeholder="e.g. Next.js Analytics Dashboard"
                            required
                            disabled={isLoading}
                            className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="description" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Provide a detailed explanation about the problem this project solves, your tech stack, and what you learned..."
                            required
                            disabled={isLoading}
                            className="bg-transparent border-foreground/20 min-h-[140px] rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground resize-y"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="tags" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Tech Stack (comma separated)</Label>
                        <Input
                            id="tags"
                            placeholder="e.g. React, Tailwind, Supabase"
                            required
                            disabled={isLoading}
                            className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground font-mono text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label htmlFor="github" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">GitHub Repository</Label>
                            <div className="relative">
                                <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="github"
                                    type="url"
                                    placeholder="https://github.com/..."
                                    required
                                    disabled={isLoading}
                                    className="pl-11 bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="demo" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Live Demo</Label>
                            <div className="relative">
                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="demo"
                                    type="url"
                                    placeholder="https://..."
                                    disabled={isLoading}
                                    className="pl-11 bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-foreground/10 mt-8 pt-8">
                        <div className="space-y-0.5">
                            <Label className="text-base font-display">Publish Project</Label>
                            <p className="text-sm text-muted-foreground">Allow community viewing on showcase.</p>
                        </div>
                        <Switch defaultChecked disabled={isLoading} />
                    </div>

                    <div className="pt-4 flex justify-end gap-4 border-t border-foreground/10 pt-8">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isLoading}
                            onClick={() => router.push("/dashboard/projects")}
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
                                    Saving
                                </>
                            ) : "Save Project"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
