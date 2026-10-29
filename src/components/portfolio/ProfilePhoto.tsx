import { useRef, useState } from "react";
import { Upload, UserRound } from "lucide-react";

/**
 * Portrait frame. Permanent photo: set `profile.photo` in src/data/profile.ts.
 * The upload button gives an instant local preview only (not saved).
 */
export function ProfilePhoto({ src, name }: { src: string; name: string }) {
  const [preview] = useState<string>("");
  const image = preview || src;

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[22rem]">
      <div aria-hidden className="absolute -inset-10 rounded-full bg-primary/25 blur-3xl" />
      <div aria-hidden className="absolute -inset-4 translate-x-6 translate-y-6 rounded-full bg-cyan/15 blur-3xl" />
      <div className="gradient-border relative h-full overflow-hidden rounded-[2rem] glass">
        {image ? (
          <img src={image} alt={`Portrait of ${name}`} className="h-full w-full object-cover" />
        ) : (
          <div className="tech-grid absolute inset-0" />
        )}
        {!image && (
          <div className="relative flex h-full flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-primary/40 bg-surface shadow-glow">
              <UserRound className="text-cyan" size={40} strokeWidth={1.2} />
            </div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">Your portrait here</p>
          </div>
        )}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
        {/* corner brackets */}
        {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((c) => (
          <span key={c} aria-hidden className={`absolute h-5 w-5 border-cyan/70 ${c}`} />
        ))}
      </div>
    </div>
  );
}
