import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, ExternalLink, Code2, Network, Globe, Camera } from "lucide-react";
import type { Project } from "@/data/projects";
import { Chip, StatusBadge } from "./primitives";

const iconFor = (c: string) => (/network/i.test(c) ? Network : /web dev/i.test(c) ? Globe : /application/i.test(c) ? Camera : Code2);

export function ProjectThumb({ project, className = "" }: { project: Project; className?: string }) {
  const Icon = iconFor(project.category);
  if (project.thumbnail) return <img src={project.thumbnail} alt={project.title} loading="lazy" className={`h-full w-full object-cover ${className}`} />;
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-surface ${className}`}>
      <div className="tech-grid absolute inset-0" />
      <div className="absolute h-40 w-40 rounded-full bg-primary/25 blur-3xl" />
      <Icon className="relative text-cyan" size={44} strokeWidth={1.1} />
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="glass glow-card group flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-[16/9] overflow-hidden">
        <ProjectThumb project={project} className="transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute top-4 left-4"><StatusBadge status={project.status} /></div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[11px] tracking-[0.2em] text-cyan uppercase">{project.category}</p>
        <h3 className="mt-2 text-xl font-semibold text-foreground">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">{project.stack.map((s) => <Chip key={s}>{s}</Chip>)}</div>
        <div className="mt-auto flex items-center gap-2 pt-6">
          <Link to="/projects/$slug" params={{ slug: project.slug }} className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-secondary px-4 text-sm text-foreground transition-colors hover:bg-primary">
            View Details <ArrowUpRight size={15} />
          </Link>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository" className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-cyan"><Github size={16} /></a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Live demo" className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-cyan"><ExternalLink size={16} /></a>
          )}
        </div>
      </div>
    </article>
  );
}
