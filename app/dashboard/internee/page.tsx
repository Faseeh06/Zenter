import Link from "next/link";
import { Briefcase, CheckCircle2, CircleDashed, Clock, FileText, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function getCurrentApplication() {
    const supabase = createSupabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
        .from("internee_applications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (error || !data) return null;

    return {
        id: data.id,
        role: data.skills || "Internee",
        appliedDate: data.created_at ? new Date(data.created_at).toLocaleDateString() : "",
        status: data.status ?? "Pending",
        feedback: data.message || "Your application is being reviewed.",
    };
}

export default async function InterneeStatusPage() {
    const currentApplication = await getCurrentApplication();

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto flex flex-col h-full">
            {/* Header section */}
            <div>
                <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">Internship Program</h1>
                <p className="text-muted-foreground">
                    Track your application status or apply to join the Zenter core team.
                </p>
            </div>

            {!currentApplication ? (
                // State 1: Has Not Applied
                <Card className="bg-background/50 border-foreground/10 overflow-hidden relative">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-foreground/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                    <CardHeader className="pb-4">
                        <div className="w-12 h-12 rounded-lg bg-foreground text-background flex items-center justify-center mb-4">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-2xl font-display tracking-tight">Ready to build the future?</CardTitle>
                        <CardDescription className="text-base">
                            Apply to become a Zenter Internee. You'll work on real-world projects, get mentored by seniors, and build a resume that stands out.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">What we look for</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Passion for learning</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> At least 2 showcase projects</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Completed video modules</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Strong communication skills</li>
                        </ul>
                    </CardContent>
                    <CardFooter className="pt-6">
                        <Button asChild size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-mono group">
                            <Link href="/dashboard/internee/apply">
                                Start Application <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                // State 2: Has Applied
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="bg-background/50 border-foreground/10">
                            <CardHeader className="pb-4 border-b border-foreground/10 mb-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-2xl font-display mb-1">{currentApplication.role}</CardTitle>
                                        <CardDescription>Applied on {currentApplication.appliedDate}</CardDescription>
                                    </div>
                                    <div className="px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-500 text-xs font-mono font-medium flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        {currentApplication.status}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Latest Update</h4>
                                    <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10 text-sm leading-relaxed">
                                        "{currentApplication.feedback}"
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Application Journey</h4>
                                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-foreground/10 before:to-transparent">
                                        {/* Step 1 */}
                                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                            <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-foreground bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-foreground">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                            </div>
                                            <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-foreground/10 bg-background/50">
                                                <div className="font-display font-medium">Application Submitted</div>
                                                <div className="text-xs text-muted-foreground mt-1">We received your profile and projects.</div>
                                            </div>
                                        </div>
                                        {/* Step 2 */}
                                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                            <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-orange-500 bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-orange-500">
                                                <CircleDashed className="w-3.5 h-3.5 animate-[spin_3s_linear_infinite]" />
                                            </div>
                                            <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-orange-500/20 bg-orange-500/5">
                                                <div className="font-display font-medium text-orange-600 dark:text-orange-400">Under Review</div>
                                                <div className="text-xs text-orange-600/70 dark:text-orange-400/70 mt-1">Our mentors are reviewing your code.</div>
                                            </div>
                                        </div>
                                        {/* Step 3 */}
                                        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                            <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-foreground/20 bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-foreground/20">
                                                <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
                                            </div>
                                            <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-transparent opacity-50">
                                                <div className="font-display font-medium">Interview</div>
                                                <div className="text-xs text-muted-foreground mt-1">Technical discussion with the team.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-background/50 border-foreground/10">
                            <CardHeader>
                                <CardTitle className="font-display text-lg">Make an Impression</CardTitle>
                                <CardDescription>Tips to boost your chances while you wait.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded bg-foreground/5 flex items-center justify-center shrink-0">
                                        <FileText className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-medium">Add more projects</h5>
                                        <p className="text-xs text-muted-foreground mt-0.5">The showcase is your best resume.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded bg-foreground/5 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-medium">Finish your videos</h5>
                                        <p className="text-xs text-muted-foreground mt-0.5">Show us your dedication to learning.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}
