import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { profile } from "../data";

function useTyping(words: string[]) {
  const [i, setI] = useState(0), [text, setText] = useState(""), [del, setDel] = useState(false);
  useEffect(() => {
    const full = words[i];
    const t = setTimeout(() => {
      if (!del) { setText(full.slice(0, text.length + 1)); if (text.length + 1 === full.length) setTimeout(() => setDel(true), 1200); }
      else { setText(full.slice(0, text.length - 1)); if (text.length - 1 === 0) { setDel(false); setI((i + 1) % words.length); } }
    }, del ? 40 : 80);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return text;
}

export default function Hero() {
  const typed = useTyping(profile.roles);
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-5 pt-24">
      <div className="blob h-96 w-96 bg-violet1 -top-20 -left-20" />
      <div className="blob h-96 w-96 bg-fuchsia1 top-1/3 right-0" style={{ animationDelay: "-5s" }} />
      <div className="blob h-80 w-80 bg-cyan1 bottom-0 left-1/3" style={{ animationDelay: "-9s" }} />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-muted mb-3">Hi, I'm</p>
          <h1 className="font-display text-5xl font-bold leading-tight md:text-7xl grad-text">{profile.name}</h1>
          <p className="font-display mt-4 h-9 text-2xl md:text-3xl">{typed}<span className="animate-pulse">|</span></p>
          <p className="text-muted mt-4 max-w-lg">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn grad-bg">View Projects</a>
            <a href={profile.resume} download className="btn btn-ghost"><Download size={16} />Download Resume</a>
            <a href="#contact" className="btn btn-ghost">Contact Me</a>
          </div>
          <div className="mt-8 flex gap-3">
            {[[Github, profile.github, "GitHub"], [Linkedin, profile.linkedin, "LinkedIn"], [Mail, `mailto:${profile.email}`, "Email"]].map(([Icon, href, label]: any) => (
              <a key={label} href={href} aria-label={label} className="chip grid h-11 w-11 place-items-center hover:-translate-y-1 transition"><Icon size={18} /></a>
            ))}
          </div>
        </div>
        <div className="mx-auto">
          <div className="relative h-64 w-64 md:h-72 md:w-72">
            <div className="absolute inset-0 rounded-full animate-spin360 grad-bg" />
            <div className="absolute inset-1.5 grid place-items-center overflow-hidden rounded-full" style={{ background: "var(--bg)" }}>
              {/* Replace with: <img src="/profile.jpg" alt="Swathi R J" className="h-full w-full object-cover" /> */}
              <span className="font-display text-7xl font-bold grad-text">SRJ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
