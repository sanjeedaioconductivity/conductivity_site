"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { CONSENT_KEY, contentGroup, track } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Google Analytics 4 with consent (blueprint §17.3, §16). Nothing loads, and no banner shows, until
 * NEXT_PUBLIC_GA_ID is set. Then analytics runs only after the visitor accepts.
 * Also records site-wide events: form starts, call-to-action clicks and page views grouped by audience.
 */
export default function Analytics() {
  const [consent, setConsent] = useState<string | null>("pending");
  const [ready, setReady] = useState(false);
  const path = usePathname();

  useEffect(() => {
    try { setConsent(localStorage.getItem(CONSENT_KEY)); } catch { setConsent(null); }
  }, []);

  // Page views, tagged with the audience the page serves (sent once GA has loaded, and on every page change).
  useEffect(() => {
    if (ready) track("page_view", { page_path: path, content_group: contentGroup(path) });
  }, [path, ready]);

  // Form starts (for completion rates) and clicks on the main calls to action.
  useEffect(() => {
    if (consent !== "granted") return;
    const started = new WeakSet<HTMLFormElement>();
    const onFocus = (e: FocusEvent) => {
      const form = (e.target as HTMLElement)?.closest?.("form[data-audience]") as HTMLFormElement | null;
      if (form && !started.has(form)) { started.add(form); track("form_start", { audience: form.dataset.audience, content_group: contentGroup(location.pathname) }); }
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a[href]") as HTMLAnchorElement | null;
      const href = a?.getAttribute("href") ?? "";
      if (/#(consultation|start|partner-form|diagnostic)$/.test(href)) track("cta_click", { cta: a?.innerText.trim().slice(0, 60), target: href, content_group: contentGroup(location.pathname) });
    };
    document.addEventListener("focusin", onFocus);
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("focusin", onFocus); document.removeEventListener("click", onClick); };
  }, [consent]);

  if (!GA_ID) return null;

  const choose = (value: "granted" | "denied") => {
    try { localStorage.setItem(CONSENT_KEY, value); } catch { /* storage blocked: ask again next visit */ }
    setConsent(value);
  };

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" onLoad={() => {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag() { window.dataLayer!.push(arguments); };
            window.gtag("js", new Date());
            window.gtag("config", GA_ID, { send_page_view: false, anonymize_ip: true });
            setReady(true);
          }} />
        </>
      )}
      {consent === null && (
        <div role="dialog" aria-label="Cookie preferences" className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink/10 sm:flex sm:items-center sm:gap-4">
          <p className="flex-1 text-sm text-ink-soft">
            We&apos;d like to use analytics cookies to understand how the site is used and improve it. No advertising cookies.{" "}
            <Link href="/legal/cookies" className="font-semibold text-spark-dark underline">Cookie Preferences</Link>
          </p>
          <div className="mt-3 flex gap-2 sm:mt-0">
            <button type="button" onClick={() => choose("denied")} className="btn-outline !px-4 !py-2">Decline</button>
            <button type="button" onClick={() => choose("granted")} className="btn-primary !px-4 !py-2">Accept</button>
          </div>
        </div>
      )}
    </>
  );
}
