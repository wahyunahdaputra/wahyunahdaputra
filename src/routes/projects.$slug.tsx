import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Github, ImagePlus } from "lucide-react";
import { getProject } from "@/data/projects";
import { ProjectThumb } from "@/components/portfolio/ProjectCard";
import { Chip, Reveal, StatusBadge } from "@/components/portfolio/primitives";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.title} — Wahyu Nahda Putra` : "Project not found";
    return {
      meta: [
        { title },
        { name: "description", content: p?.description ?? "Project not found" },
        { property: "og:title", content: title },
        { property: "og:description", content: p?.description ?? "" },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(p ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl text-foreground">Project not found</h1>
      <Link to="/" className="text-cyan">Back to portfolio</Link>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project: p } = Route.useLoaderData();
  const blocks = [["Overview", p.overview], ["Problem Statement", p.problem], ["Solution", p.solution], ["Results", p.results]];
  return (
    <main className="px-5 py-10 sm:px-8 md:py-16">
      <div className="mx-auto max-w-4xl">
        <a href="/#projects" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground hover:text-cyan"><ArrowLeft size={16} /> Back to projects</a>
        <Reveal className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={p.status} />
            <span className="font-mono text-[11px] tracking-[0.2em] text-cyan uppercase">{p.category}</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold text-foreground md:text-5xl">{p.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{p.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">{p.stack.map((s) => <Chip key={s}>{s}</Chip>)}</div>
          <div className="mt-6 flex gap-3">
            {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="glass inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm text-foreground"><Github size={16} /> GitHub</a>}
            {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-accent px-4 text-sm text-primary-foreground"><ExternalLink size={16} /> Live Demo</a>}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="glass mt-10 aspect-[16/9] overflow-hidden rounded-2xl"><ProjectThumb project={p} /></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {blocks.map(([t, v]) => (
            <Reveal key={t}><section className="glass h-full rounded-2xl p-6"><h2 className="text-lg font-semibold text-foreground">{t}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v}</p></section></Reveal>
          ))}
        </div>
        <h2 className="mt-12 text-2xl font-semibold text-foreground">Screenshots</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {(p.screenshots.length ? p.screenshots : [null, null]).map((s, i) =>
            s ? <img key={s} src={s} alt={`${p.title} screenshot ${i + 1}`} loading="lazy" className="rounded-xl" /> : (
              <div key={i} className="flex aspect-video flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-sm text-muted-foreground"><ImagePlus size={20} /> Add screenshot</div>
            ),
          )}
        </div>
      </div>
    </main>
  );
}
