import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp, Moon, Sun } from "lucide-react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 origin-left grad-bg z-[60]" />;
}

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -300, y: -300 });
  const [enabled] = useState(() => window.matchMedia("(pointer: fine)").matches);
  useEffect(() => {
    if (!enabled) return;
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [enabled]);
  if (!enabled) return null;
  return <div aria-hidden className="pointer-events-none fixed z-[5] h-72 w-72 rounded-full opacity-25 blur-3xl"
    style={{ left: pos.x - 144, top: pos.y - 144, background: "radial-gradient(circle,#D946EF,#06B6D4 60%,transparent)", transition: "left .12s, top .12s" }} />;
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return show ? (
    <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0 })}
      className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full grad-bg text-white shadow-lg hover:scale-110 transition"><ArrowUp size={20} /></button>
  ) : null;
}

const links = ["about", "education", "experience", "skills", "projects", "certifications", "contact"];

export function Navbar({ light, toggle }: { light: boolean; toggle: () => void }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((l) => { const el = document.getElementById(l); el && obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <header className="fixed top-1 inset-x-0 z-50 px-3">
      <nav className="glass mx-auto mt-2 flex max-w-6xl items-center justify-between !rounded-full px-5 py-2.5">
        <a href="#top" className="font-display text-xl font-bold grad-text">SRJ</a>
        <ul className="hidden md:flex gap-1">
          {links.map((l) => (
            <li key={l}><a href={`#${l}`} className={`rounded-full px-3 py-1.5 text-sm capitalize transition ${active === l ? "grad-bg text-white" : "text-muted hover:text-[var(--fg)]"}`}>{l}</a></li>
          ))}
        </ul>
        <button onClick={toggle} aria-label="Toggle theme" className="grid h-9 w-9 place-items-center rounded-full chip">{light ? <Moon size={16} /> : <Sun size={16} />}</button>
      </nav>
    </header>
  );
}
