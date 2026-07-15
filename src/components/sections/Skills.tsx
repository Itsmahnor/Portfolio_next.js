"use client";

import React from "react";
import { Laptop, Database, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();
  const { frontend, backend, tools } = portfolioData.skills;

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
    <section id="skills" className="py-space-9 px-space-4 sm:px-space-6 lg:px-space-8 bg-background border-t border-border-custom/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-space-7"
        >
          <span className="text-tiny font-bold uppercase tracking-wider text-muted mb-space-1 block">Expertise</span>
          <h2 className="text-h2 tracking-tight text-primary">Technical Stack</h2>
        </motion.div>

        {/* Skills Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-space-5 lg:gap-space-6"
        >
          
          {/* Category: Frontend */}
          <motion.div
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { y: -4, boxShadow: "var(--shadow-hover)" }}
            className="bg-surface border border-border-custom p-space-5 rounded-lg shadow-sm transition-all duration-200"
          >
            <div className="flex items-center gap-space-3 mb-space-5 pb-space-3 border-b border-border-custom/50">
              <div className="p-space-2 bg-primary/5 rounded-md text-accent">
                <Laptop size={22} />
              </div>
              <h3 className="text-h3 text-primary m-0">Frontend Development</h3>
            </div>
            
            <div className="flex flex-col gap-space-4">
              {frontend.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-space-1">
                  <div className="flex justify-between items-center text-body text-[14px]">
                    <span className="font-semibold text-primary">{skill.name}</span>
                    <span className="font-mono text-muted text-tiny">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-border-custom/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" as const, delay: 0.1 }}
                      className="h-full bg-accent rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category: Backend */}
          <motion.div
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { y: -4, boxShadow: "var(--shadow-hover)" }}
            className="bg-surface border border-border-custom p-space-5 rounded-lg shadow-sm transition-all duration-200"
          >
            <div className="flex items-center gap-space-3 mb-space-5 pb-space-3 border-b border-border-custom/50">
              <div className="p-space-2 bg-primary/5 rounded-md text-accent">
                <Database size={22} />
              </div>
              <h3 className="text-h3 text-primary m-0">Backend & APIs</h3>
            </div>
            
            <div className="flex flex-col gap-space-4">
              {backend.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-space-1">
                  <div className="flex justify-between items-center text-body text-[14px]">
                    <span className="font-semibold text-primary">{skill.name}</span>
                    <span className="font-mono text-muted text-tiny">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-border-custom/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" as const, delay: 0.1 }}
                      className="h-full bg-accent rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category: Tools */}
          <motion.div
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { y: -4, boxShadow: "var(--shadow-hover)" }}
            className="bg-surface border border-border-custom p-space-5 rounded-lg shadow-sm transition-all duration-200"
          >
            <div className="flex items-center gap-space-3 mb-space-5 pb-space-3 border-b border-border-custom/50">
              <div className="p-space-2 bg-primary/5 rounded-md text-accent">
                <Wrench size={22} />
              </div>
              <h3 className="text-h3 text-primary m-0">DevOps & Tools</h3>
            </div>
            
            <div className="flex flex-col gap-space-4">
              {tools.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-space-1">
                  <div className="flex justify-between items-center text-body text-[14px]">
                    <span className="font-semibold text-primary">{skill.name}</span>
                    <span className="font-mono text-muted text-tiny">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-border-custom/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" as const, delay: 0.1 }}
                      className="h-full bg-accent rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
