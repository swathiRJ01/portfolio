import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Search, TrendingDown, Building2, User, DollarSign } from 'lucide-react';
import type { Project } from '@/data/portfolio';
import TiltCard from '@/components/TiltCard';

function CartCortexMock() {
  const rows = [
    { store: 'Amazon', price: '₹1,299', lowest: false },
    { store: 'Flipkart', price: '₹1,150', lowest: true },
    { store: 'Snapdeal', price: '₹1,340', lowest: false },
  ];
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-4">
      {/* search */}
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-ink-950/60 px-3 py-2">
        <Search className="h-3.5 w-3.5 text-slate-400" />
        <div className="h-2 w-32 rounded-full bg-white/10" />
        <div className="ml-auto h-5 w-14 rounded-md bg-gradient-to-r from-accent-purple to-accent-blue" />
      </div>
      {/* product card */}
      <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-ink-950/50 p-2.5">
        <div className="h-10 w-10 rounded-md bg-gradient-to-br from-accent-purple/40 to-accent-cyan/40" />
        <div className="flex-1">
          <div className="h-2 w-24 rounded-full bg-white/15" />
          <div className="mt-1.5 h-1.5 w-16 rounded-full bg-white/10" />
        </div>
        <TrendingDown className="h-4 w-4 text-emerald-400" />
      </div>
      {/* price rows */}
      {rows.map((r) => (
        <div
          key={r.store}
          className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
            r.lowest
              ? 'border-emerald-400/40 bg-emerald-400/10'
              : 'border-white/10 bg-ink-950/40'
          }`}
        >
          <span className="text-[0.7rem] font-medium text-slate-300">{r.store}</span>
          <span className={`text-[0.75rem] font-bold ${r.lowest ? 'text-emerald-300' : 'text-slate-200'}`}>
            {r.price}
            {r.lowest && (
              <span className="ml-1.5 animate-pulse-glow rounded bg-emerald-400/20 px-1.5 py-0.5 text-[0.55rem] uppercase text-emerald-300">
                Lowest
              </span>
            )}
          </span>
        </div>
      ))}
      {/* mini chart */}
      <div className="mt-auto flex items-end gap-1.5 rounded-lg border border-white/10 bg-ink-950/40 p-2">
        {[40, 65, 35, 80, 55].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-accent-purple/40 to-accent-cyan/60"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          />
        ))}
      </div>
    </div>
  );
}

function FlatRentalMock() {
  const cards = [
    { flat: 'Flat 101', status: 'Paid', color: 'text-emerald-300' },
    { flat: 'Flat 202', status: 'Pending', color: 'text-amber-300' },
    { flat: 'Flat 305', status: 'Paid', color: 'text-emerald-300' },
  ];
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-accent-cyan" />
          <div className="h-2 w-20 rounded-full bg-white/15" />
        </div>
        <div className="h-5 w-16 rounded-md bg-gradient-to-r from-accent-purple to-accent-blue" />
      </div>
      {/* property + tenant */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-white/10 bg-ink-950/50 p-3">
          <div className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-wider text-slate-500">
            <Building2 className="h-3 w-3" /> Property
          </div>
          <div className="mt-1.5 h-2 w-16 rounded-full bg-white/15" />
          <div className="mt-1 h-1.5 w-12 rounded-full bg-white/10" />
        </div>
        <div className="rounded-lg border border-white/10 bg-ink-950/50 p-3">
          <div className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-wider text-slate-500">
            <User className="h-3 w-3" /> Tenant
          </div>
          <div className="mt-1.5 h-2 w-16 rounded-full bg-white/15" />
          <div className="mt-1 h-1.5 w-12 rounded-full bg-white/10" />
        </div>
      </div>
      {/* payments */}
      {cards.map((c) => (
        <div key={c.flat} className="flex items-center justify-between rounded-lg border border-white/10 bg-ink-950/40 px-3 py-2">
          <div className="flex items-center gap-2">
            <DollarSign className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-[0.7rem] font-medium text-slate-300">{c.flat}</span>
          </div>
          <span className={`text-[0.6rem] font-bold uppercase ${c.color}`}>{c.status}</span>
        </div>
      ))}
    </div>
  );
}

export default function ProjectCard({
  project,
  onOpen,
  index,
}: {
  project: Project;
  onOpen: () => void;
  index: number;
}) {
  const reduce = useReducedMotion();
  const lightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduce || !lightRef.current) return;
    const rect = lightRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lightRef.current.style.setProperty('--lx', `${x}px`);
    lightRef.current.style.setProperty('--ly', `${y}px`);
  };

  const isFeatured = project.featured;

  return (
    <motion.article
      layout
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={isFeatured ? 'lg:col-span-2' : ''}
    >
      <TiltCard maxTilt={5}>
        <div
          data-cursor="view"
          onMouseMove={handleMouseMove}
          className="glass-card glow-border shine-sweep group relative cursor-pointer overflow-hidden rounded-3xl"
          onClick={onOpen}
        >
          {/* cursor-follow lighting */}
          <div
            ref={lightRef}
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={
              {
                background:
                  'radial-gradient(300px circle at var(--lx, 50%) var(--ly, 50%), rgba(139,92,246,0.12), transparent 60%)',
              } as React.CSSProperties
            }
          />

          {/* Mockup */}
          <div className="relative h-64 overflow-hidden border-b border-white/10 sm:h-72">
            <div className="absolute inset-0 bg-gradient-to-br from-ink-800 to-ink-950" />
            {/* mini window chrome */}
            <div className="absolute left-4 top-4 z-10 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            </div>
            <motion.div
              className="absolute inset-0 pt-12"
              animate={reduce ? {} : { scale: [1, 1.03, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
              {project.id === 'cartcortex' ? <CartCortexMock /> : <FlatRentalMock />}
            </motion.div>
            {/* hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-ink-950/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
              <span className="glass rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                Click to View Details
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="relative z-10 p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-purple">
                {project.badge}
              </span>
              <ArrowUpRight className="h-4 w-4 text-slate-500 transition-all group-hover:text-accent-cyan group-hover:rotate-45" />
            </div>

            <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400 text-balance">{project.description}</p>

            {/* tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="glass rounded-full px-2.5 py-1 text-[0.7rem] font-medium text-slate-300">
                  {t}
                </span>
              ))}
            </div>

            {/* actions */}
            <div className="mt-6 flex flex-wrap gap-3" onClick={(e) => e.stopPropagation()}>
              <button onClick={onOpen} className="btn-primary text-xs group/btn">
                View Details <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs">
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs">
                <ExternalLink className="h-3.5 w-3.5" /> Demo
              </a>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}
