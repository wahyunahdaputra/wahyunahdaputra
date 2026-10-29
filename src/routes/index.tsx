import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About, Certifications, Contact, Experience, Expertise, Footer, Projects } from "@/components/portfolio/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wahyu Nahda Putra — IT Infrastructure & Network Engineer" },
      { name: "description", content: "Portfolio of Wahyu Nahda Putra, IT Engineer in Kendari focused on IT infrastructure, network engineering, hardware troubleshooting, and software development." },
      { property: "og:title", content: "Wahyu Nahda Putra — IT Infrastructure & Network Engineer" },
      { property: "og:description", content: "Network Engineering + Software Engineering. Explore projects, experience, and expertise." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Loader() {
  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <motion.p initial={{ opacity: 0, letterSpacing: "0.6em" }} animate={{ opacity: 1, letterSpacing: "0.1em" }} transition={{ duration: 0.7 }} className="font-display text-3xl font-bold text-foreground">
        WNP<span className="text-cyan">.</span>
      </motion.p>
    </motion.div>
  );
}

function Index() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t); }, []);
  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
