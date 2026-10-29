import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import type { ReactNode, MouseEvent } from "react";
import type { ProjectStatus } from "@/data/projects";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl md:mb-16">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-cyan uppercase">
        <span className="h-px w-8 bg-gradient-accent" />
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>}
    </Reveal>
  );
}

export function Section({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative px-5 py-24 sm:px-8 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

type BtnProps = {
  href?: string | undefined;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  disabled?: boolean;
  download?: boolean;
  ariaLabel?: string;
};

const btnBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const btnVariants = {
  primary: "bg-gradient-accent text-primary-foreground shadow-glow hover:opacity-95",
  ghost: "glass text-foreground hover:border-primary/50 hover:text-cyan",
};

/** Button with a light magnetic pull toward the cursor. */
export function MagneticButton({ href, children, variant = "primary", external, disabled, download, ariaLabel }: BtnProps) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const move = (e: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };
  const cls = `${btnBase} ${btnVariants[variant]} ${disabled ? "pointer-events-none opacity-50" : ""}`;
  return (
    <motion.a
      href={disabled ? undefined : href}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download}
      onMouseMove={move}
      onMouseLeave={reset}
      style={{ x, y }}
      className={cls}
    >
      {children}
    </motion.a>
  );
}

const statusStyles: Record<ProjectStatus, string> = {
  Draft: "text-muted-foreground border-border",
  "In Development": "text-warning border-warning/30",
  Completed: "text-success border-success/30",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border bg-background/60 px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase ${statusStyles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-surface/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
      {children}
    </span>
  );
}
