import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 pt-28 pb-20">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-display tracking-tight">Community</h1>
          <p className="text-muted-foreground">
            Join a community of learners building real projects. Share progress, get feedback, and
            celebrate wins together.
          </p>
          <p className="text-muted-foreground">
            Community features will expand over time. For now, connect via the project showcase and
            social links in your profile.
          </p>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}

