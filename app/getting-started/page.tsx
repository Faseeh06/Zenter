import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import Link from "next/link";

export default function GettingStartedPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 pt-28 pb-20">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-display tracking-tight">Getting Started</h1>
          <ol className="list-decimal pl-5 text-muted-foreground space-y-3">
            <li>Create your account and complete your profile.</li>
            <li>Browse videos and mark your progress.</li>
            <li>Build a project and submit it to your showcase.</li>
            <li>Apply as an internee when you are ready.</li>
          </ol>
          <Link href="/signup" className="text-foreground underline underline-offset-4">
            Create your account
          </Link>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}

