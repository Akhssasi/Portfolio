"use client";

import { Briefcase } from "lucide-react";
import type { Experience } from "@/db/schema";
import { tx } from "@/lib/localize";
import { useI18n } from "@/components/providers/i18n-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Experience({ entries }: { entries: Experience[] }) {
  const { t, locale } = useI18n();

  if (!entries.length) return null;

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker={t("experience.kicker")}
          title={t("experience.title")}
          subtitle={t("experience.subtitle")}
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div
            aria-hidden
            className="absolute inset-y-2 start-[15px] w-px bg-gradient-to-b from-cyan-500/60 via-violet-500/40 to-transparent md:start-[19px]"
          />

          <ol className="space-y-10">
            {entries.map((entry, i) => (
              <li key={entry.id} className="relative ps-14 md:ps-16">
                {/* Node */}
                <span className="absolute start-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-500/40 bg-white shadow-lg shadow-cyan-500/10 md:h-10 md:w-10 dark:border-cyan-400/30 dark:bg-[#0a0f1c]">
                  <Briefcase size={14} className="text-cyan-500 dark:text-cyan-400" />
                </span>

                <Reveal delay={0.06 * i}>
                  <article className="rounded-2xl border border-slate-200/90 bg-white/70 p-6 transition-all hover:-translate-y-0.5 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 md:p-7 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-cyan-400/30">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                          {tx(entry.translations, locale, "role", entry.role)}
                        </h3>
                        <p className="mt-0.5 text-sm font-medium text-cyan-600 dark:text-cyan-400">
                          {entry.company}
                        </p>
                      </div>
                      <span className="rounded-full border border-slate-300/70 bg-slate-100/80 px-3.5 py-1 font-mono text-[11px] text-slate-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-400">
                        {entry.period}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {tx(entry.translations, locale, "description", entry.description)}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {entry.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-slate-100 px-3 py-1 font-mono text-[11px] text-slate-600 dark:bg-white/[0.05] dark:text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
