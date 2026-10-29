import { useState, type FormEvent } from "react";
import { z } from "zod";
import { GraduationCap, MapPin, Target, User, Network, Code2, Wrench, Briefcase, Sparkles, ImagePlus, Award, Linkedin, Github, Mail, Send, Info } from "lucide-react";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { certifications } from "@/data/certifications";
import { socials } from "@/data/socials";
import { Reveal, Section, SectionHeading } from "./primitives";
import { ProjectCard } from "./ProjectCard";

export function About() {
  const facts = [
    { icon: User, k: "Name", v: profile.name },
    { icon: GraduationCap, k: "Education", v: `${profile.education} — ${profile.university}` },
    { icon: MapPin, k: "Location", v: profile.location },
    { icon: Target, k: "Focus", v: profile.focus },
  ];
  return (
    <Section id="about">
      <SectionHeading eyebrow="01 / About" title="Behind The Engineer" />
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {profile.about.map((p) => <p key={p}>{p}</p>)}
          <div className="grid grid-cols-2 gap-3 pt-4">
            {[["Infrastructure", "Network · Hardware · CCTV"], ["Software", "Web · API · Database"]].map(([a, b]) => (
              <div key={a} className="glass rounded-xl p-4">
                <p className="font-display text-foreground">{a}</p>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass gradient-border rounded-2xl p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
              <span>profile.config</span>
              <span className="flex gap-1.5"><i className="h-2 w-2 rounded-full bg-border" /><i className="h-2 w-2 rounded-full bg-border" /><i className="h-2 w-2 rounded-full bg-cyan" /></span>
            </div>
            <ol className="relative space-y-6 border-l border-border pl-6">
              {facts.map((f) => (
                <li key={f.k} className="relative">
                  <span className="absolute top-1 -left-[33px] flex h-4 w-4 items-center justify-center rounded-full border border-primary/60 bg-background"><span className="h-1.5 w-1.5 rounded-full bg-cyan" /></span>
                  <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-cyan uppercase"><f.icon size={13} /> {f.k}</p>
                  <p className="mt-1 text-foreground">{f.v}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

const skillIcons = { network: Network, code: Code2, wrench: Wrench };

export function Expertise() {
  return (
    <Section id="expertise" className="bg-surface/40">
      <SectionHeading eyebrow="02 / Expertise" title="Technical Expertise" intro="Dua dunia yang saling melengkapi: infrastruktur yang andal dan perangkat lunak yang bermanfaat." />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => {
          const Icon = skillIcons[g.icon];
          return (
            <Reveal key={g.id} delay={i * 0.1}>
              <article className="glass glow-card h-full rounded-2xl p-6 sm:p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-cyan"><Icon size={22} /></div>
                <h3 className="text-lg font-semibold text-foreground">{g.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{g.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-lg border border-border bg-background/50 px-3 py-1.5 text-[13px] text-foreground transition-colors hover:border-cyan/50 hover:text-cyan">{s}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading eyebrow="03 / Experience" title="Professional Journey" />
      <div className="relative">
        <div aria-hidden className="absolute top-2 bottom-2 left-[11px] w-px bg-gradient-to-b from-primary via-cyan/40 to-transparent md:left-1/2" />
        {experiences.map((e) => (
          <div key={e.role + e.company} className="relative grid gap-6 pl-10 md:grid-cols-2 md:gap-14 md:pl-0">
            <span aria-hidden className="absolute top-2 left-0 flex h-6 w-6 items-center justify-center rounded-full border border-primary bg-background shadow-glow md:left-1/2 md:-translate-x-1/2"><Briefcase size={11} className="text-cyan" /></span>
            <Reveal className="md:text-right">
              <p className="font-mono text-xs tracking-[0.2em] text-cyan uppercase">{e.period || "Period — to be added"}</p>
              <h3 className="mt-2 text-2xl font-semibold text-foreground">{e.role}</h3>
              <p className="text-muted-foreground">{e.company}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="glass space-y-3 rounded-2xl p-6">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />{p}</li>
                ))}
              </ul>
              {e.highlights?.map((h) => (
                <div key={h.title} className="gradient-border glass mt-5 rounded-2xl p-6">
                  <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-cyan uppercase"><Sparkles size={13} /> Highlight · {h.date}</p>
                  <h4 className="mt-2 text-lg font-semibold text-foreground">{h.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{h.description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {(h.photos.length ? h.photos : ['public/tr1.jpeg', 'public/tr2.jpeg']).map((src, i) =>
                      src ? (
                        <img key={src} src={src} alt={`${h.title} documentation ${i + 1}`} loading="lazy" className="aspect-square rounded-lg object-cover" />
                      ) : (
                        <div key={i} className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border text-muted-foreground"><ImagePlus size={16} /><span className="text-[10px]">Photo</span></div>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Projects() {
  return (
    <Section id="projects" className="bg-surface/40">
      <SectionHeading eyebrow="04 / Projects" title="Selected Projects" intro="Kumpulan proyek di bidang jaringan dan perangkat lunak. Status setiap proyek ditampilkan apa adanya." />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.1}><ProjectCard project={p} /></Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading eyebrow="05 / Credentials" title="Certifications & Achievements" />
      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((c, i) => (
          <Reveal key={c.title} delay={(i % 2) * 0.08}>
            <article className={`flex h-full gap-4 rounded-2xl p-5 ${c.placeholder ? "border border-dashed border-border" : "glass glow-card"}`}>
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c.placeholder ? "text-muted-foreground" : "bg-primary/10 text-cyan"}`}><Award size={20} /></div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-cyan uppercase">{c.type}</p>
                <h3 className={`mt-1 font-semibold ${c.placeholder ? "text-muted-foreground" : "text-foreground"}`}>{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.issuer} · {c.date}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(1000),
});

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = contactSchema.safeParse(data);
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
      setNotice("");
      return;
    }
    setErrors({});
    if (socials.email) {
      const body = encodeURIComponent(`${r.data.message}\n\n— ${r.data.name} (${r.data.email})`);
      window.location.href = `mailto:${socials.email}?subject=${encodeURIComponent("Portfolio inquiry")}&body=${body}`;
      setNotice("Your email app has been opened with the message. Please press send there.");
    } else {
      setNotice("Message not sent: email delivery isn't set up yet. Please reach out via LinkedIn for now.");
    }
  };

  const links = [
    { icon: Linkedin, label: "LinkedIn", value: "wahyunahdaputra", href: socials.linkedin },
    { icon: Github, label: "GitHub", value: "wahyunahdaputra", href: socials.github },
    { icon: Mail, label: "Email", value: socials.email || "Coming soon", href: socials.email ? `mailto:${socials.email}` : "" },
    { icon: MapPin, label: "Location", value: socials.location, href: "" },
  ];
  const field = "w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <Section id="contact" className="overflow-hidden">
      <div aria-hidden className="absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
      <SectionHeading eyebrow="06 / Contact" title="Let's Build Something Great" intro="Interested in collaborating, discussing technology, or exploring professional opportunities? Let's connect." />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="space-y-3">
          {links.map((l) => {
            const inner = (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-cyan"><l.icon size={18} /></span>
                <span className="min-w-0"><span className="block font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{l.label}</span><span className="block truncate text-foreground">{l.value}</span></span>
              </>
            );
            return l.href ? (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="glass glow-card flex items-center gap-4 rounded-2xl p-4">{inner}</a>
            ) : (
              <div key={l.label} className="glass flex items-center gap-4 rounded-2xl p-4">{inner}</div>
            );
          })}
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={submit} noValidate className="glass gradient-border space-y-4 rounded-2xl p-6 sm:p-8">
            {(["name", "email"] as const).map((n) => (
              <div key={n}>
                <label htmlFor={n} className="mb-1.5 block text-sm text-muted-foreground capitalize">{n}</label>
                <input id={n} name={n} type={n === "email" ? "email" : "text"} maxLength={n === "email" ? 255 : 100} className={field} aria-invalid={!!errors[n]} />
                {errors[n] && <p className="mt-1 text-xs text-destructive">{errors[n]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-muted-foreground">Message</label>
              <textarea id="message" name="message" rows={5} maxLength={1000} className={field} aria-invalid={!!errors["message"]} />
              {errors["message"] && <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>}
            </div>
            <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-accent text-sm font-medium text-primary-foreground shadow-glow transition-opacity hover:opacity-95">
              <Send size={16} /> Send Message
            </button>
            {notice && <p role="status" className="flex gap-2 rounded-xl border border-border bg-background/60 p-3 text-sm text-muted-foreground"><Info size={16} className="mt-0.5 shrink-0 text-cyan" />{notice}</p>}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
        <p className="font-display text-foreground">WNP<span className="text-cyan">.</span></p>
        <p>© {new Date().getFullYear()} {profile.name}. Network + Software Engineering.</p>
      </div>
    </footer>
  );
}
