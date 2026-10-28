import { motion } from "framer-motion";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-5 py-20 scroll-mt-16">
      <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold mb-10 grad-text inline-block">{title}</motion.h2>
      {children}
    </section>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay }}>{children}</motion.div>
  );
}

/** Glass card with 3D tilt on hover (skipped on touch devices) */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const move = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    setStyle({ transform: `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)` });
  };
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={() => setStyle({})}
      style={{ ...style, transition: "transform .15s ease-out" }} className={`glass p-6 ${className}`}>{children}</div>
  );
}
