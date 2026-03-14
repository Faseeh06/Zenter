import Link from "next/link";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const thumbColors = ["bg-blue-500/10", "bg-purple-500/10", "bg-green-500/10", "bg-orange-500/10", "bg-rose-500/10", "bg-yellow-500/10"];

export default async function ShowcasePage() {
    const supabase = await createSupabaseServerClient();
    const { data: projects } = await supabase
        .from("projects")
        .select("id, title, description, live_url, github_url, thumbnail_url, user_id, profiles(full_name)")
        .order("created_at", { ascending: false });

    const list = (projects ?? []).map((p: { id: string; title: string; description: string | null; live_url: string | null; github_url: string | null; thumbnail_url: string | null; profiles: { full_name: string | null } | null }) => ({
        id: p.id,
        title: p.title,
        description: p.description ?? "",
        student: p.profiles?.full_name ?? "Zenter Learner",
        image: thumbColors[Math.abs((p.title?.length ?? 0)) % thumbColors.length],
        thumbnail_url: p.thumbnail_url,
        demoUrl: p.live_url ?? "#",
        githubUrl: p.github_url ?? "#",
    }));

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />

            <main className="flex-1 pt-24 pb-20">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex flex-col items-center text-center space-y-4 mb-16 max-w-3xl mx-auto">
                        <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
                            <span className="w-8 h-px bg-foreground/30" />
                            Community Spotlight
                            <span className="w-8 h-px bg-foreground/30" />
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight">
                            Built by Zenter Learners.
                        </h1>
                        <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                            Explore amazing projects, portfolios, and applications built by our global community.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {list.map((project) => (
                            <Card key={project.id} className="bg-background/50 border-foreground/10 overflow-hidden group hover:border-foreground/30 transition-all flex flex-col">
                                <div className={`aspect-video w-full ${project.image} relative border-b border-foreground/10 flex items-center justify-center p-6 group-hover:bg-foreground/5 transition-colors overflow-hidden`}>
                                    {project.thumbnail_url ? (
                                        <img src={project.thumbnail_url} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center font-display text-2xl text-foreground/30 group-hover:text-foreground/50 transition-colors">
                                            {project.title.split(" ")[0]}
                                        </div>
                                    )}
                                </div>
                                <CardHeader className="p-5 pb-2">
                                    <h3 className="font-display text-xl leading-snug">{project.title}</h3>
                                    <p className="text-sm font-medium text-foreground/70">by {project.student}</p>
                                </CardHeader>
                                <CardContent className="p-5 pt-2 flex-1">
                                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                        {project.description}
                                    </p>
                                </CardContent>
                                <CardFooter className="p-5 pt-0 border-t border-foreground/5 mt-auto flex gap-3">
                                    <Button variant="outline" className="flex-1 rounded-full text-xs font-mono border-foreground/20 hover:bg-foreground/5" asChild>
                                        <Link href={project.githubUrl} target="_blank">
                                            <Github className="w-3.5 h-3.5 mr-2" />
                                            View Code
                                        </Link>
                                    </Button>
                                    <Button className="flex-1 rounded-full text-xs font-mono bg-foreground text-background hover:bg-foreground/90" asChild>
                                        <Link href={project.demoUrl} target="_blank">
                                            <ExternalLink className="w-3.5 h-3.5 mr-2" />
                                            Live Demo
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {list.length === 0 && (
                        <p className="text-center text-muted-foreground py-12">No projects on the showcase yet. Be the first to add one!</p>
                    )}

                    <div className="mt-16 text-center">
                        <Button asChild size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-mono text-sm px-8">
                            <Link href="/signup">
                                Sign up to submit your project
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>

            <FooterSection />
        </div>
    );
}
