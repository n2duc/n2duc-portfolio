import { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";

import { generateSEO } from "@/lib/seo";
import { siteConfig, socialLinks } from "@/lib/data";
import { Section, SectionHeader } from "@/components/section";
import { ContactFormSimple } from "@/components/contact-form-simple";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = generateSEO({
  title: "Contact",
  description: "Get in touch to discuss your project or just say hello",
  url: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-24">
      <Section>
        <SectionHeader
          title="Get in Touch"
          description="Have a project in mind? Let's talk about it"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold font-heading mb-4">
                Let&apos;s Connect
              </h2>
              <p className="text-muted mb-6">
                I&apos;m always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision. Feel free to reach out!
              </p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-muted hover:text-accent transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Location</div>
                    <div className="text-muted">{siteConfig.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h3 className="font-semibold mb-4">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl border border-border hover:border-accent bg-card hover:bg-card-hover flex items-center justify-center transition-all group"
                      aria-label={link.name}
                    >
                      <Icon className="h-5 w-5 text-muted group-hover:text-accent transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="p-8">
              <ContactFormSimple />
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}

