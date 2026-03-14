import Link from "next/link";
import { PlusCircle, Search, Laptop, MonitorPlay, FolderKanban, Briefcase, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function getDashboardData() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const [profileRes, videosWatchedRes, projectsRes, applicationRes, recentProgressRes] = await Promise.all([
        supabase.from("profiles").select("full_name").eq("id", user.id).single(),
        supabase.from("video_progress").select("*", { count: "exact", head: true }).eq("user_id", user.id).in("status", ["in_progress", "completed"]),
        supabase.from("projects").select("*", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("internee_applications").select("status").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
        supabase
            .from("video_progress")
            .select("id, status, watched_duration, updated_at, video_id, videos(id, title)")
            .eq("user_id", user.id)
            .order("updated_at", { ascending: false })
            .limit(3),
    ]);

    const fullName = profileRes.data?.full_name?.trim() || "User";
    const videosCount = videosWatchedRes.count ?? 0;
    const projectsCount = projectsRes.count ?? 0;
    const appStatus = applicationRes.data?.status ?? "—";
    const recentRows = recentProgressRes.data ?? [];

    const recentVideos = recentRows.map((row: { id: string; status: string; watched_duration: number; updated_at: string; video_id: string; videos: { id: string; title: string } | null }) => {
        const title = row.videos?.title ?? "Video";
        const progress = row.status === "completed" ? 100 : row.status === "in_progress" ? 50 : 0;
        const updated = row.updated_at ? new Date(row.updated_at) : null;
        const lastWatched = updated ? (Date.now() - updated.getTime() < 86400000 ? "Today" : updated.toLocaleDateString()) : "—";
        return { id: row.video_id ?? row.videos?.id ?? row.id, title, progress, lastWatched };
    });

    return {
        fullName,
        stats: [
            { title: "Videos Watched", value: String(videosCount), description: "Across your learning journey" },
            { title: "Projects Submitted", value: String(projectsCount), description: projectsCount > 0 ? "In your portfolio" : "Add your first project" },
            { title: "Application Status", value: appStatus, description: appStatus === "pending" ? "Reviewed within 48 hours" : appStatus === "—" ? "Not applied yet" : "Updated" },
        ],
        recentVideos,
    };
}

const statIcons = [
    { icon: MonitorPlay, iconColor: "text-blue-500", iconBg: "bg-blue-500/10" },
    { icon: FolderKanban, iconColor: "text-purple-500", iconBg: "bg-purple-500/10" },
    { icon: Briefcase, iconColor: "text-orange-500", iconBg: "bg-orange-500/10" },
];

export default async function DashboardOverview() {
    const data = await getDashboardData();
    if (!data) {
        return (
            <div className="space-y-8 animate-in fade-in duration-500">
                <p className="text-muted-foreground">Please sign in to see your dashboard.</p>
            </div>
        );
    }

    const { fullName, stats, recentVideos } = data;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="relative">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-20 -mt-20 pointer-events-none" />
                <h2 className="text-3xl md:text-4xl font-display tracking-tight mb-2">
                    Welcome back, <span className="bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">{fullName}</span>
                </h2>
                <p className="text-muted-foreground">
                    Here is what is happening with your learning journey today.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat, i) => {
                    const Icon = statIcons[i].icon;
                    return (
                    <Card key={stat.title} className="bg-background/50 border-foreground/10 rounded-xl hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5 transition-all duration-300 group">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground font-mono">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${statIcons[i].iconBg} transition-colors group-hover:bg-foreground/10`}>
                                <Icon className={`h-4 w-4 ${statIcons[i].iconColor} transition-transform group-hover:scale-110`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-display font-medium">{stat.value}</div>
                            <p className="text-xs text-muted-foreground/80 font-mono mt-1">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                    );
                })}
            </div>

            <div className="grid gap-6 md:grid-cols-7">
                <Card className="md:col-span-4 lg:col-span-5 bg-background/50 border-foreground/10 rounded-xl flex flex-col relative overflow-hidden group/card shadow-sm">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-foreground/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none group-hover/card:bg-foreground/10 transition-colors" />
                    <CardHeader>
                        <CardTitle className="font-display text-xl z-10">Continue Learning</CardTitle>
                        <CardDescription className="z-10">
                            Pick up right where you left off
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 flex-1 z-10">
                        {recentVideos.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No video progress yet. Browse videos to get started.</p>
                        ) : (
                            recentVideos.map((video) => (
                                <Link key={video.id} href={`/dashboard/videos/${video.id}`} className="flex items-center gap-4 group cursor-pointer p-2 rounded-lg hover:bg-foreground/[0.02] transition-colors -mx-2 block">
                                    <div className="hidden sm:flex h-12 w-16 bg-foreground/5 rounded font-display text-xs items-center justify-center shrink-0 border border-foreground/10 group-hover:bg-foreground/10 group-hover:border-foreground/20 transition-all group-hover:shadow-sm relative overflow-hidden">
                                        <PlayIcon />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none group-hover:underline decoration-foreground/50 underline-offset-4">
                                            {video.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground font-mono">
                                            {video.lastWatched}
                                        </p>
                                        <Progress value={video.progress} className="h-1 bg-foreground/10 mt-2" />
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground shrink-0" />
                                </Link>
                            ))
                        )}
                    </CardContent>
                </Card>

                <Card className="md:col-span-3 lg:col-span-2 bg-background/50 border-foreground/10 rounded-xl flex flex-col shadow-sm">
                    <CardHeader>
                        <CardTitle className="font-display text-xl">Quick Actions</CardTitle>
                        <CardDescription>What do you want to do?</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        <Button asChild className="w-full justify-start h-12 rounded-lg bg-foreground hover:bg-foreground/90 text-background group transition-all">
                            <Link href="/dashboard/projects/new">
                                <PlusCircle className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                                Add New Project
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full justify-start h-12 rounded-lg border-foreground/20 hover:bg-foreground/5 hover:border-foreground/30 group transition-all">
                            <Link href="/dashboard/videos">
                                <Search className="mr-3 h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                Browse Videos
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full justify-start h-12 rounded-lg border-foreground/20 hover:bg-foreground/5 hover:border-foreground/30 group transition-all">
                            <Link href="/dashboard/internee">
                                <Laptop className="mr-3 h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                Apply as Internee
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function PlayIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 3.5L11.5 7.5L4.5 11.5V3.5Z" fill="currentColor" />
        </svg>
    );
}
