import { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import type { Project } from '@/data/portfolio';

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} details`}
            className="glass-strong glow-border relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 sm:p-8"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* animated close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:rotate-90 hover:border-red-400/40 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent-purple">
                {project.badge}
              </span>
              <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{project.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{project.tagline}</p>
            </div>

            <div className="mt-6 space-y-6">
              <Block title="Problem">
                <p className="text-sm leading-relaxed text-slate-300">{project.problem}</p>
              </Block>
              <Block title="Solution">
                <p className="text-sm leading-relaxed text-slate-300">{project.solution}</p>
              </Block>

              <Block title="Features">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title="Technologies">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span key={t} className="glass rounded-full px-3 py-1 text-xs font-medium text-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </Block>

              <Block title="My Learning">
                <p className="text-sm leading-relaxed text-slate-300">{project.learning}</p>
              </Block>
            </div>

            {/* links */}
            <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs">
                <ExternalLink className="h-4 w-4" /> View Project
              </a>
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <span className="ml-auto self-center text-xs text-slate-500">
                Links are placeholders — replace with live URLs.
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-accent-blue">{title}</h4>
      {children}
    </div>
  );
}
