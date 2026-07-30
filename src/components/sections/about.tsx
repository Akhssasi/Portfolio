"use client";

import {
  Database,
  LayoutTemplate,
  ServerCog,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const PILLAR_ICONS = [LayoutTemplate, ServerCog, Database, ShieldCheck];

const TREE_LINES = [
  { text: "src/", cls: "text-cyan-500 dark:text-cyan-300", indent: 0 },
  { text: "├── controller/      # REST endpoints", cls: "text-slate-600 dark:text-slate-400", indent: 0 },
  { text: "├── service/         # business logic", cls: "text-slate-600 dark:text-slate-400", indent: 0 },
  { text: "├── repository/      # data access (JPA)", cls: "text-slate-600 dark:text-slate-400", indent: 0 },
  { text: "├── dto/             # request / response", cls: "text-slate-600 dark:text-slate-400", indent: 0 },
  { text: "├── entity/          # relational model", cls: "text-slate-600 dark:text-slate-400", indent: 0 },
  { text: "├── config/          # security · CORS", cls: "text-slate-600 dark:text-slate-400", indent: 0 },
  { text: "└── exception/       # global handling", cls: "text-slate-600 dark:text-slate-400", indent: 0 },
];

export function About() {
  const { t, tr } = useI18n();
  const pillars = tr<{ title: string; desc: string }[]>("about.pillars");

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker={t("about.kicker")}
          title={t("about.title")}
        />

        <div className="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:text-xl md:leading-relaxed">
                {t("about.lead")}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 leading-relaxed text-slate-600 dark:text-slate-400">
                {t("about.body")}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {pillars.map((pillar, i) => {
                const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];
                return (
                  <Reveal key={pillar.title} delay={0.08 * i}>
                    <div className="group h-full rounded-2xl border border-slate-200/90 bg-white/70 p-6 transition-all hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-cyan-400/30">
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-violet-500/15 text-cyan-600 transition-transform group-hover:scale-110 dark:text-cyan-300">
                        <Icon size={20} strokeWidth={1.8} />
                      </div>
                      <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {pillar.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white/70 dark:border-white/[0.08] dark:bg-[#0a0f1c]">
                <div className="flex items-center gap-2 border-b border-slate-200/80 px-4 py-3 dark:border-white/[0.07]">
                  <Terminal size={14} className="text-cyan-500 dark:text-cyan-400" />
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-500">
                    layered-architecture.txt
                  </span>
                </div>
                <div className="p-5 font-mono text-[12.5px] leading-[1.9]">
                  {TREE_LINES.map((line) => (
                    <p key={line.text} className={line.cls}>
                      {line.text}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/[0.07] to-violet-500/[0.07] p-6 dark:border-cyan-400/15">
                <div className="absolute -end-8 -top-8 h-28 w-28 rounded-full bg-cyan-400/20 blur-2xl dark:bg-cyan-400/10" />
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
                  {t("about.currentlyTitle")}
                </p>
                <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">
                  {t("about.currently")}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
