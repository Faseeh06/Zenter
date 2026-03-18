"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignUpPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // If user is already logged in, redirect to dashboard
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
        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            setIsLoading(false);
            return;
        }

        const supabase = createSupabaseBrowserClient();
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) {
            setError(error.message || "Unable to create account. Please try again.");
            setIsLoading(false);
            return;
        }

        // For email/password sign-up, Supabase may require email verification
        // For now, send them to dashboard and let RLS protect data if needed
        router.push("/dashboard");
        setIsLoading(false);
    };

    return (
        <div className="w-full relative border border-foreground/10 bg-background/50 backdrop-blur-md p-8 lg:p-12 overflow-hidden my-8">
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
                        Get Started
                        <span className="w-8 h-px bg-foreground/30" />
                    </span>
                    <h1 className="text-4xl lg:text-5xl font-display tracking-tight mb-3">
                        Create an account.
                    </h1>
                    <p className="text-muted-foreground">
                        Join Zenter to learn, build, and showcase.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-4 text-sm bg-destructive/10 text-destructive border border-destructive/20 rounded-none font-mono">
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <Label htmlFor="fullName" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Full Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            placeholder="John Doe"
                            required
                            disabled={isLoading}
                            className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground transition-all"
                        />
                    </div>

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
                        <Label htmlFor="password" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            disabled={isLoading}
                            className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground transition-all"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="confirmPassword" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
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
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Sign Up
                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="text-sm text-center font-mono text-muted-foreground pt-4 border-t border-foreground/10">
                        Already have an account?{" "}
                        <Link href="/login" className="text-foreground hover:underline hover:text-foreground transition-colors">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
