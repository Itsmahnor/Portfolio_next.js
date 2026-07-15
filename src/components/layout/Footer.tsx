import React from "react";
import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, UpworkIcon } from "@/components/ui/icons";
import portfolioData from "@/data/portfolio.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { socials, name, role, availability } = portfolioData.profile;

  return (
    <footer className="bg-surface border-t border-border-custom/80 py-space-7 sm:py-space-8 mt-auto">
      <div className="max-w-7xl mx-auto px-space-4 sm:px-space-6 lg:px-space-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-6 items-start">
          
          {/* Column 1: Info and Status */}
          <div className="flex flex-col gap-space-3">
            <Link
              href="/"
              className="text-h4 font-bold tracking-tight text-primary flex items-center gap-space-2 font-sans"
            >
              <span className="font-mono text-accent bg-primary text-surface px-space-2 py-0.5 rounded-sm">M</span>
              <span>{name}</span>
            </Link>
            <p className="text-small m-0">{role}</p>
            
            {/* Pulsing Availability Status Indicator */}
            <div className="flex items-center gap-space-2 mt-space-2 bg-background border border-border-custom px-space-3 py-1.5 rounded-full w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className="text-[12px] font-medium text-secondary">{availability}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-space-3">
            <h4 className="text-tiny font-bold uppercase tracking-wider text-primary">Sitemap</h4>
            <nav className="flex flex-col gap-space-2" aria-label="Footer Navigation">
              <Link href="/#about" className="text-small hover:text-primary transition-colors w-fit">About</Link>
              <Link href="/#skills" className="text-small hover:text-primary transition-colors w-fit">Skills</Link>
              <Link href="/#experience" className="text-small hover:text-primary transition-colors w-fit">Experience</Link>
              <Link href="/#projects" className="text-small hover:text-primary transition-colors w-fit">Projects</Link>
              <Link href="/blog" className="text-small hover:text-primary transition-colors w-fit">Blog</Link>
            </nav>
          </div>

          {/* Column 3: Contact & Socials */}
          <div className="flex flex-col gap-space-3">
            <h4 className="text-tiny font-bold uppercase tracking-wider text-primary">Connect</h4>
            <div className="flex gap-space-4 items-center">
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors p-1"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors p-1"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href={socials.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors p-1"
                aria-label="Upwork Profile"
              >
                <UpworkIcon size={20} />
              </a>
              <a
                href={`mailto:${socials.email}`}
                className="text-secondary hover:text-primary transition-colors p-1"
                aria-label="Email Address"
              >
                <Mail size={20} />
              </a>
            </div>
            
            <Link
              href="/#contact"
              className="inline-flex items-center gap-space-1 text-small font-semibold text-accent hover:underline mt-space-2 group w-fit"
            >
              <span>Get in touch</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-border-custom/80 my-space-6" />

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-space-3">
          <p className="text-tiny text-muted m-0">
            &copy; {currentYear} {name}. All rights reserved.
          </p>
          {/* <p className="text-tiny text-muted m-0 flex items-center gap-1">
            Built with Next.js 15, Tailwind v4 and TypeScript.
          </p> */}
        </div>
      </div>
    </footer>
  );
}
