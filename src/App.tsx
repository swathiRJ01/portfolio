import { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { BackToTop, CursorGlow, Navbar, ScrollProgress } from "./components/Effects";
import Hero from "./components/Hero";
import { About, Certifications, Education, Experience, Projects, Skills } from "./components/Sections";
import Contact from "./components/Contact";
import { profile } from "./data";

export default function App() {
  const [light, setLight] = useState(false); // kept in state only
  useEffect(() => { document.documentElement.classList.toggle("light", light); }, [light]);
  return (
    <>
      <ScrollProgress /><CursorGlow />
      <Navbar light={light} toggle={() => setLight((l) => !l)} />
      <main>
        <Hero /><About /><Education /><Experience /><Skills /><Projects /><Certifications /><Contact />
      </main>
      <footer className="border-t px-5 py-8 text-center" style={{ borderColor: "var(--edge)" }}>
        <div className="mb-3 flex justify-center gap-3">
          {[[Github, profile.github, "GitHub"], [Linkedin, profile.linkedin, "LinkedIn"], [Mail, `mailto:${profile.email}`, "Email"]].map(([Icon, href, l]: any) => (
            <a key={l} href={href} aria-label={l} className="chip grid h-10 w-10 place-items-center"><Icon size={16} /></a>
          ))}
        </div>
        <p className="text-muted text-sm">Designed & built by Swathi R J · {new Date().getFullYear()}</p>
      </footer>
      <BackToTop />
    </>
  );
}
