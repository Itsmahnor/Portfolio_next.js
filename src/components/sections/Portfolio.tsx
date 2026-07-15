"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import portfolioData from "@/data/portfolio.json";

export default function Portfolio() {
  const shouldReduceMotion = useReducedMotion();
  const projects = portfolioData.projects;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  return (
    <section id="projects" className="py-space-9 px-space-4 sm:px-space-6 lg:px-space-8 bg-background border-t border-border-custom/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-space-7"
        >
          <span className="text-tiny font-bold uppercase tracking-wider text-muted mb-space-1 block">Showcase</span>
          <h2 className="text-h2 tracking-tight text-primary">Featured Projects</h2>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-4"
        >
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4, boxShadow: "var(--shadow-hover)" }}
              className="group bg-surface border border-border-custom rounded-lg shadow-sm overflow-hidden flex flex-col transition-all duration-300"
            >
              {/* Thumbnail Container */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-space-3">
                    <Link
                        href={`/projects/${project.slug}`}
                        className="bg-surface text-primary text-tiny font-semibold px-space-4 py-space-2 rounded-md transition-transform hover:scale-105"
                    >
                        View Details
                    </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-space-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-space-2">
                    <h3 className="text-h4 text-primary font-bold m-0">{project.title}</h3>
                    {project.featured && (
                        <span className="bg-accent/10 text-accent text-tiny font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Featured</span>
                    )}
                </div>
                <p className="text-small text-secondary mb-space-4 flex-grow">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-space-2 mb-space-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="bg-background text-muted border border-border-custom text-tiny px-2 py-1 rounded-sm">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Links */}
                <div className="flex gap-space-3 pt-space-3 border-t border-border-custom/50">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent flex items-center gap-1 text-tiny font-medium">
                        <GithubIcon size={14} /> GitHub
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent flex items-center gap-1 text-tiny font-medium">
                        <ExternalLink size={14} /> Live
                    </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
