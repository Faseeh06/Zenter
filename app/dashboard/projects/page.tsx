"use client";

import Link from "next/link";
import { Plus, Search, ExternalLink, MoreVertical, Edit2, Trash2, FolderDot } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const myProjects = [
    {
        id: "p1",
        title: "E-commerce Dashboard",
        description: "A full-stack admin dashboard for e-commerce platforms with real-time analytics, inventory management, and order tracking.",
        status: "Published",
        techStack: ["React", "Tailwind", "Node.js"],
        updatedAt: "2 days ago",
    },
    {
        id: "p2",
        title: "AI Resume Analyzer",
        description: "An AI tool analyzing resumes against job descriptions to provide actionable feedback.",
        status: "Draft",
        techStack: ["Next.js", "OpenAI"],
        updatedAt: "1 week ago",
    },
];

export default function ProjectsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto flex flex-col h-full">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">My Projects</h1>
                    <p className="text-muted-foreground">
                        Manage your portfolio, share live links, and submit projects for review.
                    </p>
                </div>
                <Button asChild className="rounded-full bg-foreground text-background hover:bg-foreground/90 shrink-0">
                    <Link href="/dashboard/projects/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                    </Link>
                </Button>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center no-scrollbar">
                <div className="relative w-full md:w-96 shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search projects by title..."
                        className="pl-9 bg-background/50 border-foreground/20 rounded-md focus-visible:ring-1 focus-visible:ring-foreground"
                    />
                </div>
                <div>
                    <span className="text-sm font-mono text-muted-foreground">2 Projects total</span>
                </div>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {myProjects.map((project) => (
                    <Card key={project.id} className="bg-background/50 border-foreground/10 rounded-xl overflow-hidden flex flex-col group hover:border-foreground/30 transition-all relative">
                        <CardHeader className="p-5 pb-3">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center border border-foreground/10 shrink-0">
                                    <FolderDot className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-foreground/5 hover:text-foreground">
                                            <span className="sr-only">Open menu</span>
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur border-foreground/10 font-mono text-xs">
                                        <DropdownMenuItem className="cursor-pointer hover:bg-foreground/5 focus:bg-foreground/5">
                                            <Edit2 className="mr-2 h-3 w-3" />
                                            Edit Project
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer hover:bg-foreground/5 focus:bg-foreground/5">
                                            <ExternalLink className="mr-2 h-3 w-3" />
                                            View Live
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                                            <Trash2 className="mr-2 h-3 w-3" />
                                            Delete Project
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <h3 className="font-display text-xl leading-tight mt-4 group-hover:underline decoration-foreground/50 underline-offset-4">
                                {project.title}
                            </h3>
                            <div className="mt-2">
                                <Badge
                                    variant={project.status === "Published" ? "default" : "secondary"}
                                    className={`font-mono text-[10px] pointer-events-none ${project.status === "Published"
                                            ? "bg-foreground text-background font-medium"
                                            : "bg-foreground/5 text-muted-foreground border-foreground/10"
                                        }`}
                                >
                                    {project.status}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="p-5 pt-0 flex-1">
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.techStack.map((tech) => (
                                    <span key={tech} className="text-xs font-mono text-muted-foreground bg-foreground/5 px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </CardContent>

                        <CardFooter className="p-5 pt-0 border-t border-foreground/5 mt-auto bg-foreground/[0.02]">
                            <span className="text-xs font-mono text-muted-foreground">
                                Last updated {project.updatedAt}
                            </span>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
