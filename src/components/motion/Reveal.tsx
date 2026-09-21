"use client";

import type { ReactNode } from "react";
import { domAnimation, LazyMotion, m } from "framer-motion";

type RevealProps = Readonly<{
  children: ReactNode;
  className?: string;
  delay?: number;
}>;

/** A small, reusable client boundary for low-cost one-time scroll reveals. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, delay, ease: "easeOut" }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
