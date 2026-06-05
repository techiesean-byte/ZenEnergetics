import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";

/* ── Aura SVG layers ─────────────────────────────────────────────── */

function CongestedAura() {
  return (
    <svg
      viewBox="0 0 600 420"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="bg-c" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#2a1f35" />
          <stop offset="100%" stopColor="#0d0a14" />
        </radialGradient>
        <radialGradient id="body-c" cx="50%" cy="48%" r="38%">
          <stop offset="0%" stopColor="#4a3060" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#2d1f40" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1a0f28" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="murk1" cx="40%" cy="35%" r="30%">
          <stop offset="0%" stopColor="#5c3a1e" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3a200d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="murk2" cx="62%" cy="65%" r="28%">
          <stop offset="0%" stopColor="#3d2460" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1e0f35" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="murk3" cx="30%" cy="70%" r="22%">
          <stop offset="0%" stopColor="#4a2b10" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#2a1508" stopOpacity="0" />
        </radialGradient>
        <filter id="blur-c">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="blur-sm-c">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="600" height="420" fill="url(#bg-c)" />

      {/* Murky aura clouds */}
      <ellipse cx="300" cy="220" rx="220" ry="170" fill="url(#body-c)" filter="url(#blur-c)" />
      <ellipse cx="240" cy="155" rx="140" ry="110" fill="url(#murk1)" filter="url(#blur-c)" />
      <ellipse cx="370" cy="275" rx="130" ry="100" fill="url(#murk2)" filter="url(#blur-c)" />
      <ellipse cx="190" cy="290" rx="110" ry="85" fill="url(#murk3)" filter="url(#blur-c)" />

      {/* Dark speckles — congestion */}
      {[
        [180, 130, 18, "#6b3a0a", 0.5],
        [340, 100, 14, "#4a2575", 0.45],
        [420, 200, 20, "#5c3010", 0.4],
        [150, 260, 16, "#3a1e60", 0.5],
        [380, 310, 22, "#6b3a0a", 0.4],
        [250, 340, 15, "#4a2070", 0.45],
        [460, 150, 12, "#5c2a0a", 0.5],
        [130, 190, 18, "#4a2560", 0.4],
      ].map(([cx, cy, r, color, op], i) => (
        <circle
          key={i}
          cx={cx as number}
          cy={cy as number}
          r={r as number}
          fill={color as string}
          fillOpacity={op as number}
          filter="url(#blur-sm-c)"
        />
      ))}

      {/* Silhouette of body */}
      <ellipse cx="300" cy="310" rx="55" ry="80" fill="#2a1840" fillOpacity="0.7" />
      <ellipse cx="300" cy="190" rx="42" ry="50" fill="#2a1840" fillOpacity="0.75" />
      <ellipse cx="300" cy="135" rx="28" ry="32" fill="#2a1840" fillOpacity="0.8" />

      {/* Label */}
      <text x="300" y="400" textAnchor="middle" fill="#7a6090" fontSize="13" fontFamily="serif" letterSpacing="3" opacity="0.8">
        CONGESTED ENERGY
      </text>
    </svg>
  );
}

function CleansedAura() {
  return (
    <svg
      viewBox="0 0 600 420"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="bg-cl" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#1a0f35" />
          <stop offset="100%" stopColor="#080514" />
        </radialGradient>
        <radialGradient id="glow-main" cx="50%" cy="48%" r="45%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#7c3aed" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow-gold" cx="50%" cy="40%" r="30%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.28" />
          <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow-teal" cx="35%" cy="65%" r="28%">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow-rose" cx="68%" cy="60%" r="25%">
          <stop offset="0%" stopColor="#fda4af" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
        </radialGradient>
        <filter id="blur-cl">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id="blur-md-cl">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="blur-sm-cl">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="600" height="420" fill="url(#bg-cl)" />

      {/* Main aura layers */}
      <ellipse cx="300" cy="215" rx="240" ry="180" fill="url(#glow-main)" filter="url(#blur-cl)" />
      <ellipse cx="300" cy="195" rx="170" ry="140" fill="url(#glow-gold)" filter="url(#blur-cl)" />
      <ellipse cx="215" cy="270" rx="130" ry="100" fill="url(#glow-teal)" filter="url(#blur-cl)" />
      <ellipse cx="385" cy="265" rx="120" ry="95" fill="url(#glow-rose)" filter="url(#blur-cl)" />

      {/* Bright chakra points */}
      {[
        [300, 138, 12, "#fde68a", 0.9],
        [300, 172, 9, "#c084fc", 0.8],
        [300, 210, 10, "#67e8f9", 0.75],
        [300, 248, 10, "#86efac", 0.75],
        [300, 286, 9, "#fda4af", 0.8],
        [300, 318, 8, "#fb923c", 0.75],
        [300, 345, 10, "#f87171", 0.7],
      ].map(([cx, cy, r, color, op], i) => (
        <g key={i}>
          <circle cx={cx as number} cy={cy as number} r={(r as number) * 2.5} fill={color as string} fillOpacity={0.15} filter="url(#blur-md-cl)" />
          <circle cx={cx as number} cy={cy as number} r={r as number} fill={color as string} fillOpacity={op as number} filter="url(#blur-sm-cl)" />
          <circle cx={cx as number} cy={cy as number} r={(r as number) * 0.45} fill="white" fillOpacity={0.9} />
        </g>
      ))}

      {/* Radiating lines */}
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i * 360) / 18;
        const rad = (angle * Math.PI) / 180;
        const r1 = 85, r2 = 180;
        const x1 = 300 + r1 * Math.cos(rad);
        const y1 = 245 + r1 * Math.sin(rad) * 0.7;
        const x2 = 300 + r2 * Math.cos(rad);
        const y2 = 245 + r2 * Math.sin(rad) * 0.7;
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#c084fc"
            strokeWidth="0.8"
            strokeOpacity="0.25"
            filter="url(#blur-sm-cl)"
          />
        );
      })}

      {/* Silhouette */}
      <ellipse cx="300" cy="310" rx="52" ry="76" fill="#1a0f35" fillOpacity="0.6" />
      <ellipse cx="300" cy="193" rx="40" ry="48" fill="#1a0f35" fillOpacity="0.65" />
      <ellipse cx="300" cy="138" rx="27" ry="30" fill="#1a0f35" fillOpacity="0.7" />

      {/* Sparkle dots */}
      {[
        [165, 140, "#fde68a"],
        [435, 155, "#c084fc"],
        [140, 300, "#67e8f9"],
        [460, 290, "#fda4af"],
        [200, 95, "#86efac"],
        [400, 100, "#fde68a"],
      ].map(([cx, cy, color], i) => (
        <g key={i}>
          <circle cx={cx as number} cy={cy as number} r="3.5" fill={color as string} fillOpacity="0.85" />
          <circle cx={cx as number} cy={cy as number} r="7" fill={color as string} fillOpacity="0.2" filter="url(#blur-sm-cl)" />
        </g>
      ))}

      {/* Label */}
      <text x="300" y="400" textAnchor="middle" fill="#c084fc" fontSize="13" fontFamily="serif" letterSpacing="3" opacity="0.9">
        RESTORED ENERGY
      </text>
    </svg>
  );
}

