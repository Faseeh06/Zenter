import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

const paths = [
  { title: "Frontend Fundamentals", description: "HTML, CSS, JavaScript, React, and UI architecture." },
  { title: "Backend Essentials", description: "APIs, databases, authentication, and deployment." },
  { title: "Full-Stack Projects", description: "Ship end-to-end apps and build your portfolio." },
];

export default function LearningPathsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 pt-28 pb-20">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-display tracking-tight">Learning Paths</h1>
          <p className="text-muted-foreground">
            Structured paths help you learn faster. Pick a track and follow the steps.
          </p>
          <div className="grid gap-4">
            {paths.map((p) => (
              <div key={p.title} className="border border-foreground/10 rounded-xl p-5 bg-background/50">
                <h2 className="text-xl font-display">{p.title}</h2>
                <p className="text-muted-foreground mt-1">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}

