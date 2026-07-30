"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  ExternalLink,
  Lightbulb,
  ServerCog,
  Sparkles,
  Target,
  Trophy,
  X,
} from "lucide-react";
import type { Project } from "@/db/schema";
import { tx } from "@/lib/localize";
import { useI18n } from "@/components/providers/i18n-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechIcon } from "@/components/ui/tech-icon";
import { Reveal } from "@/components/ui/reveal";

function techSlug(name: string): string {
  return name.toLowerCase().replace(/[\s.]+/g, "");
}

function TechChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300/70 bg-white/60 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/[0.09] dark:bg-white/[0.04] dark:text-slate-300">
      <TechIcon slug={techSlug(name)} size={12} />
      {name}
    </span>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  const { t, locale } = useI18n();
  const [selected, setSelected] = useState<Project | null>(null);

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (selected) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, close]);

  if (!projects.length) return null;

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker={t("projects.kicker")}
          title={t("projects.title")}
          subtitle={t("projects.subtitle")}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={0.08 * (i % 2)}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white/70 transition-all hover:-translate-y-1.5 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-cyan-400/30">
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#0a0f1c]">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-mono text-slate-600">
                      {project.slug}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute start-4 top-4 font-mono text-xs text-white/50">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                  {project.featured && (
                    <span className="absolute end-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-3 py-1 text-[11px] font-semibold text-white shadow-lg">
                      <Sparkles size={11} />
                      {t("projects.featured")}
                    </span>
                  )}
                  {/* Achievement overlay */}
                  <p className="absolute inset-x-4 bottom-4 line-clamp-2 text-[13px] leading-snug text-white/85">
                    <Trophy size={12} className="me-1.5 inline text-amber-300" />
                    {tx(project.translations, locale, "achievement", project.solution)}
                  </p>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    {tx(project.translations, locale, "title", project.title)}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {tx(
                      project.translations,
                      locale,
                      "shortDescription",
                      project.shortDescription,
                    )}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <TechChip key={tech} name={tech} />
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="inline-flex items-center rounded-full border border-slate-300/70 px-3 py-1 text-xs font-medium text-slate-500 dark:border-white/[0.09] dark:text-slate-500">
                        +{project.techStack.length - 5}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex items-center gap-3 border-t border-slate-200/80 pt-5 dark:border-white/[0.07]">
                    <button
                      type="button"
                      onClick={() => setSelected(project)}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-cyan-600 dark:bg-white/10 dark:hover:bg-cyan-500/20 dark:hover:text-cyan-300"
                    >
                      {t("projects.caseStudy")}
                      <ArrowUpRight size={13} />
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-cyan-500/60 hover:text-cyan-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
                      >
                        <TechIcon slug="github" size={13} />
                        {t("projects.source")}
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-cyan-500/60 hover:text-cyan-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
                      >
                        <ExternalLink size={13} />
                        {t("projects.liveDemo")}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ——— Case study modal ——— */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={tx(selected.translations, locale, "title", selected.title)}
              className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-slate-200 bg-white shadow-2xl sm:rounded-3xl dark:border-white/10 dark:bg-[#0a0f1c]"
            >
              {/* Modal header image */}
              <div className="relative h-48 overflow-hidden sm:h-56">
                {selected.imageUrl && (
                  <img
                    src={selected.imageUrl}
                    alt={selected.title}
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#0a0f1c]" />
                <button
                  type="button"
                  onClick={close}
                  aria-label={t("projects.close")}
                  className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/70"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="-mt-8 relative px-6 pb-8 sm:px-9">
                <h3 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                  {tx(selected.translations, locale, "title", selected.title)}
                </h3>
                <p className="mt-1.5 font-mono text-xs text-slate-500">
                  {selected.slug}
                </p>

                {/* Overview */}
                <ModalBlock icon={Target} title={t("projects.overview")}>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {selected.fullDescription}
                  </p>
                </ModalBlock>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ModalBlock icon={Lightbulb} title={t("projects.problem")}>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {selected.problem}
                    </p>
                  </ModalBlock>
                  <ModalBlock icon={Check} title={t("projects.solution")}>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {selected.solution}
                    </p>
                  </ModalBlock>
                </div>

                {/* Architecture */}
                <ModalBlock icon={ServerCog} title={t("projects.architecture")} className="mt-6">
                  <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-4 font-mono text-[12px] leading-relaxed text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-400">
                    {selected.architecture}
                  </div>
                </ModalBlock>

                {/* Features */}
                <ModalBlock icon={Sparkles} title={t("projects.features")} className="mt-6">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {selected.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                          <Check size={10} strokeWidth={3} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </ModalBlock>

                {/* Achievement */}
                <div className="mt-6 rounded-2xl border border-amber-500/25 bg-gradient-to-br from-amber-500/[0.08] to-orange-500/[0.05] p-5">
                  <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
                    <Trophy size={13} />
                    {t("projects.achievement")}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {tx(selected.translations, locale, "achievement", selected.solution)}
                  </p>
                </div>

                {/* Stack */}
                <ModalBlock icon={ServerCog} title={t("projects.stack")} className="mt-6">
                  <div className="flex flex-wrap gap-1.5">
                    {selected.techStack.map((tech) => (
                      <TechChip key={tech} name={tech} />
                    ))}
                  </div>
                </ModalBlock>

                {/* Links */}
                <div className="mt-7 flex flex-wrap gap-3">
                  {selected.githubUrl && (
                    <a
                      href={selected.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-cyan-600 dark:bg-white/10 dark:hover:bg-cyan-500/20"
                    >
                      <TechIcon slug="github" size={14} />
                      {t("projects.source")}
                    </a>
                  )}
                  {selected.liveUrl && (
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.03]"
                    >
                      <ExternalLink size={14} />
                      {t("projects.liveDemo")}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ModalBlock({
  icon: Icon,
  title,
  children,
  className = "",
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${className} rounded-2xl border border-slate-200/70 bg-white/50 p-5 dark:border-white/[0.07] dark:bg-white/[0.02]`}>
      <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">
        <Icon size={13} />
        {title}
      </p>
      {children}
    </div>
  );
}
