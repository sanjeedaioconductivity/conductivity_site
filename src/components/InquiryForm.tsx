"use client";
import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Construction } from "lucide-react";
import { careerStages, partnerTypes } from "@/data/blueprint";
import { submitForm } from "@/lib/submitForm";

type Kind = "employer" | "talent" | "partner";

// Why each form collects information (blueprint §16 Consent and Confidentiality).
const whyWeAsk: Record<Kind, string> = {
  employer: "So the right consultant can understand your requirement and prepare a relevant response. Your requirement stays confidential.",
  talent: "So we can understand your career stage and suggest a sensible next step. We never share your profile with an employer without your permission.",
  partner: "So our partnerships team can assess the idea and propose a first meeting. Details stay within Conductivity.",
};

const copy: Record<Kind, { submit: string; thanks: string; next: string }> = {
  employer: { submit: "Request a Talent Pipeline Consultation", thanks: "Thank you — your requirement has been received.", next: "A member of our business development team will contact you to arrange a discovery conversation." },
  talent: { submit: "Start Your Career Readiness Journey", thanks: "Thank you — welcome to Conductivity.", next: "We'll review what you shared and suggest a sensible next step. Registering does not guarantee employment; it starts a conversation about your readiness." },
  partner: { submit: "Build a Talent Partnership", thanks: "Thank you — your partnership idea has been received.", next: "Our team will review the objective you described and propose an initial meeting." },
};

function Field({ id, label, required, children, wide }: { id: string; label: string; required?: boolean; children: ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-0.5 block text-xs font-medium text-ink-soft">{label}{required && <span className="text-spark-dark"> *</span>}</label>
      {children}
    </div>
  );
}

