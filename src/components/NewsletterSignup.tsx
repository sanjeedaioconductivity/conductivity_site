"use client";
import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";

/** Newsletter sign-up segmented by audience (blueprint §6, section 9). Front-end only for now. */
export default function NewsletterSignup() {
  const [sent, setSent] = useState(false);
  // TODO(launch): send to the email/CRM list for the chosen segment.
  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSent(true); };

  if (sent) return <p role="status" className="text-sm font-semibold text-spark-dark">Thanks — you&apos;re on the list.</p>;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="nl-email" className="mb-1 block text-sm font-medium">Email</label>
        <input id="nl-email" type="email" required autoComplete="email" className="input" placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="nl-segment" className="mb-1 block text-sm font-medium">I am</label>
        <select id="nl-segment" required defaultValue="" className="input sm:w-56">
          <option value="" disabled>Select…</option>
          <option>An employer / HR leader</option>
          <option>A student or professional</option>
          <option>An institution or partner</option>
        </select>
      </div>
      <button type="submit" className="btn-primary"><Mail size={16} aria-hidden /> Subscribe</button>
    </form>
  );
}
