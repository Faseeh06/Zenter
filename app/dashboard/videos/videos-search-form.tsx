"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function VideosSearchForm({ defaultValue }: { defaultValue?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    return (
        <form
            className="relative w-full md:w-64 shrink-0"
            onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const q = (form.querySelector('input[name="q"]') as HTMLInputElement)?.value?.trim() ?? "";
                const params = new URLSearchParams(searchParams.toString());
                if (q) params.set("q", q);
                else params.delete("q");
                router.push(`/dashboard/videos${params.toString() ? `?${params.toString()}` : ""}`);
            }}
        >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
                name="q"
                defaultValue={defaultValue}
                placeholder="Search videos..."
                className="pl-9 bg-background/50 border-foreground/20 rounded-md focus-visible:ring-1 focus-visible:ring-foreground"
            />
        </form>
    );
}
