import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Link as LinkIcon, ExternalLink, Cpu, Lightbulb, Rocket, ShieldCheck } from "lucide-react";
import portfolioData from "@/data/portfolio.json";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioData.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioData.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Mahnoor Sarfraz`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolioData.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background py-space-8 px-space-4 sm:px-space-6 lg:px-space-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-space-2 text-muted hover:text-accent transition-colors mb-space-6 group"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back to Projects</span>
        </Link>

        {/* Hero Section */}
        <header className="mb-space-8">
          <div className="flex flex-wrap items-center gap-space-3 mb-space-4">
            <span className="bg-accent/10 text-accent text-tiny font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {project.category}
            </span>
            {project.featured && (
              <span className="bg-primary/10 text-primary text-tiny font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Featured
              </span>
            )}
          </div>
          <h1 className="text-h1 tracking-tight text-primary mb-space-4">{project.title}</h1>
          <p className="text-xl text-secondary max-w-3xl leading-relaxed">{project.description}</p>
        </header>

        {/* Media (Thumbnail or Video) */}
        <section className="mb-space-9 rounded-2xl overflow-hidden border border-border-custom shadow-xl bg-surface">
          {project.video ? (
            <div className="aspect-video w-full">
              <iframe
                src={project.video}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="relative aspect-video w-full">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </section>

        {/* Project Links */}
        <div className="flex flex-wrap gap-space-4 mb-space-9">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-space-2 bg-surface border border-border-custom text-primary px-space-6 py-space-3 rounded-lg font-semibold hover:bg-background transition-colors"
          >
<LinkIcon size={20} />
            GitHub Repository
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-space-2 bg-accent text-surface px-space-6 py-space-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <ExternalLink size={20} />
            Live Demo
          </a>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-9">
          <div className="lg:col-span-2 space-y-space-9">
            {/* Features */}
            <section>
              <h2 className="text-h3 text-primary mb-space-5 flex items-center gap-space-3">
                <Rocket className="text-accent" /> Key Features
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-space-4">
                {project.features.map((feature: string, index: number) => (
                  <li key={index} className="flex gap-space-3 p-space-4 bg-surface border border-border-custom rounded-xl">
                    <ShieldCheck className="text-accent shrink-0" size={20} />
                    <span className="text-secondary font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Architecture */}
            <section>
              <h2 className="text-h3 text-primary mb-space-5 flex items-center gap-space-3">
                <Cpu className="text-accent" /> Architecture
              </h2>
              <div className="p-space-6 bg-surface border border-border-custom rounded-xl prose prose-invert max-w-none">
                <p className="text-secondary leading-relaxed">{project.architecture}</p>
              </div>
            </section>

            {/* Challenges */}
            <section>
              <h2 className="text-h3 text-primary mb-space-5 flex items-center gap-space-3">
                <Lightbulb className="text-accent" /> Challenges & Solutions
              </h2>
              <div className="p-space-6 bg-surface border border-border-custom rounded-xl">
                <p className="text-secondary leading-relaxed">{project.challenges}</p>
              </div>
            </section>
          </div>

          <aside className="space-y-space-8">
            {/* Tech Stack */}
            <section className="p-space-6 bg-surface border border-border-custom rounded-xl">
              <h3 className="text-h4 text-primary mb-space-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-space-2">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="bg-background border border-border-custom text-muted text-tiny font-bold px-3 py-1.5 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Future Improvements */}
            <section className="p-space-6 bg-surface border border-border-custom rounded-xl">
              <h3 className="text-h4 text-primary mb-space-4">Future Improvements</h3>
              <ul className="space-y-space-3">
                {project.futureImprovements.map((improvement: string, index: number) => (
                  <li key={index} className="flex items-start gap-space-2 text-secondary text-small">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    {improvement}
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
