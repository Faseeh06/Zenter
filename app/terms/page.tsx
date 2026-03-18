import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 pt-28 pb-20">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <div className="space-y-6">
            <p className="text-sm font-mono text-muted-foreground">Last updated: March 14, 2026</p>
            <h1 className="text-4xl md:text-5xl font-display tracking-tight">Terms &amp; Conditions</h1>
            <p className="text-muted-foreground leading-relaxed">
              These Terms &amp; Conditions govern your use of Zenter. By accessing or using the platform,
              you agree to these terms. These terms are intended to be interpreted in accordance with
              the laws of Pakistan.
            </p>
          </div>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-foreground/80">
            <section>
              <h2 className="text-2xl font-display mb-3">1. Eligibility</h2>
              <p>
                You must be at least 13 years old to use Zenter. If you are under 18, you represent that
                you have permission from a parent or guardian.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-3">2. Accounts</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account and for all activity
                that occurs under your account. You agree to provide accurate and complete information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-3">3. Acceptable Use</h2>
              <p>
                You may not misuse the platform, interfere with security features, or engage in any activity
                that violates applicable law or infringes the rights of others.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-3">4. Content</h2>
              <p>
                You retain ownership of content you submit. By posting content, you grant Zenter a license
                to host, display, and distribute it within the platform. You are responsible for your content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-3">5. Intellectual Property</h2>
              <p>
                Zenter and its branding, interfaces, and content are protected by intellectual property laws.
                You may not copy or reuse them without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-3">6. Third-Party Services</h2>
              <p>
                The platform may link to third-party services. We are not responsible for those services and
                your use of them is governed by their terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-3">7. Disclaimer</h2>
              <p>
                Zenter is provided “as is” without warranties of any kind. We do not guarantee uninterrupted
                access or that content will always be accurate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-3">8. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Zenter will not be liable for indirect, incidental, or
                consequential damages arising from your use of the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-3">9. Termination</h2>
              <p>
                We may suspend or terminate your account if you violate these terms. You may discontinue
                use at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-3">10. Governing Law</h2>
              <p>
                These terms are governed by the laws of Pakistan. Courts in Pakistan will have jurisdiction
                over any disputes arising under these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-3">11. Contact</h2>
              <p>
                For questions about these terms, contact us at <span className="font-mono">legal@zenter.com</span>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

