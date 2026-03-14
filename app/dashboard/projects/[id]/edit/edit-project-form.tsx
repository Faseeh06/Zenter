"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Link as LinkIcon, FolderPlus, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Project = {
    id: string;
    title: string;
    description: string | null;
    live_url: string | null;
    github_url: string | null;
    thumbnail_url: string | null;
};

export function EditProjectForm({ project }: { project: Project }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        const description = (formData.get("description") as string)?.trim() || null;
        const githubUrl = (formData.get("github") as string)?.trim() || null;
        const demoUrl = (formData.get("demo") as string)?.trim() || null;
        const thumbnailUrl = (formData.get("thumbnail") as string)?.trim() || null;

        const supabase = createSupabaseBrowserClient();
        const { error: updateError } = await supabase
            .from("projects")
            .update({ title, description, github_url: githubUrl, live_url: demoUrl, thumbnail_url: thumbnailUrl })
            .eq("id", project.id);

        if (updateError) {
            setError(updateError.message);
            setIsLoading(false);
            return;
        }

        router.push("/dashboard/projects");
        router.refresh();
        setIsLoading(false);
    };

    return (
        <div>
            <div className="mb-6">
                <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                    <FolderPlus className="w-4 h-4" />
                    Edit Project
                </span>
                <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">
                    Update project
                </h1>
            </div>

            <div className="p-6 md:p-8 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-foreground/5 pointer-events-none" />

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    {error && (
                        <div className="p-4 text-sm bg-destructive/10 text-destructive border border-destructive/20 rounded-none font-mono">
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <Label htmlFor="title">Project Title</Label>
                        <Input
                            id="title"
                            name="title"
                            defaultValue={project.title}
                            required
                            disabled={isLoading}
                            className="bg-transparent border-foreground/20 h-14 rounded-none"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={project.description ?? ""}
                            disabled={isLoading}
                            className="bg-transparent border-foreground/20 min-h-[140px] rounded-none resize-y"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label htmlFor="github">GitHub Repository</Label>
                            <div className="relative">
                                <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="github"
                                    name="github"
                                    type="url"
                                    defaultValue={project.github_url ?? ""}
                                    placeholder="https://github.com/..."
                                    disabled={isLoading}
                                    className="pl-11 bg-transparent border-foreground/20 h-14 rounded-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="demo">Live Demo</Label>
                            <div className="relative">
                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="demo"
                                    name="demo"
                                    type="url"
                                    defaultValue={project.live_url ?? ""}
                                    placeholder="https://..."
                                    disabled={isLoading}
                                    className="pl-11 bg-transparent border-foreground/20 h-14 rounded-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="thumbnail">Thumbnail URL (optional)</Label>
                        <Input
                            id="thumbnail"
                            name="thumbnail"
                            type="url"
                            defaultValue={project.thumbnail_url ?? ""}
                            disabled={isLoading}
                            className="bg-transparent border-foreground/20 h-14 rounded-none"
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-4 border-t border-foreground/10 pt-8">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isLoading}
                            onClick={() => router.push("/dashboard/projects")}
                            className="h-12 rounded-full px-8"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="h-12 rounded-full px-8 bg-foreground text-background hover:bg-foreground/90"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving
                                </>
                            ) : "Save changes"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
