import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VideoDetailClient } from "./video-detail-client";

function parseYoutubeId(url: string): string | null {
    if (!url) return null;
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
}

export default async function VideoDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: video, error } = await supabase.from("videos").select("id, title, description, video_url").eq("id", id).single();

    if (error || !video) {
        return (
            <div className="max-w-5xl mx-auto pb-10">
                <Button asChild variant="ghost" size="sm">
                    <Link href="/dashboard/videos"><ArrowLeft className="w-4 h-4 mr-2" />Back to Videos</Link>
                </Button>
                <p className="mt-6 text-muted-foreground">Video not found.</p>
            </div>
        );
    }

    let progressRow: { id: string; status: string } | null = null;
    if (user) {
        const { data } = await supabase
            .from("video_progress")
            .select("id, status")
            .eq("user_id", user.id)
            .eq("video_id", id)
            .order("updated_at", { ascending: false })
            .limit(1)
            .maybeSingle();
        progressRow = data;
    }

    const youtubeId = parseYoutubeId(video.video_url);
    const initialCompleted = progressRow?.status === "completed";

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto pb-10">
            <Button asChild variant="ghost" size="sm" className="hover:bg-foreground/5 -ml-3">
                <Link href="/dashboard/videos">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Videos
                </Link>
            </Button>

            <VideoDetailClient
                videoId={video.id}
                title={video.title}
                description={video.description ?? ""}
                videoUrl={video.video_url}
                youtubeId={youtubeId}
                progressId={progressRow?.id ?? null}
                initialCompleted={initialCompleted}
            />
        </div>
    );
}
