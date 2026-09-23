import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { skillCategories } from '@/data/portfolio';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';

export default function Skills() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>('all');

  const filtered =
    active === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.id === active);

  return (
    <section id="skills" className="relative px-5 py-24 sm:px-8 sm:py-32">
      {/* Section boundary glow */}
      <div className="pointer-events-none absolute -top-20 right-1/4 h-40 w-80 rounded-full bg-accent-blue/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading tag="Skills" title="Tech I work with" />

        {/* Filters */}
        <Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            <FilterBtn label="All" active={active === 'all'} onClick={() => setActive('all')} />
            {skillCategories.map((c) => (
              <FilterBtn
                key={c.id}
                label={c.label}
                active={active === c.id}
                onClick={() => setActive(c.id)}
              />
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            {filtered.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="glass-card glow-border group relative overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1.5"
                >
                  {/* hover gradient bg */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: 'radial-gradient(80% 80% at 50% 0%, rgba(139,92,246,0.12), transparent 70%)' }}
                  />
                  {/* hover glow */}
                  <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-accent-purple/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-5 w-5 text-accent-cyan transition-colors duration-300 group-hover:text-accent-purple" />
                    </div>
                    <h3 className="text-base font-bold text-white">{cat.label}</h3>
                  </div>

                  <div className="relative mt-5 flex flex-wrap gap-2.5">
                    {cat.skills.map((s, i) => (
                      <motion.div
                        key={s.name}
                        className="group/chip relative"
                        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.35 }}
                      >
                        <span className="inline-flex cursor-default items-center rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all duration-300 group-hover/chip:border-accent-purple/50 group-hover/chip:bg-white/[0.08] group-hover/chip:text-white">
                          {s.name}
                        </span>
                        {/* tooltip */}
                        <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-ink-800 px-2.5 py-1 text-[0.65rem] text-slate-300 opacity-0 transition-all duration-200 group-hover/chip:-translate-y-0.5 group-hover/chip:opacity-100">
                          {s.desc}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function FilterBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
        active
          ? 'border border-transparent text-white'
          : 'glass text-slate-400 hover:text-white'
      }`}
    >
      {active && (
        <motion.span
          layoutId="filter-active"
          className="absolute inset-0 -z-10"
          style={{ background: 'linear-gradient(135deg,#8B5CF6,#3B82F6,#06B6D4)' }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      {label}
    </button>
  );
}
