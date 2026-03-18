"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
    return (
        <Suspense fallback={<LoginSkeleton />}>
            <LoginForm />
        </Suspense>
    );
}

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // If user is already logged in, send them to dashboard
    useEffect(() => {
        const checkSession = async () => {
            const supabase = createSupabaseBrowserClient();
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                router.replace("/dashboard");
            }
        };
        checkSession();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const supabase = createSupabaseBrowserClient();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setIsLoading(false);
            setError(error.message || "Unable to sign in. Please try again.");
            return;
        }

        const redirectTo = searchParams.get("redirectTo") || "/dashboard";
        router.push(redirectTo);
        setIsLoading(false);
    };

    return (
        <div className="w-full relative border border-foreground/10 bg-background/50 backdrop-blur-md p-8 lg:p-12 overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-16 h-16 border-b border-l border-foreground/10" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-t border-r border-foreground/10" />

            <div className="relative z-10">
                <div className="mb-10 text-center flex flex-col items-center">
                    <Link href="/" className="mb-8 inline-flex items-center gap-3">
                        <Image
                            src="/Logo/Light.png"
                            alt="Zenter Logo"
                            width={96}
                            height={32}
                            className="object-contain"
                        />
                        <span className="font-sans font-semibold tracking-[0.35em] text-[color:#2596be] text-sm uppercase leading-none">
                            ZENTER
                        </span>
                    </Link>
                    <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
                        <span className="w-8 h-px bg-foreground/30" />
                        Welcome back
                        <span className="w-8 h-px bg-foreground/30" />
                    </span>
                    <h1 className="text-4xl lg:text-5xl font-display tracking-tight mb-3">
                        Sign in to Zenter.
                    </h1>
                    <p className="text-muted-foreground">
                        Use <span className="text-foreground font-mono font-medium">demo@zenter.com</span> and <span className="text-foreground font-mono font-medium">password123</span> to enter.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-4 text-sm bg-destructive/10 text-destructive border border-destructive/20 rounded-none font-mono">
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <Label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            disabled={isLoading}
                            className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground transition-all"
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Password</Label>
                            <Link
                                href="#"
                                className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            defaultValue="password123"
                            placeholder="••••••••"
                            required
                            disabled={isLoading}
                            className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground transition-all"
                        />
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full bg-foreground hover:bg-foreground/90 text-background h-14 text-base rounded-full group transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="text-sm text-center font-mono text-muted-foreground pt-4 border-t border-foreground/10">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-foreground hover:underline hover:text-foreground transition-colors">
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

function LoginSkeleton() {
    return (
        <div className="w-full relative border border-foreground/10 bg-background/50 backdrop-blur-md p-8 lg:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 border-b border-l border-foreground/10" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-t border-r border-foreground/10" />
            <div className="relative z-10 space-y-6">
                <div className="h-6 w-32 bg-foreground/10 rounded" />
                <div className="h-10 w-64 bg-foreground/10 rounded" />
                <div className="h-4 w-80 bg-foreground/10 rounded" />
                <div className="h-12 w-full bg-foreground/10 rounded" />
                <div className="h-12 w-full bg-foreground/10 rounded" />
                <div className="h-12 w-full bg-foreground/10 rounded-full" />
            </div>
        </div>
    );
}
