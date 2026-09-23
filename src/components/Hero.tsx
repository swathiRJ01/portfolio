import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown, Sparkles } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import TiltCard from '@/components/TiltCard';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const floatBadges = [
  { label: 'React', className: 'left-[-2.5rem] top-8', delay: 0 },
  { label: 'JavaScript', className: 'right-[-3rem] top-20', delay: 1.2 },
  { label: 'Python', className: 'left-[-1.5rem] bottom-16', delay: 0.6 },
  { label: 'Node.js', className: 'right-[-2rem] bottom-6', delay: 1.8 },
];

const codeLines: { txt: string; cls: string }[] = [
  { txt: 'const developer = {', cls: 'text-slate-400' },
  { txt: '  name: "Swathi R J",', cls: 'text-accent-purple' },
  { txt: '  role: "Full-Stack Developer",', cls: 'text-accent-blue' },
  { txt: '  passion: [', cls: 'text-slate-400' },
  { txt: '    "Web Development",', cls: 'text-accent-cyan' },
  { txt: '    "Data Analytics"', cls: 'text-accent-cyan' },
  { txt: '  ]', cls: 'text-slate-400' },
  { txt: '};', cls: 'text-slate-400' },
];

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center px-5 pt-28 pb-16 sm:px-8">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        {/* Left */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for Opportunities
            </span>
          </motion.div>

          <motion.h1 variants={item} className="mt-6 text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl xl:text-6xl">
            Hi, I'm <span className="gradient-text">Swathi R J.</span>
          </motion.h1>

          <motion.h2
            variants={item}
            className="mt-3 text-3xl font-extrabold leading-[1.2] tracking-tight sm:text-4xl xl:text-5xl text-balance"
          >
            <span className="gradient-text-animated">Building digital experiences with code &amp; creativity.</span>
          </motion.h2>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 text-balance">
            I'm an Information Science Engineering graduate and aspiring Full-Stack Developer with an
            interest in Data Analytics. I enjoy turning ideas into interactive, practical web applications.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <MagneticButton strength={0.2}>
              <button onClick={() => scrollTo('projects')} className="btn-primary group">
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <button onClick={() => scrollTo('contact')} className="btn-ghost group">
                Let's Connect
                <Sparkles className="h-4 w-4 text-accent-purple transition-transform group-hover:scale-110" />
              </button>
            </MagneticButton>
          </motion.div>

          <motion.p variants={item} className="mt-6 text-xs font-medium uppercase tracking-widest text-slate-500">
            Full-Stack Development <span className="text-accent-purple">•</span> Data Analytics{' '}
            <span className="text-accent-cyan">•</span> Problem Solving
          </motion.p>
        </motion.div>

        {/* Right — floating code card with 3D tilt */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-lg"
        >
          {/* Orbs behind */}
          <div className="absolute -inset-10 -z-10">
            <div className="absolute left-1/4 top-0 h-40 w-40 rounded-full bg-accent-purple/30 blur-3xl" />
            <div className="absolute right-0 bottom-10 h-48 w-48 rounded-full bg-accent-cyan/25 blur-3xl" />
            <div className="absolute left-0 bottom-1/3 h-32 w-32 rounded-full bg-accent-blue/25 blur-3xl" />
          </div>

          {/* Floating badges */}
          {floatBadges.map((b) => (
            <motion.div
              key={b.label}
              className={`absolute z-20 ${b.className}`}
              animate={reduce ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 5, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="glass glow-border rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-200 shadow-lg transition-transform hover:scale-110">
                {b.label}
              </div>
            </motion.div>
          ))}

          {/* Code window with 3D tilt + float */}
          <motion.div
            animate={reduce ? {} : { y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <TiltCard maxTilt={6}>
              <div className="glass-card glow-border shine-sweep relative z-10 overflow-hidden rounded-2xl">
                {/* Glowing corners */}
                <div className="pointer-events-none absolute left-0 top-0 h-8 w-8 rounded-tl-2xl" style={{ boxShadow: '-2px -2px 12px rgba(139,92,246,0.3)' }} />
                <div className="pointer-events-none absolute right-0 top-0 h-8 w-8 rounded-tr-2xl" style={{ boxShadow: '2px -2px 12px rgba(6,182,212,0.3)' }} />

                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <span className="h-3 w-3 rounded-full bg-green-400/80" />
                  <span className="ml-3 text-xs font-medium text-slate-400">developer.js</span>
                </div>
                {/* Code body */}
                <div className="p-5 font-mono text-[0.8rem] leading-relaxed sm:text-sm">
                  <pre className="whitespace-pre-wrap">
                    {codeLines.map((l, i) => (
                      <motion.div
                        key={i}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.12, duration: 0.4 }}
                        className={l.cls}
                      >
                        <span className="mr-4 select-none text-slate-600">{i + 1}</span>
                        {l.txt}
                      </motion.div>
                    ))}
                  </pre>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-label="Scroll down"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[0.65rem] uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
