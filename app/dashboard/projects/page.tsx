import Link from "next/link";
import { Plus, FolderDot } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ProjectsListClient } from "./projects-list-client";

export default async function ProjectsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { q } = await searchParams;

    if (!user) {
        return (
            <div className="max-w-6xl mx-auto">
                <p className="text-muted-foreground">Please sign in to view your projects.</p>
            </div>
        );
    }

    let query = supabase
        .from("projects")
        .select("id, title, description, live_url, github_url, thumbnail_url, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
    if (q?.trim()) {
        query = query.ilike("title", `%${q.trim()}%`);
    }
    const { data: projects } = await query;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto flex flex-col h-full">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">My Projects</h1>
                    <p className="text-muted-foreground">
                        Manage your portfolio, share live links, and submit projects for review.
                    </p>
                </div>
                <Button asChild className="rounded-full bg-foreground text-background hover:bg-foreground/90 shrink-0">
                    <Link href="/dashboard/projects/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                    </Link>
                </Button>
            </div>

            <ProjectsListClient
                projects={projects ?? []}
                searchQuery={q}
            />
        </div>
    );
}
