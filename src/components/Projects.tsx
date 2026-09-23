import { useState } from 'react';
import { projects, type Project } from '@/data/portfolio';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading tag="Projects" title="Things I've built" />

        <Reveal>
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onOpen={() => setSelected(p)} />
            ))}
          </div>
        </Reveal>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
