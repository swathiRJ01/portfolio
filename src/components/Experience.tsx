import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { experience } from '@/data/portfolio';

export default function Experience() {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="relative px-5 py-24 sm:px-8 sm:py-32">
      {/* Section boundary glow */}
      <div className="pointer-events-none absolute -top-20 left-1/4 h-40 w-80 rounded-full bg-accent-cyan/10 blur-3xl" />

      <div className="mx-auto max-w-4xl">
        <SectionHeading tag="Experience" title="Leadership & Experience" />

        <div className="relative mt-14 pl-8 sm:pl-0">
          {/* vertical line with glow */}
          <div
            className="absolute left-2.5 top-2 h-full w-px sm:left-1/2"
            style={{
              background: 'linear-gradient(to bottom, #8B5CF6, #3B82F6, #06B6D4)',
              boxShadow: '0 0 8px rgba(139,92,246,0.4)',
            }}
          />

          {experience.map((item, i) => (
            <Reveal key={item.role} delay={i * 0.1}>
              <div className={`relative sm:w-1/2 ${i % 2 === 0 ? 'sm:ml-auto sm:pl-12' : 'sm:pr-12'}`}>
                {/* glowing node */}
                <motion.span
                  className={`absolute -left-[1.4rem] top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent-purple bg-ink-950 sm:left-auto ${
                    i % 2 === 0 ? 'sm:-left-2.5' : 'sm:-right-2.5'
                  }`}
                  animate={reduce ? {} : { boxShadow: ['0 0 0 0 rgba(139,92,246,0.6)', '0 0 0 10px rgba(139,92,246,0)'] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <span className="h-2 w-2 rounded-full bg-accent-purple" style={{ boxShadow: '0 0 6px rgba(139,92,246,0.8)' }} />
                </motion.span>

                <motion.div
                  className="glass-card glow-border rounded-2xl p-6"
                  whileHover={reduce ? undefined : { y: -4 }}
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent-cyan">{item.period}</span>
                  <h3 className="mt-2 flex items-center gap-2 text-lg font-bold text-white">
                    <Briefcase className="h-4 w-4 text-accent-purple" />
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">{item.org}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.description}</p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
