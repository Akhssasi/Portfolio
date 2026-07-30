"use client";

import { motion } from "motion/react";
import {
  Database,
  MonitorSmartphone,
  ServerCog,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Skill } from "@/db/schema";
import { useI18n } from "@/components/providers/i18n-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechIcon } from "@/components/ui/tech-icon";
import { Reveal } from "@/components/ui/reveal";

const CATEGORY_META: Record<string, { icon: LucideIcon; index: string }> = {
  frontend: { icon: MonitorSmartphone, index: "01" },
  backend: { icon: ServerCog, index: "02" },
  database: { icon: Database, index: "03" },
  tools: { icon: Wrench, index: "04" },
};
const CATEGORY_ORDER = ["frontend", "backend", "database", "tools"];

export function Skills({ skills }: { skills: Skill[] }) {
  const { t } = useI18n();

  if (!skills.length) return null;

  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: skills.filter((s) => s.category === category),
  })).filter((g) => g.items.length);

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker={t("skills.kicker")}
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
        />

        <div className="grid gap-5 md:grid-cols-2">
          {grouped.map(({ category, items }, gi) => {
            const meta = CATEGORY_META[category] ?? CATEGORY_META.frontend;
            const Icon = meta.icon;
            return (
              <Reveal key={category} delay={0.07 * gi}>
                <div className="h-full rounded-2xl border border-slate-200/90 bg-white/70 p-6 md:p-7 dark:border-white/[0.08] dark:bg-white/[0.03]">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-violet-500/15 text-cyan-600 dark:text-cyan-300">
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                      <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                        {t(`skills.categories.${category}`)}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-slate-400 dark:text-slate-600">
                      /{meta.index}
                    </span>
                  </div>

                  <ul className="space-y-4">
                    {items.map((skill, si) => (
                      <li key={skill.id}>
                        <div className="mb-1.5 flex items-center justify-between gap-3">
                          <span className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-200">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200/80 bg-white dark:border-white/[0.08] dark:bg-white/[0.04]">
                              <TechIcon slug={skill.iconName} size={14} />
                            </span>
                            {skill.name}
                          </span>
                          <span className="font-mono text-xs text-slate-500 dark:text-slate-500">
                            {skill.proficiency}%
                          </span>
                        </div>
                        <div
                          className="h-1.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/[0.06]"
                          role="progressbar"
                          aria-valuenow={skill.proficiency}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${skill.name} ${t("skills.proficiency")}`}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                              duration: 1,
                              delay: 0.15 + si * 0.06,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 dark:from-cyan-400 dark:to-violet-400"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
