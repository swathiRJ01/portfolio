import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import { Section } from "./ui";
import { profile } from "../data";

// TODO: create a free form at formspree.io and paste your endpoint here
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function Contact() {
  const [v, setV] = useState({ name: "", email: "", message: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (v.name.trim().length < 2) er.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(v.email)) er.email = "Enter a valid email address.";
    if (v.message.trim().length < 10) er.message = "Write at least 10 characters.";
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    try {
      if (!FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")) {
        const r = await fetch(FORMSPREE_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(v) });
        if (!r.ok) throw new Error();
      }
      setDone(true); setV({ name: "", email: "", message: "" });
    } catch { setErr({ message: "Could not send. Email me directly instead." }); }
    setBusy(false);
  };

  const field = "w-full rounded-xl bg-transparent border px-4 py-3 outline-none focus:border-fuchsia1 transition";
  return (
    <Section id="contact" title="Contact">
      <div className="grid gap-8 md:grid-cols-2">
        <form onSubmit={submit} noValidate className="glass relative space-y-4 p-6">
          {(["name", "email", "message"] as const).map((k) => (
            <div key={k}>
              <label htmlFor={k} className="mb-1 block text-sm capitalize">{k}</label>
              {k === "message"
                ? <textarea id={k} rows={5} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} className={field} style={{ borderColor: "var(--edge)" }} />
                : <input id={k} type={k === "email" ? "email" : "text"} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} className={field} style={{ borderColor: "var(--edge)" }} />}
              {err[k] && <p role="alert" className="mt-1 text-sm text-red-400">{err[k]}</p>}
            </div>
          ))}
          <button disabled={busy} className="btn grad-bg"><Send size={16} />{busy ? "Sending…" : "Send message"}</button>
          <AnimatePresence>
            {done && (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="glass absolute inset-0 z-10 grid place-items-center text-center" onClick={() => setDone(false)}>
                <div><motion.div initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring" }}><CheckCircle2 size={56} className="mx-auto text-cyan1" /></motion.div>
                  <p className="font-display mt-3 text-xl font-semibold">Message sent</p><p className="text-muted text-sm">Click to close</p></div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
        <div className="space-y-4">
          {[[Phone, profile.phone, `tel:${profile.phone.replace(/\s/g, "")}`], [Mail, profile.email, `mailto:${profile.email}`], [Linkedin, "LinkedIn", profile.linkedin], [Github, "GitHub", profile.github]].map(([Icon, label, href]: any) => (
            <a key={label} href={href} className="glass flex items-center gap-4 p-4 transition hover:-translate-y-1">
              <span className="grid h-10 w-10 place-items-center rounded-full grad-bg text-white"><Icon size={18} /></span>{label}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
