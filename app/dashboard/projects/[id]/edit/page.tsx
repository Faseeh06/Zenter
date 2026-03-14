import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { EditProjectForm } from "./edit-project-form";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return (
            <div className="max-w-3xl mx-auto">
                <p className="text-muted-foreground">Please sign in to edit projects.</p>
            </div>
        );
    }

    const { data: project, error } = await supabase
        .from("projects")
        .select("id, title, description, live_url, github_url, thumbnail_url")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

    if (error || !project) {
        return (
            <div className="max-w-3xl mx-auto pb-10">
                <Button asChild variant="ghost" size="sm">
                    <Link href="/dashboard/projects"><ArrowLeft className="w-4 h-4 mr-2" />Back to Projects</Link>
                </Button>
                <p className="mt-6 text-muted-foreground">Project not found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto pb-10">
            <Button asChild variant="ghost" size="sm" className="hover:bg-foreground/5 -ml-3 mb-4">
                <Link href="/dashboard/projects">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Projects
                </Link>
            </Button>
            <EditProjectForm project={project} />
        </div>
    );
}
