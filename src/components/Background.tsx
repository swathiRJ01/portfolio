import { useEffect, useRef } from "react";

interface Star { x: number; y: number; r: number; a: number; tw: number; layer: number; }
interface Shoot { x: number; y: number; vx: number; vy: number; life: number; }

// Deep night sky: nebula glow (CSS) + twinkling stars with parallax + rare shooting stars (canvas)
const SKY =
  "radial-gradient(ellipse at 20% 20%, rgba(124,58,237,.32), transparent 55%)," +
  "radial-gradient(ellipse at 85% 40%, rgba(217,70,239,.18), transparent 50%)," +
  "radial-gradient(ellipse at 50% 115%, rgba(6,182,212,.28), transparent 55%)," +
  "linear-gradient(#05050d, #0B0B1A 60%, #140c2b)";

export default function Background({ light }: { light: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (light || !canvas) return;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, mx = 0;
    let stars: Star[] = [];
    const shoots: Shoot[] = [];

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(450, Math.floor((w * h) / 4500));
      stars = Array.from({ length: count }, () => {
        const layer = Math.floor(Math.random() * 3);
        return { x: Math.random() * w, y: Math.random() * h, r: 0.4 + layer * 0.45 + Math.random() * 0.4, a: 0.4 + Math.random() * 0.6, tw: Math.random() * 6.28, layer };
      });
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const sy = window.scrollY;
      for (const s of stars) {
        const k = (s.layer + 1) * 0.03;
        const y = (((s.y - sy * k) % h) + h) % h;
        const x = s.x + mx * (s.layer + 1) * 6;
        ctx.globalAlpha = s.a * (0.6 + 0.4 * Math.sin(t / 900 + s.tw));
        ctx.fillStyle = s.layer === 2 ? "#d9c7ff" : "#ffffff";
        ctx.beginPath(); ctx.arc(x, y, s.r, 0, 6.283); ctx.fill();
      }
      if (!reduce && shoots.length === 0 && Math.random() < 0.004)
        shoots.push({ x: Math.random() * w * 0.8, y: Math.random() * h * 0.4, vx: 10, vy: 4, life: 1 });
      for (let i = shoots.length - 1; i >= 0; i--) {
        const s = shoots[i];
        const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 8, s.y - s.vy * 8);
        g.addColorStop(0, `rgba(255,255,255,${s.life})`); g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 8, s.y - s.vy * 8); ctx.stroke();
        s.x += s.vx; s.y += s.vy; s.life -= 0.02;
        if (s.life <= 0) shoots.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => { mx = e.clientX / w - 0.5; };
    setup();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", setup);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setup);
      window.removeEventListener("mousemove", onMove);
    };
  }, [light]);

  if (light) return null;
  return (
    <>
      <div aria-hidden className="fixed inset-0 -z-10" style={{ background: SKY }} />
      <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />
    </>
  );
}
