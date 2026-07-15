"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();
  const experienceData = portfolioData.experience;

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  return (
    <section id="experience" className="py-space-9 px-space-4 sm:px-space-6 lg:px-space-8 bg-surface border-t border-border-custom/50">
      <div className="max-w-4xl mx-auto">
        
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-space-7"
        >
          <span className="text-tiny font-bold uppercase tracking-wider text-muted mb-space-1 block">Journey</span>
          <h2 className="text-h2 tracking-tight text-primary">Work Experience</h2>
        </motion.div>

        {/* Timeline Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative border-l border-border-custom pl-space-5 ml-space-2 flex flex-col gap-space-7 sm:gap-space-8"
        >
          {experienceData.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="relative flex flex-col gap-space-3"
            >
              
              {/* Timeline circle node */}
              <div className="absolute -left-[calc(var(--space-5)+8px)] top-1 flex items-center justify-center bg-accent text-surface h-4 w-4 rounded-full border-2 border-surface shadow-sm" />

              {/* Card Container */}
              <div className="bg-background border border-border-custom p-space-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-space-2 mb-space-3">
                  <div>
                    <h3 className="text-h3 text-primary m-0 font-bold">{exp.role}</h3>
                    <p className="text-body font-semibold text-secondary m-0 mt-1">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-space-2 text-small text-muted font-mono bg-surface border border-border-custom px-space-3 py-1 rounded-full w-fit">
                    <Calendar size={13} />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                {/* Sub-description */}
                <p className="text-body text-secondary italic mb-space-3 m-0">
                  {exp.description}
                </p>

                {/* Bullet Responsibilities */}
                <ul className="list-disc pl-space-4 flex flex-col gap-space-2 text-body text-[15px] text-secondary mb-space-4">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx}>{resp}</li>
                  ))}
                </ul>

                {/* Tech Badges List */}
                <div className="flex flex-wrap gap-space-2 border-t border-border-custom/50 pt-space-3">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-surface text-secondary border border-border-custom text-tiny font-medium px-2.5 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
