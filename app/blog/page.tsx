import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

const posts = [
  { title: "How to learn faster with projects", date: "Mar 10, 2026" },
  { title: "Building your first portfolio", date: "Feb 22, 2026" },
  { title: "Preparing for internships", date: "Feb 01, 2026" },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 pt-28 pb-20">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-display tracking-tight">Blog</h1>
          <p className="text-muted-foreground">Updates, guides, and product news from the Zenter team.</p>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.title} className="border border-foreground/10 rounded-xl p-5 bg-background/50">
                <div className="text-sm font-mono text-muted-foreground">{post.date}</div>
                <h2 className="text-xl font-display mt-1">{post.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}

