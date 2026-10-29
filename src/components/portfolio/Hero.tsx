import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Download, Github, Linkedin, Cpu, Wifi, Activity } from "lucide-react";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { NetworkBackground } from "./NetworkBackground";
import { MagneticButton } from "./primitives";
import { ProfilePhoto } from "./ProfilePhoto";

function useTyping(words: string[], reduce: boolean | null) {
  const [i, setI] = useState(0);
  const [text, setText] = useState<string>(reduce ? words[0]! : "");
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (reduce) {
      const t = setTimeout(() => { setI((v) => (v + 1) % words.length); setText(words[(i + 1) % words.length]!); }, 3000);
      return () => clearTimeout(t);
    }
    const word = words[i]!;
    const t = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDel(true), 1600);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (!next) { setDel(false); setI((v) => (v + 1) % words.length); }
      }
    }, del ? 35 : 70);
    return () => clearTimeout(t);
  }, [text, del, i, words, reduce]);
  return text;
}

const tags = [
  { icon: Wifi, label: "Network Connected", pos: "-left-4 top-[14%] sm:-left-10" },
  { icon: Activity, label: "System Operational", pos: "-right-3 top-[46%] sm:-right-10" },
  { icon: Cpu, label: "Engineering & Technology", pos: "left-2 bottom-[8%] sm:-left-6" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const typed = useTyping(profile.rotatingSkills, reduce);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const fade = { initial: reduce ? false : { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } } as const;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="home" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-24 pb-16 sm:px-8">
      <div aria-hidden className="tech-grid absolute inset-0" />
      <NetworkBackground className="opacity-70" />
      <div aria-hidden className="absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />
      <div aria-hidden className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan/10 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <motion.div style={{ y: yText }} className="order-2 lg:order-1">
          <motion.p {...fade} transition={{ duration: 0.7, delay: 0.3, ease }} className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan pulse-dot" /> {profile.greeting}
          </motion.p>
          <motion.h1 {...fade} transition={{ duration: 0.8, delay: 0.4, ease }} className="text-[2.6rem] leading-[0.95] font-bold text-foreground sm:text-6xl lg:text-7xl">
            WAHYU NAHDA
            <br />
            <span className="text-gradient">PUTRA</span>
          </motion.h1>
          <motion.div {...fade} transition={{ duration: 0.7, delay: 0.55, ease }} className="mt-6 space-y-1">
            {profile.headlines.map((h, i) => (
              <p key={h} className={i === 0 ? "text-lg font-medium text-foreground sm:text-xl" : "text-base text-muted-foreground sm:text-lg"}>{h}</p>
            ))}
          </motion.div>
          <motion.div {...fade} transition={{ duration: 0.7, delay: 0.65, ease }} className="mt-6 flex h-8 items-center gap-2 font-mono text-sm text-muted-foreground">
            <span className="text-cyan">&gt;_</span>
            <span className="text-foreground" aria-live="polite">{typed}</span>
            <span className="caret h-5 w-[2px] bg-cyan" />
          </motion.div>
          <motion.p {...fade} transition={{ duration: 0.7, delay: 0.75, ease }} className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            {profile.description}
          </motion.p>
          <motion.div {...fade} transition={{ duration: 0.7, delay: 0.85, ease }} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton href="#projects">Explore My Work <ArrowRight size={16} /></MagneticButton>
            <MagneticButton href={profile.cvUrl || undefined} variant="ghost" download={!!profile.cvUrl} disabled={!profile.cvUrl}>
              <Download size={16} /> {profile.cvUrl ? "Download CV" : "CV coming soon"}
            </MagneticButton>
            <div className="flex gap-2">
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="glass flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:border-primary/50 hover:text-cyan">
                <Linkedin size={18} />
              </a>
              <a href={socials.github || undefined} aria-disabled={!socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title={socials.github ? "GitHub" : "GitHub coming soon"} className={`glass flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:border-primary/50 hover:text-cyan ${socials.github ? "" : "opacity-50"}`}>
                <Github size={18} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: yPhoto }}
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease }}
          className="relative order-1 mx-auto w-full max-w-[17rem] sm:max-w-[22rem] lg:order-2"
        >
          <ProfilePhoto src={profile.photo} name={profile.name} />
          {tags.map((t, i) => (
            <motion.div
              key={t.label}
              aria-hidden
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.15, duration: 0.6 }}
              className={`glass absolute ${i === 0 ? "flex" : "hidden sm:flex"} items-center gap-2 rounded-full px-3 py-2 font-mono text-[10px] tracking-wide text-foreground uppercase sm:text-[11px] ${t.pos}`}
            >
              <t.icon size={13} className="text-cyan" /> {t.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <a href="#about" aria-label="Scroll to About" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground md:flex">
        SCROLL
        <span className="h-10 w-px bg-gradient-to-b from-cyan to-transparent" />
      </a>
    </section>
  );
}
