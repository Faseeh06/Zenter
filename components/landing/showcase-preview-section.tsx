"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const showcasePreview = [
  {
    title: "E-commerce Dashboard",
    description: "Real-time analytics, inventory insights, and order tracking.",
  },
  {
    title: "AI Resume Analyzer",
    description: "Actionable feedback aligned to job descriptions.",
  },
  {
    title: "Collaborative Editor",
    description: "Live cursors, chat, and multiplayer editing.",
  },
];

export function ShowcasePreviewSection() {
  return (
    <section id="showcase" className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Community Spotlight
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight">
            Projects built by Zenter learners.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            Explore the best student work, get inspired, and share your own projects with the community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {showcasePreview.map((item) => (
            <div
              key={item.title}
              className="border border-foreground/10 bg-background/50 rounded-xl p-6 hover:border-foreground/30 transition-colors"
            >
              <h3 className="text-xl font-display mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button asChild className="rounded-full bg-foreground text-background hover:bg-foreground/90">
            <Link href="/showcase">Browse the full showcase</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

