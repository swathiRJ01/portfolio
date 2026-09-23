import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { education } from '@/data/portfolio';

export default function Education() {
  const reduce = useReducedMotion();

  return (
    <section id="education" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading tag="Education" title="Academic journey" />

        <div className="relative mt-14 pl-8">
          {/* glowing timeline line */}
          <div
            className="absolute left-2.5 top-2 h-full w-px"
            style={{
              background: 'linear-gradient(to bottom, #8B5CF6, #3B82F6, #06B6D4)',
              boxShadow: '0 0 8px rgba(59,130,246,0.4)',
            }}
          />

          <div className="space-y-8">
            {education.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="relative">
                  {/* glowing node */}
                  <motion.span
                    className="absolute -left-[1.4rem] top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent-blue bg-ink-950"
                    animate={reduce ? {} : { boxShadow: ['0 0 0 0 rgba(59,130,246,0.6)', '0 0 0 10px rgba(59,130,246,0)'] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                  >
                    <span className="h-2 w-2 rounded-full bg-accent-blue" style={{ boxShadow: '0 0 6px rgba(59,130,246,0.8)' }} />
                  </motion.span>

                  <motion.div
                    className="glass-card glow-border rounded-2xl p-6"
                    whileHover={reduce ? undefined : { y: -4 }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-accent-cyan">{item.period}</span>
                        <h3 className="mt-2 flex items-center gap-2 text-lg font-bold text-white">
                          <GraduationCap className="h-5 w-5 text-accent-purple" />
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-slate-400">{item.institution}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-purple/30 bg-accent-purple/10 px-3 py-1 text-xs font-bold text-accent-purple">
                        <Award className="h-3.5 w-3.5" />
                        {item.metric}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
