import { motion, useReducedMotion } from 'framer-motion';
import { BadgeCheck, Globe } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { certifications, languages } from '@/data/portfolio';

export default function Certifications() {
  const reduce = useReducedMotion();

  return (
    <section id="certifications" className="relative px-5 py-24 sm:px-8 sm:py-32">
      {/* Section boundary glow */}
      <div className="pointer-events-none absolute -top-20 right-1/4 h-40 w-80 rounded-full bg-accent-purple/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading tag="Credentials" title="Certifications & languages" />

        {/* Certifications */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <motion.div
                className="glass-card glow-border shine-sweep group relative overflow-hidden rounded-2xl p-6"
                whileHover={{ y: -6 }}
              >
                {/* cert shine */}
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent-purple/20 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-accent-purple/30 bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 transition-transform duration-300 group-hover:scale-110">
                    <BadgeCheck className="h-7 w-7 text-accent-purple" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent-cyan">{c.provider}</p>
                    <h3 className="mt-1 text-base font-bold leading-snug text-white">{c.title}</h3>
                  </div>
                </div>
                {/* ribbon bottom */}
                <div className="mt-5 h-1 w-full rounded-full bg-gradient-to-r from-accent-purple/40 via-accent-blue/40 to-accent-cyan/40" />
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Languages */}
        <Reveal delay={0.15}>
          <div className="mt-16 text-center">
            <h3 className="flex items-center justify-center gap-2 text-lg font-bold text-white">
              <Globe className="h-5 w-5 text-accent-cyan" />
              Languages
            </h3>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {languages.map((lang, i) => (
                <motion.span
                  key={lang}
                  className="glass glow-border cursor-default rounded-full px-5 py-2.5 text-sm font-semibold text-slate-200"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
