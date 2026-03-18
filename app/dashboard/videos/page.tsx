import Link from "next/link";
import { PlayCircle, Plus, Search, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VideosSearchForm } from "./videos-search-form";

function parseYoutubeId(url: string): string | null {
    if (!url) return null;
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
}

export default async function VideosPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; course?: string }>;
}) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { q, course } = await searchParams;
    let isAdmin = false;
    if (user) {
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
        isAdmin = profile?.role === "admin";
    }

    const { data: allCourses } = await supabase.from("videos").select("course").not("course", "is", null);
    const courseOptions = Array.from(new Set((allCourses ?? []).map((c) => c.course).filter(Boolean))).sort();

    let query = supabase
        .from("videos")
        .select("id, title, course, description, video_url, thumbnail_url")
        .order("created_at", { ascending: false });
    if (q?.trim()) {
        query = query.ilike("title", `%${q.trim()}%`);
    }
    if (course?.trim() && course !== "all") {
        query = query.eq("course", course);
    }
    const { data: videos } = await query;

    const videoIds = (videos ?? []).map((v) => v.id);
    const progressMap: Record<string, { status: string; watched_duration: number }> = {};
    if (user && videoIds.length > 0) {
        const { data: progressRows } = await supabase
            .from("video_progress")
            .select("video_id, status, watched_duration")
            .eq("user_id", user.id)
            .in("video_id", videoIds);
        for (const row of progressRows ?? []) {
            if (!progressMap[row.video_id] || new Date(row.watched_duration) > new Date(progressMap[row.video_id]?.watched_duration ?? 0)) {
                progressMap[row.video_id] = { status: row.status, watched_duration: row.watched_duration };
            }
        }
    }

    const thumbColors = ["bg-red-500/20", "bg-blue-500/20", "bg-purple-500/20", "bg-green-500/20", "bg-orange-500/20", "bg-rose-500/20"];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto flex flex-col h-full">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">Video Lectures</h1>
                    <p className="text-muted-foreground">
                        Curated content to help you learn, build, and grow your engineering skills.
                    </p>
                </div>
                {isAdmin && (
                    <Button asChild className="rounded-full bg-foreground text-background hover:bg-foreground/90 shrink-0">
                        <Link href="/dashboard/videos/new">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Video
                        </Link>
                    </Button>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <VideosSearchForm defaultValue={q} course={course} courses={courseOptions} />
                <span className="text-sm font-mono text-muted-foreground">{videos?.length ?? 0} videos</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {(videos ?? []).map((video, i) => {
                    const prog = progressMap[video.id];
                    const status = prog?.status ?? "not_started";
                    const progress = status === "completed" ? 100 : status === "in_progress" ? 50 : 0;
                    const ytId = parseYoutubeId(video.video_url);
                    const thumbClass = thumbColors[i % thumbColors.length];
                    return (
                        <Card key={video.id} className="bg-background/50 border-foreground/10 rounded-xl overflow-hidden flex flex-col group hover:border-foreground/30 transition-all">
                            <Link href={`/dashboard/videos/${video.id}`} className="flex flex-col flex-1">
                                <div className={`aspect-video w-full ${thumbClass} relative flex items-center justify-center border-b border-foreground/10 group-hover:bg-foreground/5 transition-colors overflow-hidden`}>
                                    {video.thumbnail_url ? (
                                        <img src={video.thumbnail_url} alt="" className="w-full h-full object-cover" />
                                    ) : ytId ? (
                                        <img src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`} alt="" className="w-full h-full object-cover" />
                                    ) : null}
                                    <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                                            <PlayCircle className="w-6 h-6 ml-1" />
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-5 flex-1 flex flex-col">
                                    {video.course && (
                                        <div className="mb-2">
                                            <Badge variant="secondary" className="bg-background/80 backdrop-blur font-mono border-foreground/10">
                                                {video.course}
                                            </Badge>
                                        </div>
                                    )}
                                    <h3 className="text-lg font-medium leading-tight mb-2 group-hover:underline decoration-foreground/50 underline-offset-4">
                                        {video.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mt-auto">
                                        {video.description ?? ""}
                                    </p>
                                </CardContent>
                                <CardFooter className="p-5 pt-0 block">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-mono text-muted-foreground">
                                            {status === "completed" ? "Completed" : status === "in_progress" ? "In Progress" : "Not Started"}
                                        </span>
                                        {status === "completed" ? (
                                            <CheckCircle2 className="w-4 h-4 text-primary" />
                                        ) : (
                                            <span className="text-xs font-mono font-medium">{progress}%</span>
                                        )}
                                    </div>
                                    <Progress value={progress} className="h-1.5 bg-foreground/10" />
                                </CardFooter>
                            </Link>
                        </Card>
                    );
                })}
            </div>
            {(!videos || videos.length === 0) && (
                <p className="text-center text-muted-foreground py-10">No videos yet. Add one or adjust your search.</p>
            )}
        </div>
    );
}
