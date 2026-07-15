"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "@/data/portfolio.json";

interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

const navLinks: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll shadow/blur transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/80 border-b border-border-custom/50 shadow-sm backdrop-blur-md"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-space-4 sm:px-space-6 lg:px-space-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-h4 font-bold tracking-tight text-primary hover:opacity-80 transition-opacity flex items-center gap-space-2"
          aria-label="Mahnoor Portfolio Home"
        >
          <span className="font-mono text-accent bg-primary text-surface px-space-2 py-0.5 rounded-sm">M</span>
          <span className="hidden sm:inline font-sans">{portfolioData.profile.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-space-6" aria-label="Desktop Navigation">
          <ul className="flex items-center gap-space-6 list-none m-0 p-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname === "/" && link.href.startsWith("/#"));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-body text-[15px] font-medium transition-colors hover:text-primary ${
                      isActive ? "text-primary font-semibold" : "text-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="h-4 w-[1px] bg-border-custom" />

          {/* Resume Download Action */}
          <a
            href={portfolioData.profile.resumeUrl}
            download
            className="inline-flex items-center gap-space-2 bg-accent text-surface hover:bg-primary/90 text-tiny font-semibold px-space-4 py-space-2 rounded-md shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Download Mahnoor's Resume"
          >
            <FileText size={14} />
            <span>Resume</span>
          </a>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-space-2 md:hidden text-primary rounded-md hover:bg-hover-surface transition-colors focus-visible:outline-2 focus-visible:outline-accent"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-surface border-b border-border-custom shadow-lg overflow-hidden"
          >
            <nav className="px-space-4 py-space-6 flex flex-col gap-space-4" aria-label="Mobile Navigation">
              <ul className="flex flex-col gap-space-4 list-none m-0 p-0">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block text-body font-medium text-secondary hover:text-primary py-space-1 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="h-[1px] bg-border-custom my-space-2" />

              <a
                href={portfolioData.profile.resumeUrl}
                download
                className="w-full justify-center inline-flex items-center gap-space-2 bg-accent text-surface hover:bg-primary/90 text-[15px] font-semibold px-space-4 py-space-3 rounded-md shadow-sm transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FileText size={16} />
                <span>Download Resume</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
