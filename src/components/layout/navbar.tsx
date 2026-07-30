"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  ChevronDown,
  Download,
  Globe,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { TechIcon } from "@/components/ui/tech-icon";
import { useI18n, LANGUAGES, type Locale } from "@/components/providers/i18n-provider";
import { useTheme } from "@/components/providers/theme-provider";

const SECTION_IDS = ["about", "skills", "projects", "experience", "contact"] as const;

export function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = SECTION_IDS.map((id) => ({ id, label: t(`nav.${id}`) }));
  const currentLang = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  const pick = (code: Locale) => {
    setLocale(code);
    setLangOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#060a13]/80"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-8">
          <a
            href="#top"
            className="group flex items-center gap-2.5 font-mono text-sm font-semibold text-slate-900 dark:text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 text-[13px] font-bold text-white shadow-lg shadow-cyan-500/20 transition-transform group-hover:scale-105">
              {"</>"}
            </span>
            <span className="hidden sm:block">
              dev<span className="text-cyan-500 dark:text-cyan-400">portfolio</span>x
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active === link.id
                      ? "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-300"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Language switcher */}
            <div ref={langRef} className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                aria-label={t("language.label")}
                aria-expanded={langOpen}
                className="flex items-center gap-1.5 rounded-full border border-slate-300/70 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-cyan-500/60 hover:text-cyan-600 dark:border-white/15 dark:text-slate-300 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
              >
                <Globe size={14} />
                <span className="uppercase">{currentLang.code}</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform ${langOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    className="absolute end-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-[#0b1120]"
                  >
                    {LANGUAGES.map((lang) => (
                      <li key={lang.code}>
                        <button
                          type="button"
                          onClick={() => pick(lang.code)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                            lang.code === locale
                              ? "bg-cyan-500/10 font-semibold text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-300"
                              : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                          }`}
                        >
                          {lang.label}
                          {lang.code === locale && <Check size={14} />}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? t("theme.toLight") : t("theme.toDark")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300/70 text-slate-700 transition-colors hover:border-cyan-500/60 hover:text-cyan-600 dark:border-white/15 dark:text-slate-300 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <a
              href="/api/resume"
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-cyan-500/25 transition-transform hover:scale-[1.03] md:flex"
            >
              <Download size={14} />
              {t("nav.resume")}
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t("nav.menu")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300/70 text-slate-700 dark:border-white/15 dark:text-slate-300 lg:hidden"
            >
              <Menu size={17} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] flex flex-col bg-white/95 backdrop-blur-2xl dark:bg-[#060a13]/95 lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
                dev<span className="text-cyan-500 dark:text-cyan-400">portfolio</span>x
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={t("nav.close")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300/70 text-slate-700 dark:border-white/15 dark:text-slate-300"
              >
                <X size={17} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.05, duration: 0.35 }}
                  className="border-b border-slate-200/80 py-4 font-display text-3xl font-bold text-slate-900 transition-colors hover:text-cyan-600 dark:border-white/10 dark:text-white dark:hover:text-cyan-300"
                >
                  <span className="me-4 font-mono text-sm font-normal text-cyan-500 dark:text-cyan-400">
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="flex items-center justify-between px-8 pb-10">
              <div className="flex gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => pick(lang.code)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase transition-colors ${
                      lang.code === locale
                        ? "border-cyan-500/60 bg-cyan-500/10 text-cyan-600 dark:border-cyan-400/50 dark:text-cyan-300"
                        : "border-slate-300 text-slate-600 dark:border-white/15 dark:text-slate-400"
                    }`}
                  >
                    {lang.code}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <a
                  href="https://github.com/devportfoliox"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 dark:border-white/15 dark:text-slate-300"
                >
                  <TechIcon slug="github" size={16} />
                </a>
                <a
                  href="https://linkedin.com/in/devportfoliox"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-700 dark:border-white/15 dark:text-slate-300"
                >
                  <TechIcon slug="linkedin" size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
