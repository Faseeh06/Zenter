import Link from "next/link";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Heart } from "lucide-react";

// Mock public projects
const publicProjects = [
    {
        id: "p1",
        title: "E-commerce Dashboard",
        description: "A full-stack admin dashboard for e-commerce platforms with real-time analytics, inventory management, and order tracking.",
        student: "Alice Chen",
        image: "bg-blue-500/10",
        tags: ["Next.js", "TailwindCSS", "Supabase", "Recharts"],
        likes: 124,
        demoUrl: "#",
        githubUrl: "#",
    },
    {
        id: "p2",
        title: "AI Resume Analyzer",
        description: "An AI-powered tool that analyzes resumes against job descriptions and provides actionable feedback using OpenAI's API.",
        student: "Marcus Johnson",
        image: "bg-purple-500/10",
        tags: ["React", "Node.js", "OpenAI API", "PostgreSQL"],
        likes: 89,
        demoUrl: "#",
        githubUrl: "#",
    },
    {
        id: "p3",
        title: "Real-time Collaborate Editor",
        description: "A multiplayer text editor supporting real-time collaborative editing, live cursors, and instant message chat.",
        student: "Elena Rodriguez",
        image: "bg-green-500/10",
        tags: ["Vue", "Express", "Socket.io", "MongoDB"],
        likes: 210,
        demoUrl: "#",
        githubUrl: "#",
    },
    {
        id: "p4",
        title: "Personal Finance Tracker",
        description: "A beautiful, intuitive app helping users track expenses, set budges, and visualize their spending habits over time.",
        student: "David Kim",
        image: "bg-orange-500/10",
        tags: ["Next.js", "Prisma", "Tailwind", "tRPC"],
        likes: 156,
        demoUrl: "#",
        githubUrl: "#",
    },
    {
        id: "p5",
        title: "Web3 NFT Marketplace",
        description: "A decentralized application allowing users to mint, buy, and sell NFTs on the Ethereum Sepolia testnet.",
        student: "Sarah Jenkins",
        image: "bg-rose-500/10",
        tags: ["Solidity", "Hardhat", "Next.js", "Ethers.js"],
        likes: 342,
        demoUrl: "#",
        githubUrl: "#",
    },
    {
        id: "p6",
        title: "Weather Activity Planner",
        description: "An app that suggests outdoor activities based on real-time and forecasted weather data for a user's location.",
        student: "Tom Baker",
        image: "bg-yellow-500/10",
        tags: ["React Native", "Expo", "Weather API"],
        likes: 67,
        demoUrl: "#",
        githubUrl: "#",
    },
];

export default function ShowcasePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />

            <main className="flex-1 pt-24 pb-20">
                <div className="container px-4 md:px-6 mx-auto">
                    {/* Header Section */}
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
                            Explore amazing projects, portfolios, and applications built by our global community out in the wild. Get inspired for your next big idea.
                        </p>
                    </div>

                    {/* Grid Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {publicProjects.map((project) => (
                            <Card key={project.id} className="bg-background/50 border-foreground/10 overflow-hidden group hover:border-foreground/30 transition-all flex flex-col">
                                <div className={`aspect-video w-full ${project.image} relative border-b border-foreground/10 flex items-center justify-center p-6 group-hover:bg-foreground/5 transition-colors`}>
                                    <div className="text-center font-display text-2xl text-foreground/30 group-hover:text-foreground/50 transition-colors">
                                        {project.title.split(' ')[0]}
                                    </div>
                                </div>

                                <CardHeader className="p-5 pb-2">
                                    <div className="flex justify-between items-start gap-4 mb-2">
                                        <h3 className="font-display text-xl leading-snug">{project.title}</h3>
                                        <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-foreground/5 px-2 py-1 rounded-md">
                                            <Heart className="w-3 h-3 text-rose-500" />
                                            {project.likes}
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-foreground/70">by {project.student}</p>
                                </CardHeader>

                                <CardContent className="p-5 pt-2 flex-1">
                                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="font-mono text-[10px] bg-foreground/5 border-foreground/10">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
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
