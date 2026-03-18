import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 pt-28 pb-20">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-display tracking-tight">Careers</h1>
          <p className="text-muted-foreground leading-relaxed">
            We are always looking for builders, educators, and designers who care about creating
            impact through learning. If you want to help students grow their careers, we would love
            to hear from you.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Send your profile and portfolio to <span className="font-mono">careers@zenter.com</span>.
          </p>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}

