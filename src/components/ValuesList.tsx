import { Handshake, SearchCheck, ShieldCheck, Sprout, Users, Wrench, type LucideIcon } from "lucide-react";
import { values } from "@/data/site";

/** One icon per value, in the same order as `values` in data/site.ts. */
const valueIcons: LucideIcon[] = [Users, SearchCheck, ShieldCheck, Handshake, Sprout, Wrench];

/** About page "Values": a heading on the left and the six principles on the right as an open list, with no boxes. */
export default function ValuesList() {
  return (
    <section id="values" className="scroll-mt-16 py-12 sm:py-16">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Values</p>
          <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            The principles that <span className="text-spark">guide us</span>
          </h2>
          <span aria-hidden className="mt-5 block h-1 w-16 bg-spark" />
        </div>

        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {values.map((v, i) => {
            const Icon = valueIcons[i] ?? Users;
            return (
              <li key={v.title} className="group flex gap-4 border-t border-ink/10 pt-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-spark-light text-spark-dark transition duration-200 group-hover:bg-spark group-hover:text-white">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="text-lg font-bold">{v.title}</h3>
                  <p className="mt-1 text-sm text-ink-mute">{v.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
