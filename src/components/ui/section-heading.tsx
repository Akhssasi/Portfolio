"use client";

import { motion } from "motion/react";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ kicker, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-14 max-w-3xl md:mb-20">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-4 font-mono text-sm tracking-wider text-cyan-500 dark:text-cyan-400"
      >
        {kicker}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
