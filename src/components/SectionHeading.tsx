import { motion, useReducedMotion } from 'framer-motion';

export default function SectionHeading({
  tag,
  title,
  subtitle,
  center = true,
}: {
  tag?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {tag && (
        <motion.span
          className="section-tag"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {tag}
        </motion.span>
      )}
      <motion.h2
        className="section-heading text-balance"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <span className="gradient-text">{title}</span>
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-4 text-slate-400 text-balance"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
