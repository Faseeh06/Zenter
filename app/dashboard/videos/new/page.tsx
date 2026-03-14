"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Link as LinkIcon, Video as VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

function getYoutubeThumbnailUrl(videoUrl: string): string | null {
    const m = videoUrl?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? `https://img.youtube.com/vi/${m[1]}/mqdefault.jpg` : null;
}

export default function AddVideoPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const videoUrl = formData.get("url") as string;
        const customThumb = (formData.get("thumbnail") as string)?.trim() || null;
        // Use custom thumbnail if provided, otherwise use YouTube thumbnail for YouTube URLs
        const thumbnailUrl = customThumb || getYoutubeThumbnailUrl(videoUrl) || null;

        const supabase = createSupabaseBrowserClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setError("You must be logged in to add a video.");
            setIsLoading(false);
            return;
        }

        // Ensure profile exists (fixes FK if user signed up before trigger or trigger missed)
        await supabase.from("profiles").upsert(
            {
                id: user.id,
                full_name: user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? null,
                avatar_url: user.user_metadata?.avatar_url ?? null,
            },
            { onConflict: "id" }
        );

        const { error: insertError } = await supabase.from("videos").insert({
            title,
            description: description || null,
            video_url: videoUrl,
            thumbnail_url: thumbnailUrl,
            created_by: user.id,
        });

        if (insertError) {
            setError(insertError.message);
            setIsLoading(false);
            return;
        }

        router.push("/dashboard/videos");
        setIsLoading(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto pb-10">
            <Button asChild variant="ghost" size="sm" className="hover:bg-foreground/5 -ml-3 mb-4">
                <Link href="/dashboard/videos">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Videos
                </Link>
            </Button>

            <div>
                <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                    <VideoIcon className="w-4 h-4" />
                    Content Management
                </span>
                <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">
                    Add New Video
                </h1>
                <p className="text-muted-foreground">
                    Add a video by URL (e.g. YouTube). Learners can track progress and mark as complete.
                </p>
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
                        <Label htmlFor="title" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Video Title</Label>
                        <Input
                            id="title"
                            name="title"
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
                            name="description"
                            placeholder="Brief summary of what learners will get out of this video..."
                            disabled={isLoading}
                            className="bg-transparent border-foreground/20 min-h-[120px] rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground resize-y"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="url" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Video URL</Label>
                        <div className="relative">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="url"
                                name="url"
                                type="url"
                                placeholder="https://youtube.com/watch?v=... or https://youtu.be/..."
                                required
                                disabled={isLoading}
                                className="pl-11 bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="thumbnail" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Thumbnail URL (optional)</Label>
                        <Input
                            id="thumbnail"
                            name="thumbnail"
                            type="url"
                            placeholder="Leave empty to use the YouTube video thumbnail"
                            disabled={isLoading}
                            className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground"
                        />
                        <p className="text-xs text-muted-foreground">For YouTube links, the video&apos;s thumbnail is used automatically if you leave this blank.</p>
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
