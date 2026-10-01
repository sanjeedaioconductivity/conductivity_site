"use client";
import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { serviceGroups } from "@/data/site";

// Front-end only. Wire onSubmit to an API route / email service before launch.
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSent(true); };

  if (sent) {
    return (
      <div className="card text-center" role="status">
        <CheckCircle2 className="mx-auto text-spark-dark" size={40} />
        <h3 className="mt-3 text-xl font-semibold">Thank you — we&apos;ll be in touch.</h3>
        <p className="mt-1 text-sm text-ink-mute">Your inquiry has been noted.</p>
      </div>
    );
  }
  const L = ({ id, children }: { id: string; children: string }) => <label htmlFor={id} className="mb-1 block text-sm font-medium">{children}</label>;
  return (
    <form onSubmit={onSubmit} className="card grid gap-4 sm:grid-cols-2">
      <div><L id="name">Name</L><input id="name" name="name" required className="input" autoComplete="name" /></div>
      <div><L id="email">Email</L><input id="email" name="email" type="email" required className="input" autoComplete="email" /></div>
      <div><L id="phone">Phone</L><input id="phone" name="phone" type="tel" className="input" autoComplete="tel" /></div>
      <div><L id="org">Organization</L><input id="org" name="org" className="input" autoComplete="organization" /></div>
      <div className="sm:col-span-2">
        <L id="service">Service interested in</L>
        <select id="service" name="service" className="input" defaultValue="">
          <option value="" disabled>Select a service</option>
          {serviceGroups.map((s) => <option key={s.id}>{s.title}</option>)}
          <option>Sanjeeda</option><option>Events / Facilities</option><option>Other</option>
        </select>
      </div>
      <div className="sm:col-span-2"><L id="message">Message</L><textarea id="message" name="message" rows={5} required className="input" /></div>
      <div className="sm:col-span-2"><button className="btn-primary" type="submit">Send inquiry</button></div>
    </form>
  );
}
