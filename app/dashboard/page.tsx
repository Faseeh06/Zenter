import Link from "next/link";
import { PlusCircle, Search, Laptop, MonitorPlay, FolderKanban, Briefcase, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const stats = [
    {
        title: "Videos Watched",
        value: "12",
        icon: MonitorPlay,
        description: "Across 3 different skills",
    },
    {
        title: "Projects Submitted",
        value: "2",
        icon: FolderKanban,
        description: "Last submission 2 days ago",
    },
    {
        title: "Application Status",
        value: "Pending",
        icon: Briefcase,
        description: "Reviewed within 48 hours",
    },
];

const recentVideos = [
    {
        title: "Next.js 14 App Router Fundamentals",
        course: "Full Stack Development",
        progress: 75,
        lastWatched: "2 hours ago",
    },
    {
        title: "Advanced React Patterns",
        course: "Frontend Engineering",
        progress: 30,
        lastWatched: "Yesterday",
    },
    {
        title: "Intro to Supabase Auth & DB",
        course: "Backend & Infrastructure",
        progress: 100,
        lastWatched: "3 days ago",
    },
];

export default function DashboardOverview() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-display tracking-tight mb-2">Welcome back, John Doe</h2>
                <p className="text-muted-foreground">
                    Here is what is happening with your learning journey today.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                {stats.map((stat) => (
                    <Card key={stat.title} className="bg-background/50 border-foreground/10 rounded-xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground font-mono">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-foreground/50" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-display font-medium">{stat.value}</div>
                            <p className="text-xs text-muted-foreground/80 font-mono mt-1">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-7">
                {/* Recent Video Progress */}
                <Card className="md:col-span-4 lg:col-span-5 bg-background/50 border-foreground/10 rounded-xl flex flex-col">
                    <CardHeader>
                        <CardTitle className="font-display text-xl">Continue Learning</CardTitle>
                        <CardDescription>
                            Pick up right where you left off
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 flex-1">
                        {recentVideos.map((video) => (
                            <div key={video.title} className="flex items-center gap-4 group">
                                <div className="hidden sm:flex h-12 w-16 bg-foreground/5 rounded font-display text-xs items-center justify-center shrink-0 border border-foreground/10 group-hover:bg-foreground/10 transition-colors">
                                    <PlayIcon />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none group-hover:underline cursor-pointer">
                                        {video.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground font-mono">
                                        {video.course} • {video.lastWatched}
                                    </p>
                                    <Progress value={video.progress} className="h-1 bg-foreground/10 mt-2" />
                                </div>
                                <Button variant="ghost" size="icon" className="shrink-0 rounded-full w-8 h-8 group-hover:bg-foreground/5">
                                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="md:col-span-3 lg:col-span-2 bg-background/50 border-foreground/10 rounded-xl flex flex-col">
                    <CardHeader>
                        <CardTitle className="font-display text-xl">Quick Actions</CardTitle>
                        <CardDescription>What do you want to do?</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        <Button asChild className="w-full justify-start h-12 rounded-lg bg-foreground hover:bg-foreground/90 text-background">
                            <Link href="/dashboard/projects/new">
                                <PlusCircle className="mr-3 h-4 w-4" />
                                Add New Project
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full justify-start h-12 rounded-lg border-foreground/20 hover:bg-foreground/5">
                            <Link href="/dashboard/videos">
                                <Search className="mr-3 h-4 w-4" />
                                Browse Videos
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full justify-start h-12 rounded-lg border-foreground/20 hover:bg-foreground/5">
                            <Link href="/dashboard/internee">
                                <Laptop className="mr-3 h-4 w-4" />
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
