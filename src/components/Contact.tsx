import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import MagneticButton from '@/components/MagneticButton';
import { contactInfo } from '@/data/portfolio';

export default function Contact() {
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  const socials = [
    { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'Swathi', href: contactInfo.linkedin },
    { icon: Github, label: 'GitHub', value: 'Swathi', href: contactInfo.github },
  ];

  return (
    <section id="contact" className="relative px-5 py-24 sm:px-8 sm:py-32">
      {/* Animated background orb behind form */}
      <motion.div
        className="pointer-events-none absolute right-1/4 top-1/3 h-72 w-72 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
        animate={reduce ? {} : { scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/4 bottom-1/4 h-60 w-60 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)' }}
        animate={reduce ? {} : { scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          tag="Contact"
          title="Let's build something together."
          subtitle="I'm open to opportunities, collaborations and projects where I can learn, contribute and grow."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Left — contact details */}
          <Reveal>
            <div className="glass-card glow-border h-full rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white">Get in touch</h3>
              <p className="mt-2 text-sm text-slate-400">
                Reach out through any of the channels below — I usually respond within a day.
              </p>
              <div className="mt-6 space-y-3">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.label === 'Email' ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className="glass group flex items-center gap-4 rounded-xl p-4 transition-all hover:border-accent-purple/40 hover:-translate-y-0.5"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-accent-cyan transition-all duration-300 group-hover:scale-110 group-hover:text-accent-purple">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wider text-slate-500">{s.label}</p>
                        <p className="truncate text-sm font-medium text-slate-200">{s.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
              <p className="mt-5 text-xs text-slate-500">
                LinkedIn &amp; GitHub links are placeholders — replace with your profile URLs.
              </p>
            </div>
          </Reveal>

          {/* Right — form with animated border */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="glass-card glow-border shine-sweep relative overflow-hidden rounded-2xl p-6 sm:p-8">
              <div className="grid gap-5">
                <Field
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder="Your name"
                  type="text"
                />
                <Field
                  label="Email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="you@example.com"
                  type="email"
                />
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Message
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    className="glass-input w-full resize-none rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-accent-purple/30"
                    style={{
                      transitionProperty: 'border, box-shadow, background',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderImage = 'linear-gradient(135deg, #8B5CF6, #3B82F6, #06B6D4) 1';
                      e.target.style.boxShadow = '0 0 0 1px rgba(139,92,246,0.3), 0 0 16px rgba(139,92,246,0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderImage = '';
                      e.target.style.boxShadow = '';
                    }}
                  />
                </div>

                <MagneticButton strength={0.15}>
                  <motion.button
                    type="submit"
                    className="btn-primary w-full justify-center"
                    whileTap={{ scale: 0.97 }}
                    disabled={sent}
                  >
                    {sent ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" /> Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message <Send className="h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </MagneticButton>

                {sent && (
                  <motion.p
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm text-emerald-300"
                  >
                    Thanks! I'll get back to you soon. (Demo form — connect a backend to receive messages.)
                  </motion.p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</label>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="glass-input w-full rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:ring-2 focus:ring-accent-purple/30"
        onFocus={(e) => {
          e.target.style.borderImage = 'linear-gradient(135deg, #8B5CF6, #3B82F6, #06B6D4) 1';
          e.target.style.boxShadow = '0 0 0 1px rgba(139,92,246,0.3), 0 0 16px rgba(139,92,246,0.15)';
        }}
        onBlur={(e) => {
          e.target.style.borderImage = '';
          e.target.style.boxShadow = '';
        }}
      />
    </div>
  );
}
