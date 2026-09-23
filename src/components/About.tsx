import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, FolderGit2, Layers, BarChart3 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';
import { stats } from '@/data/portfolio';

const icons = [GraduationCap, FolderGit2, Layers, BarChart3];

export default function About() {
  const reduce = useReducedMotion();
  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 sm:py-32">
      {/* Section boundary glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-[60%] -translate-x-1/2 rounded-full bg-accent-purple/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="section-tag">About</span>
          <h2 className="section-heading">
            <span className="gradient-text">More than just code.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left — profile card with 3D tilt + shine */}
          <Reveal>
            <TiltCard maxTilt={6}>
              <div className="glass-strong glow-border shine-sweep group relative overflow-hidden rounded-3xl p-8">
                {/* glow */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent-purple/30 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-accent-cyan/20 blur-3xl" />

                {/* Floating decorative dots */}
                <motion.div
                  className="absolute right-6 top-6 h-2 w-2 rounded-full bg-accent-purple/50"
                  animate={reduce ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute right-10 top-12 h-1.5 w-1.5 rounded-full bg-accent-cyan/40"
                  animate={reduce ? {} : { y: [0, -6, 0] }}
                  transition={{ duration: 5, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="relative flex flex-col items-center text-center">
                  {/* Avatar ring */}
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full blur-md"
                      style={{ background: 'linear-gradient(135deg,#8B5CF6,#3B82F6,#06B6D4)' }}
                      animate={reduce ? {} : { rotate: 360 }}
                      transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-white/10 bg-ink-900">
                      <span className="gradient-text text-3xl font-extrabold">SRJ</span>
                    </div>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white">Swathi R J</h3>
                  <p className="mt-1 text-sm text-slate-400">Full-Stack Developer · Data Analytics</p>

                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {['React', 'Python', 'Node.js', 'MySQL', 'Git'].map((t) => (
                      <span key={t} className="glass rounded-full px-3 py-1 text-xs text-slate-300 transition-all hover:scale-105 hover:text-white">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 w-full border-t border-white/10 pt-5 text-left">
                    <p className="text-xs uppercase tracking-widest text-slate-500">Based in</p>
                    <p className="mt-1 text-sm text-slate-200">Mangalore, Karnataka, India</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Right — intro + stats */}
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-slate-300 text-balance">
              I'm an Information Science &amp; Engineering graduate passionate about building useful and
              interactive digital products. My interests lie in full-stack web development and data
              analytics, and I enjoy learning technologies by turning ideas into real projects.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s, i) => {
                const Icon = icons[i];
                return (
                  <motion.div
                    key={s.label}
                    className="glass-card glow-border shine-sweep group relative overflow-hidden rounded-2xl p-5 text-center"
                    whileHover={{ y: -6 }}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-accent-purple/15 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <Icon className="mx-auto h-5 w-5 text-accent-purple transition-transform duration-300 group-hover:scale-110" />
                    <p className="mt-3 text-xl font-extrabold text-white">{s.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">{s.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
