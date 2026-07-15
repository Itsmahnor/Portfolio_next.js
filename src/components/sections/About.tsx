"use client";

import React from "react";
import { GraduationCap, Trophy, Award } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const { journey, education, achievements, experienceYears } = portfolioData.about;

  const fadeUpVariants = {
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
    <section id="about" className="py-space-9 px-space-4 sm:px-space-6 lg:px-space-8 bg-surface border-t border-border-custom/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-space-7"
        >
          <span className="text-tiny font-bold uppercase tracking-wider text-muted mb-space-1 block">Biography</span>
          <h2 className="text-h2 tracking-tight text-primary">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-6 lg:gap-space-8 items-start">
          
          {/* Left Column: Journey and Stat Cards */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 flex flex-col gap-space-5"
          >
            <h3 className="text-h3 text-primary">My Journey</h3>
            <p className="text-body text-secondary leading-relaxed m-0">
              {journey}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-4 mt-space-3">
              <div className="bg-background border border-border-custom p-space-4 rounded-lg flex flex-col gap-1 shadow-sm">
                <span className="text-h2 font-mono font-bold text-accent">{experienceYears}+</span>
                <span className="text-tiny font-medium text-muted uppercase tracking-wider">Years Exp</span>
              </div>
              <div className="bg-background border border-border-custom p-space-4 rounded-lg flex flex-col gap-1 shadow-sm">
                <span className="text-h2 font-mono font-bold text-accent">15+</span>
                <span className="text-tiny font-medium text-muted uppercase tracking-wider">Web Apps</span>
              </div>
              <div className="bg-background border border-border-custom p-space-4 rounded-lg flex flex-col gap-1 shadow-sm">
                <span className="text-h2 font-mono font-bold text-accent">96%</span>
                <span className="text-tiny font-medium text-muted uppercase tracking-wider">Avg Lighthouse</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Education & Achievements */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5 flex flex-col gap-space-6 mt-space-6 lg:mt-0"
          >
            
            {/* Education Sub-section */}
            <motion.div variants={fadeUpVariants} className="flex flex-col gap-space-3">
              <h3 className="text-h4 text-primary flex items-center gap-space-2">
                <GraduationCap size={20} className="text-accent" />
                <span>Education</span>
              </h3>
              <div className="flex flex-col gap-space-3">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="bg-background border border-border-custom/80 p-space-4 rounded-lg shadow-sm"
                  >
                    <h4 className="text-body font-semibold text-primary">{edu.degree}</h4>
                    <p className="text-small text-secondary m-0 mt-1">{edu.institution}</p>
                    <span className="text-tiny text-muted block mt-2 font-mono">{edu.duration}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements Sub-section */}
            <motion.div variants={fadeUpVariants} className="flex flex-col gap-space-3">
              <h3 className="text-h4 text-primary flex items-center gap-space-2">
                <Trophy size={20} className="text-accent" />
                <span>Key Accomplishments</span>
              </h3>
              <div className="flex flex-col gap-space-3">
                {achievements.map((ach, idx) => (
                  <div
                    key={idx}
                    className="bg-background border border-border-custom/80 p-space-4 rounded-lg shadow-sm flex items-start gap-space-3 hover:shadow-md transition-shadow"
                  >
                    <div className="p-space-2 bg-primary/5 rounded-md text-accent mt-0.5">
                      <Award size={18} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-[15px] font-semibold text-primary leading-snug">{ach.title}</h4>
                      <p className="text-small text-secondary m-0">{ach.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
