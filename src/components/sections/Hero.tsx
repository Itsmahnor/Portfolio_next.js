"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { GithubIcon, LinkedinIcon, UpworkIcon  } from "@/components/ui/icons";
import portfolioData from "@/data/portfolio.json";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { name, role, tagline, avatar, resumeUrl, availability, socials } = portfolioData.profile;

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-space-8 overflow-hidden bg-background">
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 dark:opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-space-4 sm:px-space-6 lg:px-space-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-6 lg:gap-space-8 items-center">
          
          {/* Text Content Block */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Availability Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-space-2 bg-surface border border-border-custom px-space-3 py-1.5 rounded-full mb-space-4 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className="text-tiny font-semibold text-secondary uppercase tracking-wider">{availability}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-h1 tracking-tight text-primary mb-space-2 font-bold"
            >
              Hi, I&apos;m <span className="text-accent underline decoration-border-custom decoration-4 underline-offset-4">{name}</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              className="text-h3 text-secondary font-medium mb-space-3"
            >
              {role}
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-body text-secondary max-w-lg mb-space-6"
            >
              {tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-space-4 mb-space-6"
            >
              <a
                href="#projects"
                className="inline-flex items-center text-white gap-space-2 bg-accent  hover:bg-primary/90 text-body font-semibold px-space-6 py-space-3 rounded-md shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View My Work</span>
                <ArrowRight size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-space-2 bg-transparent text-primary border border-primary hover:bg-primary hover:text-surface text-body font-semibold px-space-6 py-space-3 rounded-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail size={16} />
                <span>Get in Touch</span>
              </a>
            </motion.div>

            {/* Socials & Resume Line */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-space-6 border-t border-border-custom/50 pt-space-4 w-full max-w-md"
            >
              {/* Social Icons */}
              <div className="flex items-center gap-space-4">
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
              </div>

              <div className="hidden sm:block h-4 w-[1px] bg-border-custom" />

              {/* Resume download */}
              <a
                href={resumeUrl}
                download
                className="inline-flex items-center gap-space-2 text-small font-semibold text-secondary hover:text-primary transition-colors"
              >
                <FileText size={16} />
                <span>Download Resume (PDF)</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Image Container Block */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex justify-center lg:justify-end mt-space-6 lg:mt-0"
          >
            <div className="relative group w-[280px] h-[280px] sm:w-[350px] sm:h-[350px]">
              {/* Background Glow/Shadow Effect */}
              <div className="absolute inset-0 bg-accent/5 rounded-xl blur-2xl group-hover:bg-accent/10 transition-colors duration-300" />
              
              {/* Solid border offset box */}
              <div className="absolute inset-0 border border-primary/20 translate-x-3 translate-y-3 rounded-xl pointer-events-none group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />

              {/* Styled Image Frame */}
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-border-custom bg-surface shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <Image
                  src={avatar}
                  alt={name}
                  fill
                  priority
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                  sizes="(max-width: 768px) 280px, 350px"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
