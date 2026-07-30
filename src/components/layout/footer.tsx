"use client";

import { ArrowUp, Database, Mail } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { TechIcon } from "@/components/ui/tech-icon";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  const links = [
    { id: "about", label: t("nav.about") },
    { id: "skills", label: t("nav.skills") },
    { id: "projects", label: t("nav.projects") },
    { id: "experience", label: t("nav.experience") },
    { id: "contact", label: t("nav.contact") },
  ];

  return (
    <footer className="relative border-t border-slate-200 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5 font-mono text-sm font-semibold text-slate-900 dark:text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 text-[13px] font-bold text-white">
                {"</>"}
              </span>
              dev<span className="text-cyan-500 dark:text-cyan-400">portfolio</span>x
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t("footer.tagline")}
            </p>
            <p className="mt-4 flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-500">
              <Database size={13} className="text-cyan-500 dark:text-cyan-400" />
              {t("footer.apiNote")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
              {t("footer.navTitle")}
            </h3>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
              {t("footer.socialTitle")}
            </h3>
            <div className="flex gap-2.5">
              <a
                href="https://github.com/devportfoliox"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300/70 text-slate-600 transition-all hover:border-cyan-500/60 hover:text-cyan-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
              >
                <TechIcon slug="github" size={16} />
              </a>
              <a
                href="https://linkedin.com/in/devportfoliox"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300/70 text-slate-600 transition-all hover:border-cyan-500/60 hover:text-cyan-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
              >
                <TechIcon slug="linkedin" size={16} />
              </a>
              <a
                href="mailto:hello@devportfoliox.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300/70 text-slate-600 transition-all hover:border-cyan-500/60 hover:text-cyan-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 dark:border-white/10 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {year} DevPortfolioX. {t("footer.rights")}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            {t("footer.builtWith")}
          </p>
          <a
            href="#top"
            className="flex items-center gap-2 rounded-full border border-slate-300/70 px-4 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-cyan-500/60 hover:text-cyan-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
          >
            <ArrowUp size={13} />
            {t("footer.backToTop")}
          </a>
        </div>
      </div>
    </footer>
  );
}
