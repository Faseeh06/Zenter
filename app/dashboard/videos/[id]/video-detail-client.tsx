"use client";

import { useState } from "react";
import { Play, CheckCircle2, BookmarkPlus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Props = {
    videoId: string;
    title: string;
    description: string;
    videoUrl: string;
    youtubeId: string | null;
    progressId: string | null;
    initialCompleted: boolean;
};

export function VideoDetailClient({ videoId, title, description, videoUrl, youtubeId, progressId, initialCompleted }: Props) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isCompleted, setIsCompleted] = useState(initialCompleted);

    const handleMarkComplete = async () => {
        const supabase = createSupabaseBrowserClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const newStatus = isCompleted ? "in_progress" : "completed";
        if (progressId) {
            await supabase.from("video_progress").update({ status: newStatus, updated_at: new Date().toISOString() }).eq("id", progressId);
        } else {
            await supabase.from("video_progress").insert({
                user_id: user.id,
                video_id: videoId,
                status: newStatus,
                watched_duration: newStatus === "completed" ? 9999 : 0,
            });
        }
        setIsCompleted(!isCompleted);
    };

    const embedUrl = youtubeId
        ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1`
        : videoUrl?.startsWith("http") ? videoUrl : null;

    return (
        <>
            <div className="w-full aspect-video bg-foreground/5 border border-foreground/10 rounded-2xl overflow-hidden relative group">
                {!isPlaying ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/20 backdrop-blur-sm">
                        <Button
                            size="icon"
                            className="w-16 h-16 rounded-full bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-transform shadow-xl"
                            onClick={() => setIsPlaying(true)}
                        >
                            <Play className="w-8 h-8 ml-1" />
                        </Button>
                        <p className="mt-4 font-mono text-sm tracking-widest uppercase text-muted-foreground">Click to watch</p>
                    </div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                        {embedUrl ? (
                            <iframe
                                className="w-full h-full"
                                src={embedUrl}
                                title={title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        ) : (
                            <p className="text-white/50 font-mono text-sm">(Video URL not embeddable)</p>
                        )}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-4">{title}</h1>
                    <p className="text-muted-foreground leading-relaxed text-lg">{description}</p>
                </div>

                <div className="space-y-4">
                    <div className="p-6 rounded-xl border border-foreground/10 bg-background/50 backdrop-blur-md">
                        <h3 className="font-display tracking-tight text-xl mb-4">Your Progress</h3>
                        <Button
                            onClick={handleMarkComplete}
                            variant={isCompleted ? "outline" : "default"}
                            className={`w-full h-12 rounded-full mb-4 text-base transition-all ${isCompleted
                                ? "border-primary/50 text-foreground bg-primary/10 hover:bg-primary/20"
                                : "bg-foreground text-background hover:bg-foreground/90"
                                }`}
                        >
                            <CheckCircle2 className={`w-5 h-5 mr-2 ${isCompleted ? "text-primary" : ""}`} />
                            {isCompleted ? "Completed" : "Mark as Complete"}
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" className="w-full h-10 border-foreground/20 hover:bg-foreground/5">
                                <BookmarkPlus className="w-4 h-4 mr-2" />
                                Save
                            </Button>
                            <Button variant="outline" className="w-full h-10 border-foreground/20 hover:bg-foreground/5">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
