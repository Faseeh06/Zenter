import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 pt-28 pb-20">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl space-y-10">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
              <span className="w-8 h-px bg-foreground/30" />
              Get in touch
            </span>
            <h1 className="text-4xl md:text-5xl font-display tracking-tight">Contact ZenStudios</h1>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Have questions, feedback, or partnership ideas? Reach out and we will respond as soon as
              possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="p-6 md:p-8 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-foreground/5 pointer-events-none" />
              <div className="space-y-6 relative z-10">
                <div>
                  <h2 className="text-2xl font-display tracking-tight">Contact Details</h2>
                  <p className="text-sm text-muted-foreground">ZenStudios • Islamabad, Pakistan</p>
                  <p className="text-sm font-mono text-muted-foreground">17:20 (UTC +05:00)</p>
                </div>
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  <p>Phone: <span className="font-mono text-foreground">+92 321 9854008</span></p>
                  <p>Email: <span className="font-mono text-foreground">faseehsafdar06@gmail.com</span></p>
                  <p>Website: <span className="font-mono text-foreground">www.zenstudios.site</span></p>
                  <p>Portfolio: <span className="font-mono text-foreground">https://www.faseeh.zenstudios.site/</span></p>
                  <p>LinkedIn: <span className="font-mono text-foreground">in/faseeh06</span></p>
                </div>
              </div>
            </div>

            <form className="p-6 md:p-8 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-md relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-foreground/5 pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <h2 className="text-2xl font-display tracking-tight">Send a message</h2>
                <p className="text-sm text-muted-foreground">We typically respond within 24–48 hours.</p>
              </div>

              <div className="space-y-3 relative z-10">
                <Label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Full Name</Label>
                <Input id="name" name="name" required className="bg-transparent border-foreground/20 h-12 rounded-none" />
              </div>
              <div className="space-y-3 relative z-10">
                <Label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Email</Label>
                <Input id="email" name="email" type="email" required className="bg-transparent border-foreground/20 h-12 rounded-none" />
              </div>
              <div className="space-y-3 relative z-10">
                <Label htmlFor="subject" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Subject</Label>
                <Input id="subject" name="subject" required className="bg-transparent border-foreground/20 h-12 rounded-none" />
              </div>
              <div className="space-y-3 relative z-10">
                <Label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Message</Label>
                <Textarea id="message" name="message" required className="bg-transparent border-foreground/20 min-h-[140px] rounded-none resize-y" />
              </div>

              <div className="pt-2 relative z-10">
                <Button type="submit" className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 font-mono text-sm">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}