/* ── Slider component ────────────────────────────────────────────── */

export function AuraSlider() {
  const [position, setPosition] = useState(42); // percent
  const [dragging, setDragging] = useState(false);
  const [hinted, setHinted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hint pulse on first load
  useEffect(() => {
    const t = setTimeout(() => setHinted(true), 800);
    const t2 = setTimeout(() => setHinted(false), 2800);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  const getPercent = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return 50;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    return Math.min(Math.max(pct, 5), 95);
  }, []);

  // Mouse
  const onMouseDown = (e: React.MouseEvent) => { e.preventDefault(); setDragging(true); };
  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent) => setPosition(getPercent(e.clientX));
    const up = () => setDragging(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [dragging, getPercent]);

  // Touch
  const onTouchStart = () => setDragging(true);
  useEffect(() => {
    if (!dragging) return;
    const move = (e: TouchEvent) => { e.preventDefault(); setPosition(getPercent(e.touches[0].clientX)); };
    const up = () => setDragging(false);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);
    return () => { window.removeEventListener("touchmove", move); window.removeEventListener("touchend", up); };
  }, [dragging, getPercent]);

  return (
    <section className="w-full py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">

        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
            See the Difference
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-3">
            The Energy Field, Before & After
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Drag the handle to reveal how Pranic Healing transforms a congested aura into a radiant, balanced energy field.
          </p>
        </motion.div>

        {/* Slider container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          ref={containerRef}
          className="relative select-none overflow-hidden rounded-2xl shadow-2xl ring-1 ring-border cursor-col-resize"
          style={{ aspectRatio: "600/420" }}
        >
          {/* After (right) — full width underneath */}
          <div className="absolute inset-0">
            <CleansedAura />
          </div>

          {/* Before (left) — clipped */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <div style={{ width: `${(100 / position) * 100}%`, maxWidth: "100vw" }} className="h-full">
              <CongestedAura />
            </div>
          </div>

          {/* Divider line */}
          <div
            className="absolute inset-y-0 w-px bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.6)] pointer-events-none"
            style={{ left: `${position}%` }}
          />

          {/* Handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${position}%` }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
            <motion.div
              animate={hinted && !dragging
                ? { x: [-14, 14, -14, 0], scale: [1, 1.1, 1.1, 1] }
                : { x: 0, scale: dragging ? 1.12 : 1 }
              }
              transition={hinted && !dragging
                ? { duration: 1.4, ease: "easeInOut" }
                : { type: "spring", stiffness: 300, damping: 22 }
              }
              className="w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center border border-border/30"
            >
              <ChevronsLeftRight size={18} className="text-foreground/70" />
            </motion.div>
          </div>

          {/* Before label */}
          <div className="absolute top-4 left-4 pointer-events-none">
            <span className="text-xs font-semibold tracking-widest uppercase text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
              Before
            </span>
          </div>

          {/* After label */}
          <div className="absolute top-4 right-4 pointer-events-none">
            <span className="text-xs font-semibold tracking-widest uppercase text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
              After
            </span>
          </div>
        </motion.div>

        {/* Caption row */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-center text-sm text-muted-foreground">
          <p>Stagnant, clouded prana — the source of fatigue, pain, and imbalance.</p>
          <p>Fresh, vibrant prana — clarity, vitality, and renewed inner peace.</p>
        </div>
      </div>
    </section>
  );
}
