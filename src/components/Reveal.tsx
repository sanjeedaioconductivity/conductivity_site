"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Marks its children as shown once scrolled into view; `.reveal` descendants then animate in (see globals.css). */
export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} data-shown={shown || undefined} className={className}>{children}</div>;
}
