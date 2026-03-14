"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function ApplyPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const role = (formData.get("role") as string) || "Frontend Developer Intern";
        const motivation = formData.get("motivation") as string;
        const portfolio = formData.get("portfolio") as string;
        const resume = formData.get("resume") as string;

        const supabase = createSupabaseBrowserClient();

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            setError("You must be logged in to apply.");
            setIsLoading(false);
            return;
        }

        const { error: insertError } = await supabase.from("internee_applications").insert({
            user_id: user.id,
            skills: role,
            portfolio_url: portfolio,
            message: motivation,
            // you can also store resume link in a dedicated column if you add it
        });

        if (insertError) {
            setError(insertError.message || "Unable to submit application. Please try again.");
            setIsLoading(false);
            return;
        }

        router.push("/dashboard/internee");
        setIsLoading(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto pb-10">
            {/* Back Navigation */}
            <Button asChild variant="ghost" size="sm" className="hover:bg-foreground/5 -ml-3 mb-4">
                <Link href="/dashboard/internee">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Application
                </Link>
            </Button>

            {/* Header */}
            <div>
                <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                    <Send className="w-4 h-4" />
                    Zenter Core Team
                </span>
                <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">
                    Apply as Internee
                </h1>
                <p className="text-muted-foreground">
                    Fill out the questions below to submit your application. Show us what makes you a unique candidate.
                </p>
            </div>

            <div className="p-6 md:p-8 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-md relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-foreground/5 pointer-events-none bg-foreground/[0.02]" />

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">

                    {error && (
                        <div className="p-4 text-sm bg-destructive/10 text-destructive border border-destructive/20 rounded-none font-mono">
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <Label htmlFor="role" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Desired Role</Label>
                        <select
                            id="role"
                            name="role"
                            required
                            disabled={isLoading}
                            className="flex h-14 w-full bg-transparent border border-foreground/20 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-foreground appearance-none rounded-none"
                        >
                            <option value="Frontend Developer Intern" className="bg-background">Frontend Developer Intern</option>
                            <option value="Backend Developer Intern" className="bg-background">Backend Developer Intern</option>
                            <option value="Full-Stack Developer Intern" className="bg-background">Full-Stack Developer Intern</option>
                            <option value="UI/UX Design Intern" className="bg-background">UI/UX Design Intern</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="motivation" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Why do you want to join Zenter?</Label>
                        <Textarea
                            id="motivation"
                            placeholder="Tell us about yourself and what you hope to achieve here..."
                            required
                            disabled={isLoading}
                            className="bg-transparent border-foreground/20 min-h-[140px] rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground resize-y"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="portfolio" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Portfolio Link</Label>
                        <Input
                            id="portfolio"
                            type="url"
                            placeholder="https://your-portfolio.com"
                            required
                            disabled={isLoading}
                            className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground font-mono text-sm"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="resume" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Resume (Google Drive or Dropbox Link)</Label>
                        <Input
                            id="resume"
                            type="url"
                            placeholder="https://drive.google.com/..."
                            required
                            disabled={isLoading}
                            className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground font-mono text-sm"
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-4 border-t border-foreground/10 pt-8 mt-8">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isLoading}
                            onClick={() => router.push("/dashboard/internee")}
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
                                    Submitting
                                </>
                            ) : "Submit Application"}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}
