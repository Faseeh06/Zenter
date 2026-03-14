"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ExternalLink, MoreVertical, Edit2, Trash2, FolderDot } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Project = {
    id: string;
    title: string;
    description: string | null;
    live_url: string | null;
    github_url: string | null;
    thumbnail_url: string | null;
    created_at: string | null;
};

export function ProjectsListClient({
    projects,
    searchQuery,
}: {
    projects: Project[];
    searchQuery?: string;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleDelete = async (projectId: string) => {
        if (!confirm("Delete this project?")) return;
        const supabase = createSupabaseBrowserClient();
        await supabase.from("projects").delete().eq("id", projectId);
        router.refresh();
    };

    return (
        <>
            <form
                className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
                onSubmit={(e) => {
                    e.preventDefault();
                    const q = (e.currentTarget.querySelector('input[name="q"]') as HTMLInputElement)?.value?.trim() ?? "";
                    const params = new URLSearchParams(searchParams.toString());
                    if (q) params.set("q", q);
                    else params.delete("q");
                    router.push(`/dashboard/projects${params.toString() ? `?${params.toString()}` : ""}`);
                }}
            >
                <div className="relative w-full md:w-96 shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        name="q"
                        defaultValue={searchQuery}
                        placeholder="Search projects by title..."
                        className="w-full h-10 pl-9 pr-4 rounded-md border border-input bg-background/50 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground"
                    />
                </div>
                <span className="text-sm font-mono text-muted-foreground">{projects.length} project{projects.length !== 1 ? "s" : ""}</span>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {projects.map((project) => (
                    <Card key={project.id} className="bg-background/50 border-foreground/10 rounded-xl overflow-hidden flex flex-col group hover:border-foreground/30 transition-all relative">
                        <CardHeader className="p-5 pb-3">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center border border-foreground/10 shrink-0">
                                    <FolderDot className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-foreground/5 hover:text-foreground">
                                            <span className="sr-only">Open menu</span>
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur border-foreground/10 font-mono text-xs">
                                        <DropdownMenuItem asChild>
                                            <Link href={`/dashboard/projects/${project.id}/edit`} className="cursor-pointer hover:bg-foreground/5 focus:bg-foreground/5">
                                                <Edit2 className="mr-2 h-3 w-3" />
                                                Edit Project
                                            </Link>
                                        </DropdownMenuItem>
                                        {project.live_url && (
                                            <DropdownMenuItem asChild>
                                                <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:bg-foreground/5 focus:bg-foreground/5">
                                                    <ExternalLink className="mr-2 h-3 w-3" />
                                                    View Live
                                                </a>
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem
                                            className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                                            onSelect={(e) => { e.preventDefault(); handleDelete(project.id); }}
                                        >
                                            <Trash2 className="mr-2 h-3 w-3" />
                                            Delete Project
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <h3 className="font-display text-xl leading-tight mt-4 group-hover:underline decoration-foreground/50 underline-offset-4">
                                {project.title}
                            </h3>
                            <div className="mt-2">
                                <span className="text-xs font-mono text-muted-foreground bg-foreground/5 px-2 py-1 rounded border border-foreground/10">
                                    Published
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="p-5 pt-0 flex-1">
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                                {project.description ?? ""}
                            </p>
                        </CardContent>
                        <CardFooter className="p-5 pt-0 border-t border-foreground/5 mt-auto bg-foreground/[0.02]">
                            <span className="text-xs font-mono text-muted-foreground">
                                {project.created_at ? new Date(project.created_at).toLocaleDateString() : "—"}
                            </span>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            {projects.length === 0 && (
                <p className="text-center text-muted-foreground py-10">No projects yet. Add your first project.</p>
            )}
        </>
    );
}
