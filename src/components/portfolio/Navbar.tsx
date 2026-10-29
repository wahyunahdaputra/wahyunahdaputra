import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach((n) => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass border-x-0 border-t-0" : "border-b border-transparent"}`}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <a href="#home" className="font-display text-xl font-bold tracking-tight text-foreground">
          WNP<span className="text-cyan">.</span>
          <span className="sr-only">{profile.name}</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`group relative px-3 py-2 text-sm transition-colors ${active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {n.label}
                <span className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gradient-accent transition-transform duration-300 ${active === n.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </a>
            </li>
          ))}
        </ul>
        <button
          className="glass flex h-11 w-11 items-center justify-center rounded-full text-foreground lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 bottom-0 bg-background/95 px-5 pt-6 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between border-b border-border py-4 font-display text-2xl ${active === n.id ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {n.label}
                    <span className="font-mono text-xs text-cyan">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
