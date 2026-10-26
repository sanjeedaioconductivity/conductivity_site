"use client";
import { useState, type FormEvent } from "react";
import { Building2, CheckCircle2, Landmark, Mail, UserRound } from "lucide-react";
import { submitForm } from "@/lib/submitForm";

// Segments for the newsletter (blueprint §6, section 9): each reader gets content for their side of talent.
const segments = [
  { id: "employer", label: "Employer / HR leader", gets: "Workforce intelligence, hiring and HR insights", Icon: Building2 },
  { id: "talent", label: "Student / professional", gets: "Career readiness guidance and new opportunities", Icon: UserRound },
  { id: "partner", label: "Institution / partner", gets: "Programs, research and partnership updates", Icon: Landmark },
];

/** Segmented newsletter sign-up for a dark (brand blue) panel. Sends to /api/inquiry with the chosen segment (§13). */
export default function NewsletterSignup() {
  const [segment, setSegment] = useState(segments[0].id);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = await submitForm("newsletter", e.currentTarget);
    if (r.ok) setSent(true); else setError(r.error);
  };
  const current = segments.find((s) => s.id === segment)!;

  if (sent) {
    return (
      <p role="status" className="flex items-center gap-2 rounded-2xl bg-white/10 p-5 font-semibold">
        <CheckCircle2 aria-hidden /> Thanks — you&apos;re on the {current.label.toLowerCase()} list.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} data-audience="newsletter">
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-white/80">I am</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {segments.map((s) => (
            <label key={s.id} className="cursor-pointer">
              <input type="radio" name="segment" value={s.id} checked={segment === s.id} onChange={() => setSegment(s.id)} className="peer sr-only" />
              <span className="flex items-center gap-2.5 rounded-xl bg-white/10 px-3.5 py-3 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/15 peer-checked:bg-white peer-checked:text-volt peer-checked:ring-white peer-focus-visible:ring-2 peer-focus-visible:ring-spark">
                <s.Icon size={18} aria-hidden className="shrink-0" /> {s.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <p className="mt-3 text-sm text-white/75">You&apos;ll receive: <span className="font-semibold text-white">{current.gets}</span></p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="nl-email" className="sr-only">Email</label>
        <input id="nl-email" name="email" type="email" required autoComplete="email" placeholder="Your email address"
          className="w-full flex-1 rounded-full border-0 bg-white px-5 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-spark" />
        <button type="submit" className="btn-primary !py-3"><Mail size={16} aria-hidden /> Subscribe</button>
      </div>
      {error && <p role="alert" className="mt-2 text-sm font-semibold text-white">{error}</p>}
    </form>
  );
}
