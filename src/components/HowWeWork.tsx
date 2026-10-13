import { ClipboardCheck, Ear, Handshake, PackageCheck, Sprout, type LucideIcon } from "lucide-react";
import { howWeWork } from "@/data/site";

/** One icon per step, in the same order as howWeWork in data/site.ts. */
const stepIcons: LucideIcon[] = [Ear, ClipboardCheck, Sprout, Handshake, PackageCheck];

/** Five connected steps. A horizontal line joins them on desktop, a vertical one on phones. */
export default function HowWeWork({ id, eyebrow = "How we work", tint = false }: { id?: string; eyebrow?: string; tint?: boolean }) {
  return (
    <section id={id} className={`scroll-mt-16 py-12 sm:py-16 ${tint ? "bg-paper" : ""}`}>
      <div className="container-x">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Five steps from listening to results</h2>
        </div>

        <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
          {/* connecting line: runs through the centres of the circles */}
          <span aria-hidden className="absolute bottom-6 left-7 top-6 w-0.5 bg-gradient-to-b from-spark to-spark/20 md:hidden" />
          <span aria-hidden className="absolute left-[10%] right-[10%] top-7 hidden h-0.5 bg-gradient-to-r from-spark/20 via-spark to-spark/20 md:block" />

          {howWeWork.map((h, i) => {
            const Icon = stepIcons[i] ?? PackageCheck;
            return (
              <li key={h.step} className="group relative flex gap-4 md:flex-col md:items-center md:gap-0 md:text-center">
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-spark text-white shadow-card ring-4 ring-white transition duration-200 group-hover:-translate-y-1 group-hover:scale-110 group-hover:bg-white group-hover:text-spark group-hover:ring-spark">
                  <Icon size={24} strokeWidth={1.8} />
                  <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-ink text-[10px] font-bold text-white">{i + 1}</span>
                </span>
                <div className="md:mt-4">
                  <h3 className="text-lg font-bold">{h.step}</h3>
                  <p className="mt-1 text-sm text-ink-mute md:mx-auto md:max-w-[12rem]">{h.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
