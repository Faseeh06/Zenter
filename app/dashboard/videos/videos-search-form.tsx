"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
    defaultValue?: string;
    course?: string;
    courses: string[];
};

export function VideosSearchForm({ defaultValue, course, courses }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    return (
        <form
            className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0"
            onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const q = (form.querySelector('input[name="q"]') as HTMLInputElement)?.value?.trim() ?? "";
                const params = new URLSearchParams(searchParams.toString());
                if (q) params.set("q", q);
                else params.delete("q");
                const courseSelect = (form.querySelector('input[name="course"]') as HTMLInputElement)?.value ?? "";
                if (courseSelect && courseSelect !== "all") params.set("course", courseSelect);
                else params.delete("course");
                router.push(`/dashboard/videos${params.toString() ? `?${params.toString()}` : ""}`);
            }}
        >
            <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    name="q"
                    defaultValue={defaultValue}
                    placeholder="Search videos..."
                    className="pl-9 bg-background/50 border-foreground/20 rounded-md focus-visible:ring-1 focus-visible:ring-foreground"
                />
            </div>
            <div className="w-full md:w-56">
                <Select
                    defaultValue={course ?? "all"}
                    onValueChange={(value) => {
                        const params = new URLSearchParams(searchParams.toString());
                        if (value && value !== "all") params.set("course", value);
                        else params.delete("course");
                        router.push(`/dashboard/videos${params.toString() ? `?${params.toString()}` : ""}`);
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by course" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        {courses.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <button type="submit" className="hidden">Apply</button>
        </form>
    );
}
