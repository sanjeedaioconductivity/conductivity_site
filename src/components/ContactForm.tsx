"use client";
import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { serviceGroups } from "@/data/site";

// Front-end only. Wire onSubmit to an API route / email service before launch.
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSent(true); };

  // Red panel with square corners. On desktop it has extra left padding because the info cards overlap its left edge.
  const panel = "bg-spark p-6 text-white shadow-card ring-4 ring-white sm:p-10 lg:py-12 lg:pl-16 lg:pr-10";

  if (sent) {
    return (
      <div className={`${panel} text-center`} role="status">
        <CheckCircle2 className="mx-auto" size={44} />
        <h2 className="mt-3 text-2xl font-bold">Thank you — we&apos;ll be in touch.</h2>
        <p className="mt-1 text-sm text-white/90">Your inquiry has been noted.</p>
      </div>
    );
  }

  const L = ({ id, children }: { id: string; children: string }) => <label htmlFor={id} className="mb-1 block text-sm font-medium text-white">{children}</label>;
  // White square inputs, as in the design; the focus ring is white so it shows on red.
  const input = "input !rounded-none !border-transparent focus:!border-white focus:!ring-white/60";

  return (
    <form onSubmit={onSubmit} className={`${panel} grid gap-4 sm:grid-cols-2`}>
      <h2 className="text-center text-3xl font-bold tracking-tight sm:col-span-2 sm:text-4xl">Contact Us</h2>
      <div><L id="name">Name</L><input id="name" name="name" required className={input} autoComplete="name" placeholder="Enter your name" /></div>
      <div><L id="email">Email</L><input id="email" name="email" type="email" required className={input} autoComplete="email" placeholder="Enter a valid email address" /></div>
      <div><L id="phone">Phone</L><input id="phone" name="phone" type="tel" className={input} autoComplete="tel" /></div>
      <div><L id="org">Organization</L><input id="org" name="org" className={input} autoComplete="organization" /></div>
      <div className="sm:col-span-2">
        <L id="service">Service interested in</L>
        <select id="service" name="service" className={input} defaultValue="">
          <option value="" disabled>Select a service</option>
          {serviceGroups.map((s) => <option key={s.id}>{s.title}</option>)}
          <option>Sanjeeda</option><option>Events / Facilities</option><option>Other</option>
        </select>
      </div>
      <div className="sm:col-span-2"><L id="message">Message</L><textarea id="message" name="message" rows={5} required className={input} /></div>
      <div className="text-center sm:col-span-2">
        <button type="submit" className="border-2 border-white px-8 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-spark-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          Submit
        </button>
      </div>
    </form>
  );
}
