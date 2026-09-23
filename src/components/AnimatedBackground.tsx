import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';

export default function AnimatedBackground() {
  const reduce = useReducedMotion();
  const spotlightRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 6,
        duration: Math.random() * 6 + 6,
      })),
    []
  );

  useEffect(() => {
    if (reduce || window.matchMedia('(pointer: coarse)').matches) return;
    const onMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--mx', `${e.clientX}px`);
        spotlightRef.current.style.setProperty('--my', `${e.clientY}px`);
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduce]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-ink-950" />
      {/* Radial glow top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 60%), radial-gradient(50% 40% at 80% 100%, rgba(6,182,212,0.10) 0%, transparent 60%)',
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.18] animate-grid-pan"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 80%)',
        }}
      />

      {/* Mouse spotlight */}
      {!reduce && (
        <div
          ref={spotlightRef}
          className="absolute inset-0"
          style={
            {
              background:
                'radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.10), transparent 40%)',
            } as React.CSSProperties
          }
        />
      )}

      {/* Animated blobs */}
      {!reduce && (
        <>
          <motion.div
            className="absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.30) 0%, transparent 70%)' }}
            animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute right-[-10rem] top-1/3 h-[32rem] w-[32rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.26) 0%, transparent 70%)' }}
            animate={{ x: [0, -30, 20, 0], y: [0, 40, -20, 0], scale: [1, 0.95, 1.1, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.22) 0%, transparent 70%)' }}
            animate={{ x: [0, 30, -30, 0], y: [0, -20, 30, 0], scale: [1, 1.05, 0.9, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute right-1/4 top-2/3 h-[20rem] w-[20rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.16) 0%, transparent 70%)' }}
            animate={{ x: [0, -25, 15, 0], y: [0, 25, -15, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Particles / stars */}
      {!reduce && (
        <div className="absolute inset-0">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                opacity: 0.5,
              }}
              animate={{ opacity: [0.15, 0.7, 0.15], scale: [1, 1.4, 1] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Noise / grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 50%, transparent 50%, rgba(5,8,22,0.6) 100%)',
        }}
      />
    </div>
  );
}