/** Employer, talent and partner inquiry forms (blueprint §7.1, §8.2, §9). Submissions go to /api/inquiry, which routes them to the CRM (§13). */
export default function InquiryForm({ kind, interest = "" }: { kind: Kind; interest?: string }) {
  const [sent, setSent] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true); setError("");
    const r = await submitForm(kind, e.currentTarget);
    setBusy(false);
    if (r.ok) setSent(r.reference); else setError(r.error);
  };
  const c = copy[kind];
  const id = (n: string) => `${kind}-${n}`;
  const text = (n: string, label: string, opts: { required?: boolean; type?: string; auto?: string; wide?: boolean } = {}) => (
    <Field id={id(n)} label={label} required={opts.required} wide={opts.wide}>
      <input id={id(n)} name={n} type={opts.type ?? "text"} required={opts.required} autoComplete={opts.auto} className="input !py-1.5 text-sm" />
    </Field>
  );
  const area = (n: string, label: string, required = false, rows = 2) => (
    <Field id={id(n)} label={label} required={required} wide>
      <textarea id={id(n)} name={n} rows={rows} required={required} className="input !py-1.5 text-sm" />
    </Field>
  );
  const select = (n: string, label: string, options: string[], required = false, initial = "") => (
    <Field id={id(n)} label={label} required={required}>
      <select id={id(n)} name={n} required={required} defaultValue={initial} className="input !py-1.5 text-sm">
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </Field>
  );

  if (sent) {
    return (
      <div className="card text-center" role="status">
        <CheckCircle2 className="mx-auto text-spark" size={44} aria-hidden />
        <h3 className="mt-3 text-xl font-bold">{c.thanks}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-mute">{c.next}</p>
        <p className="mt-3 text-xs text-ink-mute">Your reference: <span className="font-semibold text-ink">{sent}</span></p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} data-audience={kind} className="card grid gap-x-4 gap-y-3 !p-5 sm:grid-cols-2">
      <p className="flex items-start gap-2 rounded-lg border border-dashed border-amber-400 bg-amber-50 px-3 py-1.5 text-[11px] text-amber-900 sm:col-span-2">
        <Construction size={14} aria-hidden className="mt-0.5 shrink-0" />
        <span><strong>Placeholder:</strong> the CRM is not connected yet, so submissions are received but not stored.</span>
      </p>

      {kind === "employer" && <>
        {text("name", "Full name", { required: true, auto: "name" })}
        {text("organization", "Organization", { required: true, auto: "organization" })}
        {text("designation", "Designation", { auto: "organization-title" })}
        {text("email", "Work email", { required: true, type: "email", auto: "email" })}
        {text("phone", "Phone", { type: "tel", auto: "tel" })}
        {text("industry", "Industry")}
        {text("country", "Country", { auto: "country-name" })}
        {select("interest", "What would you like to discuss?", ["Talent Pipeline Diagnostic", "Recruitment / talent acquisition", "Workforce & HR advisory", "Learning & capability development", "Global talent access", "Not sure yet"], false, interest)}
        {area("requirement", "Talent requirement", true)}
        {text("scale", "Number of positions or scale")}
        {select("timeline", "Expected timeline", ["Immediately", "Within 1–3 months", "Within 3–6 months", "6 months or later", "Exploring for now"])}
        {area("context", "Additional context")}
      </>}

      {kind === "talent" && <>
        <fieldset className="sm:col-span-2">
          <legend className="mb-2 text-sm font-medium">Where are you in your career?<span className="text-spark-dark"> *</span></legend>
          <div className="flex flex-wrap gap-2">
            {careerStages.map((s, i) => (
              <label key={s} className="cursor-pointer">
                <input type="radio" name="stage" value={s} required={i === 0} className="peer sr-only" />
                <span className="inline-block rounded-full border border-ink/15 px-4 py-2 text-sm transition peer-checked:border-spark peer-checked:bg-spark peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-spark/40">{s}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {text("name", "Full name", { required: true, auto: "name" })}
        {text("email", "Email", { required: true, type: "email", auto: "email" })}
        {text("phone", "Phone", { type: "tel", auto: "tel" })}
        {select("education", "Highest education", ["School / O-Level / Matric", "College / A-Level / Intermediate", "Undergraduate (in progress)", "Bachelor's degree", "Master's degree or higher", "Professional qualification", "Other"])}
        {select("support", "What support are you looking for?", ["Career intelligence & counselling", "Assessments & profiling", "Readiness & development", "Mentorship", "Opportunities", "Not sure yet"], false, interest)}
        {text("interests", "Fields or roles that interest you")}
        {area("aspirations", "What would you like to achieve in the next year or two?")}
        <label className="flex items-start gap-2 text-xs text-ink-soft sm:col-span-2">
          <input type="checkbox" name="updates" className="mt-1" /> Send me relevant programs, resources and opportunities (optional).
        </label>
      </>}

      {kind === "partner" && <>
        {text("name", "Full name", { required: true, auto: "name" })}
        {text("organization", "Organization / institution", { required: true, auto: "organization" })}
        {text("email", "Email", { required: true, type: "email", auto: "email" })}
        {select("type", "Type of partner", [...partnerTypes.map((p) => p.title), "Other"], false, interest)}
        {area("objective", "Partnership objective", true)}
        {text("target", "Target group (e.g. final-year students, finance professionals)", { wide: true })}
        {area("outcomes", "Expected outcomes")}
        {area("contribution", "What would your organization contribute?")}
      </>}

      {/* Why we ask (blueprint §16 Consent): plain purpose statement next to the consent box. */}
      <p className="rounded-lg bg-paper px-3 py-2 text-xs text-ink-soft sm:col-span-2"><strong className="text-ink">Why we ask:</strong> {whyWeAsk[kind]} <Link href="/trust" className="underline hover:text-spark-dark">How we protect your information</Link></p>
      <label className="flex items-start gap-2 text-xs text-ink-soft sm:col-span-2">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>I agree that Conductivity may use this information to respond to my inquiry, as described in the <Link href="/legal/privacy" className="underline hover:text-spark-dark">Privacy Notice</Link>{kind === "talent" && <> and <Link href="/legal/candidate-data" className="underline hover:text-spark-dark">Candidate Data information</Link></>}.<span className="text-spark-dark"> *</span></span>
      </label>

      <div className="sm:col-span-2">
        {error && <p role="alert" className="mb-2 text-xs font-semibold text-spark-dark">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary !py-2 disabled:opacity-60">{busy ? "Sending…" : c.submit}</button>
      </div>
    </form>
  );
}
