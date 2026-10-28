import { useState } from "react";
import { Award, Briefcase, ExternalLink, Github, GraduationCap } from "lucide-react";
import { Reveal, Section, TiltCard } from "./ui";
import { certifications, education, experience, languages, profile, projects, skills } from "../data";

export function About() {
  return (
    <Section id="about" title="About me">
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Reveal><TiltCard><p className="text-muted leading-relaxed">{profile.about}</p></TiltCard></Reveal>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
          {profile.stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.1}><div className="glass p-4 text-center">
              <div className="font-display text-3xl font-bold grad-text">{s.n}</div><div className="text-muted text-sm">{s.l}</div>
            </div></Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function TimelineItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Reveal className="relative border-l-2 border-fuchsia1/50 pl-8 pb-2">
      <span className="absolute -left-[17px] top-0 grid h-8 w-8 place-items-center rounded-full grad-bg text-white">{icon}</span>
      <div className="glass p-6">{children}</div>
    </Reveal>
  );
}

export function Education() {
  return (
    <Section id="education" title="Education">
      <TimelineItem icon={<GraduationCap size={16} />}>
        <h3 className="font-display text-xl font-semibold">{education.degree}</h3>
        <p className="text-muted mt-1">{education.school}</p>
        <span className="chip mt-3 inline-block">{education.period}</span>
      </TimelineItem>
    </Section>
  );
}

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      {experience.map((e) => (
        <TimelineItem key={e.role} icon={<Briefcase size={16} />}>
          <h3 className="font-display text-xl font-semibold">{e.role}</h3>
          <p className="text-muted">{e.company}</p>
          <span className="chip mt-3 inline-block">{e.period}</span>
          <ul className="text-muted mt-4 list-disc space-y-2 pl-5">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
        </TimelineItem>
      ))}
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.05}><TiltCard className="h-full">
            <h3 className="font-display mb-3 text-lg font-semibold">{g.title}</h3>
            <div className="flex flex-wrap gap-2">{g.items.map((s) => <span key={s} className="chip">{s}</span>)}</div>
          </TiltCard></Reveal>
        ))}
      </div>
    </Section>
  );
}

const filters = ["All", "React", "Python", "PHP"] as const;
export function Projects() {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const list = projects.filter((p) => f === "All" || p.category === f);
  return (
    <Section id="projects" title="Projects">
      <div className="mb-8 flex flex-wrap gap-2" role="tablist">
        {filters.map((x) => (
          <button key={x} onClick={() => setF(x)} className={`rounded-full px-4 py-1.5 text-sm transition ${f === x ? "grad-bg text-white" : "chip"}`}>{x}</button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <TiltCard key={p.title} className="flex flex-col">
            <h3 className="font-display text-2xl font-bold grad-text">{p.title}</h3>
            <p className="mb-3 font-medium">{p.subtitle}</p>
            <p className="text-muted flex-1 text-sm leading-relaxed">{p.description}</p>
            <div className="my-4 flex flex-wrap gap-1.5">{p.tech.map((t) => <span key={t} className="chip !text-xs">{t}</span>)}</div>
            <div className="flex gap-3">
              <a href={p.live} className="btn grad-bg !px-4 !py-2 text-sm"><ExternalLink size={14} />Live Demo</a>
              <a href={p.github} className="btn btn-ghost !px-4 !py-2 text-sm"><Github size={14} />GitHub</a>
            </div>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
}

export function Certifications() {
  return (
    <Section id="certifications" title="Certifications & Languages">
      <div className="grid gap-5 md:grid-cols-2">
        {certifications.map((c) => (
          <Reveal key={c}><div className="glass flex items-center gap-4 p-5 shadow-[0_0_30px_-8px_#D946EF]">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full grad-bg text-white"><Award size={20} /></span>
            <p className="font-medium">{c}</p>
          </div></Reveal>
        ))}
      </div>
      <Reveal className="mt-8 flex flex-wrap gap-3">
        {languages.map((l, i) => (
          <span key={l} className="chip !px-5 !py-2 !text-base animate-pulse" style={{ animationDelay: `${i * 0.3}s`, animationDuration: "3s" }}>{l}</span>
        ))}
      </Reveal>
    </Section>
  );
}
