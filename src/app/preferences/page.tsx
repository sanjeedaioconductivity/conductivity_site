import type { Metadata } from "next";
import { pageMeta } from "@/data/seo";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import PreferencesForm from "@/components/PreferencesForm";

export const metadata: Metadata = pageMeta("/preferences", "Communication Preferences & Data Requests", "Change what you receive from Conductivity, unsubscribe, or ask for a copy, correction or deletion of your information.", { noindex: true });

// Communication preferences and candidate data requests (blueprint §13.4).
export default function PreferencesPage() {
  return (
    <>
      <PageHero eyebrow="Your information" title="Communication Preferences & Data Requests">
        Change what you hear from us, or ask us to send, correct or delete the information you have shared.
      </PageHero>
      <section className="section !py-10 sm:!py-12">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <div className="space-y-3 text-sm text-ink-soft">
            <h2 className="text-xl font-bold text-ink">How requests are handled</h2>
            <p>Every request goes to our data protection contact and gets a reference number.</p>
            <p>To protect you, we confirm by email that the request came from you before we send, change or delete any information.</p>
            <p>Deleting your information removes you from our talent and marketing records, except where we must keep a record by law.</p>
            <p>See the <Link href="/legal/privacy" className="font-semibold text-spark-dark underline">Privacy Notice</Link> and <Link href="/legal/candidate-data" className="font-semibold text-spark-dark underline">Candidate Data information</Link> for details.</p>
          </div>
          <PreferencesForm />
        </div>
      </section>
    </>
  );
}
