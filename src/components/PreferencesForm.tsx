"use client";
import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitForm } from "@/lib/submitForm";

// Communication preferences and data requests (blueprint §13.4). Routed to Data Protection in the CRM.
const requests = [
  { id: "update", label: "Change what I receive" },
  { id: "unsubscribe", label: "Unsubscribe me from all marketing emails" },
  { id: "copy", label: "Send me a copy of my information" },
  { id: "correct", label: "Correct my information" },
  { id: "delete", label: "Delete my information" },
];
const segments = ["Employer and HR insights", "Career readiness and opportunities", "Programs and partnership updates"];

export default function PreferencesForm() {
  const [request, setRequest] = useState("update");
  const [sent, setSent] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true); setError("");
    const r = await submitForm("preferences", e.currentTarget);
    setBusy(false);
    if (r.ok) setSent(r.reference); else setError(r.error);
  };

  if (sent) {
    return (
      <div className="card text-center" role="status">
        <CheckCircle2 className="mx-auto text-spark" size={44} aria-hidden />
        <h2 className="mt-3 text-xl font-bold">Your request has been received</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-mute">We&apos;ll confirm by email before we change, send or delete anything.</p>
        <p className="mt-3 text-xs text-ink-mute">Your reference: <span className="font-semibold text-ink">{sent}</span></p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} data-audience="preferences" className="card grid gap-4 !p-5">
      <div>
        <label htmlFor="pref-email" className="mb-0.5 block text-xs font-medium text-ink-soft">Email you used with us<span className="text-spark-dark"> *</span></label>
        <input id="pref-email" name="email" type="email" required autoComplete="email" className="input !py-1.5 text-sm" />
      </div>
      <fieldset>
        <legend className="mb-1.5 text-xs font-medium text-ink-soft">What would you like to do?</legend>
        <div className="grid gap-1.5">
          {requests.map((r) => (
            <label key={r.id} className="flex items-center gap-2 text-sm">
              <input type="radio" name="request" value={r.id} checked={request === r.id} onChange={() => setRequest(r.id)} /> {r.label}
            </label>
          ))}
        </div>
      </fieldset>
      {request === "update" && (
        <fieldset>
          <legend className="mb-1.5 text-xs font-medium text-ink-soft">Send me</legend>
          <div className="grid gap-1.5">
            {segments.map((s) => (
              <label key={s} className="flex items-center gap-2 text-sm"><input type="checkbox" name="segments" value={s} /> {s}</label>
            ))}
          </div>
        </fieldset>
      )}
      <div>
        <label htmlFor="pref-details" className="mb-0.5 block text-xs font-medium text-ink-soft">Anything else we should know?</label>
        <textarea id="pref-details" name="details" rows={2} className="input !py-1.5 text-sm" />
      </div>
      {error && <p role="alert" className="text-xs font-semibold text-spark-dark">{error}</p>}
      <div><button type="submit" disabled={busy} className="btn-primary !py-2 disabled:opacity-60">{busy ? "Sending…" : "Send request"}</button></div>
    </form>
  );
}
