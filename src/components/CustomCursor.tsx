import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type CursorVariant = 'default' | 'button' | 'link' | 'view';

export default function CustomCursor() {
  const reduce = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [visible, setVisible] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (reduce || window.matchMedia('(pointer: coarse)').matches) {
      setSupported(false);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);

      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="view"]')) {
        setVariant('view');
      } else if (target.closest('button, a, [role="button"]')) {
        setVariant('button');
      } else if (target.closest('[data-cursor="link"]')) {
        setVariant('link');
      } else {
        setVariant('default');
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    const onLeave = () => setVisible(false);

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMove);
    document.body.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [reduce]);

  if (!supported || reduce) return null;

  const ringSize =
    variant === 'button' ? 56 : variant === 'view' ? 64 : variant === 'link' ? 40 : 32;
  const ringOpacity = visible ? 1 : 0;

  return (
    <>
      {/* Center dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
          boxShadow: '0 0 6px rgba(139,92,246,0.6)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border transition-[width,height,opacity,background] duration-300 ease-out"
        style={{
          width: ringSize,
          height: ringSize,
          borderColor: variant === 'view' ? 'rgba(6,182,212,0.6)' : 'rgba(139,92,246,0.4)',
          opacity: ringOpacity,
          background: variant === 'view' ? 'rgba(6,182,212,0.08)' : 'transparent',
          backdropFilter: variant === 'view' ? 'blur(2px)' : undefined,
        }}
      >
        {variant === 'view' && (
          <span className="text-[0.6rem] font-bold uppercase tracking-wider text-accent-cyan">
            View
          </span>
        )}
      </div>
    </>
  );
}
