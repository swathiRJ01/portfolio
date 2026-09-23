import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { contactInfo } from '@/data/portfolio';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Footer() {
  const socials = [
    { icon: Github, href: contactInfo.github, label: 'GitHub' },
    { icon: Linkedin, href: contactInfo.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${contactInfo.email}`, label: 'Email' },
  ];

  return (
    <footer className="relative px-5 pb-10 pt-16 sm:px-8">
      {/* animated gradient line */}
      <div className="mb-10 h-px w-full overflow-hidden">
        <div
          className="h-full w-full animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent, #8B5CF6, #3B82F6, #06B6D4, transparent)',
            backgroundSize: '200% 100%',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* logo */}
          <button
            onClick={() => scrollTo('home')}
            className="group text-lg font-extrabold transition-transform hover:scale-105"
          >
            <span className="gradient-text">SWATHI</span>
            <span className="text-white">.</span>
          </button>

          {/* nav */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-400">
            {['Home', 'About', 'Projects', 'Contact'].map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                className="group relative transition-colors hover:text-white"
              >
                {l}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-accent-purple to-accent-cyan transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* socials */}
          <div className="flex gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="glass group flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:text-white"
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-1 text-center">
          <p className="text-sm text-slate-400">
            Designed &amp; built by <span className="font-semibold text-white">Swathi R J</span>
          </p>
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            Made with <Heart className="h-3 w-3 fill-accent-pink text-accent-pink" /> using React, Tailwind &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
