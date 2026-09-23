import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import { navLinks } from '@/data/portfolio';
import { useActiveSection, useScrolled } from '@/hooks/useScroll';
import MagneticButton from '@/components/MagneticButton';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Navbar() {
  const scrolled = useScrolled(40);
  const active = useActiveSection(navLinks.map((l) => l.id));
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <motion.header
      initial={reduce ? { opacity: 0 } : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 ${
          scrolled
            ? 'mt-2 rounded-2xl border border-white/10 py-3 shadow-lg shadow-black/30 backdrop-blur-2xl'
            : 'border border-transparent py-5'
        }`}
        style={
          scrolled
            ? {
                background:
                  'linear-gradient(135deg, rgba(11,16,32,0.7) 0%, rgba(5,8,22,0.5) 100%)',
              }
            : undefined
        }
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="group text-lg font-extrabold tracking-tight transition-transform hover:scale-105"
        >
          <span className="gradient-text">SWATHI</span>
          <span className="text-white">.</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                active === link.id ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {active === link.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full border border-white/10 backdrop-blur-md"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {/* glowing underline */}
              {active === link.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full"
                  style={{
                    width: '60%',
                    background: 'linear-gradient(90deg, #8B5CF6, #3B82F6, #06B6D4)',
                    boxShadow: '0 0 8px rgba(139,92,246,0.6)',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <MagneticButton className="hidden sm:block" strength={0.2}>
            <button onClick={() => scrollTo('contact')} className="btn-primary group">
              <MessageCircle className="h-4 w-4" />
              Let's Talk
            </button>
          </MagneticButton>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="glass rounded-lg p-2 text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="glass mx-3 mt-2 overflow-hidden rounded-2xl lg:hidden"
          >
            <div className="flex flex-col p-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    scrollTo(link.id);
                    setOpen(false);
                  }}
                  className={`relative rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                    active === link.id
                      ? 'bg-white/5 text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {active === link.id && (
                    <span
                      className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full"
                      style={{ background: 'linear-gradient(180deg, #8B5CF6, #06B6D4)' }}
                    />
                  )}
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  scrollTo('contact');
                  setOpen(false);
                }}
                className="btn-primary mt-3 w-full justify-center"
              >
                <MessageCircle className="h-4 w-4" />
                Let's Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
