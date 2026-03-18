import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 pt-28 pb-20">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-display tracking-tight">About Zenter</h1>
          <p className="text-muted-foreground leading-relaxed">
            Zenter helps learners build real-world skills through curated video lessons, hands-on
            projects, and internship opportunities. Our goal is to make practical learning accessible
            and career-focused for students everywhere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We focus on outcomes: learn a concept, build a project, showcase it, and apply what you
            learned. Zenter is built for students, by builders.
          </p>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}

