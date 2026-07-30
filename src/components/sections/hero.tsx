"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowRight, Download, Mail } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { TechIcon } from "@/components/ui/tech-icon";

const MARQUEE_STACK = [
  { slug: "angular", name: "Angular" },
  { slug: "typescript", name: "TypeScript" },
  { slug: "react", name: "React" },
  { slug: "vuedotjs", name: "Vue.js" },
  { slug: "openjdk", name: "Java" },
  { slug: "springboot", name: "Spring Boot" },
  { slug: "postgresql", name: "PostgreSQL" },
  { slug: "mysql", name: "MySQL" },
  { slug: "docker", name: "Docker" },
  { slug: "git", name: "Git" },
  { slug: "tailwindcss", name: "Tailwind CSS" },
  { slug: "nodedotjs", name: "Node.js" },
];

const FLOAT_CHIPS = [
  { slug: "angular", className: "-top-5 -left-5 md:-left-8", delay: "0s" },
  { slug: "springboot", className: "top-1/3 -right-4 md:-right-8", delay: "1.2s" },
  { slug: "postgresql", className: "-bottom-6 left-8", delay: "2.1s" },
  { slug: "typescript", className: "-top-6 right-10", delay: "0.6s" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t, tr } = useI18n();
  const stats = tr<{ value: string; label: string }[]>("hero.stats");

  return (
    <section id="top" className="relative overflow-hidden pt-16 md:pt-[72px]">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 pb-20 pt-14 md:px-8 md:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28">
        {/* ——— Copy ——— */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-4 py-1.5 text-xs font-medium text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-400/5 dark:text-cyan-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t("hero.badge")}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mt-7 font-mono text-sm text-cyan-600 dark:text-cyan-400"
          >
            <span className="text-slate-400 dark:text-slate-500">$</span> {t("hero.greeting")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="mt-3 font-display text-[2.6rem] font-bold leading-[1.04] tracking-tight text-slate-900 dark:text-white sm:text-6xl xl:text-[4.4rem]"
          >
            <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 bg-clip-text text-transparent dark:from-cyan-300 dark:via-sky-400 dark:to-violet-400">
              {t("hero.headlineA")}
            </span>{" "}
            {t("hero.headlineB")}
            <br />
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-300">
              {t("hero.headlineC")}
            </span>{" "}
            {t("hero.headlineD")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease }}
            className="mt-4 font-mono text-sm text-slate-500 dark:text-slate-500"
          >
            {t("hero.name")} — {t("hero.role")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease }}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.03] hover:shadow-cyan-500/40"
            >
              {t("hero.ctaProjects")}
              <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="/api/resume"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/60 px-6 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur transition-all hover:border-cyan-500/60 hover:text-cyan-600 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
            >
              <Download size={15} />
              {t("hero.ctaResume")}
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300"
            >
              <Mail size={15} />
              {t("hero.ctaContact")}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-10 flex items-center gap-4"
          >
            <a
              href="https://github.com/devportfoliox"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/80 text-slate-600 transition-all hover:-translate-y-0.5 hover:border-cyan-500/60 hover:text-cyan-600 dark:border-white/15 dark:text-slate-400 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
            >
              <TechIcon slug="github" size={17} />
            </a>
            <a
              href="https://linkedin.com/in/devportfoliox"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/80 text-slate-600 transition-all hover:-translate-y-0.5 hover:border-cyan-500/60 hover:text-cyan-600 dark:border-white/15 dark:text-slate-400 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
            >
              <TechIcon slug="linkedin" size={17} />
            </a>
            <div className="ms-2 hidden h-11 w-px bg-slate-300/70 dark:bg-white/10 sm:block" />
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 max-w-[130px] text-[11px] leading-snug text-slate-500 dark:text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ——— Code composition ——— */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
          className="relative hidden lg:block"
        >
          <div className="relative">
            {/* Backend window */}
            <div className="relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1c] shadow-2xl shadow-black/40">
              <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ms-3 font-mono text-xs text-slate-500">OrderController.java</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-[1.75]">
                <code>
                  <span className="text-violet-400">@RestController</span>{"\n"}
                  <span className="text-violet-400">@RequestMapping</span>
                  <span className="text-slate-400">(</span>
                  <span className="text-emerald-300">"/api/orders"</span>
                  <span className="text-slate-400">)</span>{"\n"}
                  <span className="text-violet-400">@RequiredArgsConstructor</span>{"\n"}
                  <span className="text-sky-300">public class</span>{" "}
                  <span className="text-amber-200">OrderController</span>{" "}
                  <span className="text-slate-400">{"{"}</span>{"\n"}
                  {"  "}
                  <span className="text-sky-300">private final</span>{" "}
                  <span className="text-amber-200">OrderService</span>{" "}
                  <span className="text-slate-300">orderService;</span>{"\n\n"}
                  {"  "}
                  <span className="text-violet-400">@PostMapping</span>{"\n"}
                  {"  "}
                  <span className="text-sky-300">public</span>{" "}
                  <span className="text-amber-200">ResponseEntity</span>
                  <span className="text-slate-400">&lt;</span>
                  <span className="text-amber-200">OrderDto</span>
                  <span className="text-slate-400">&gt;</span>{" "}
                  <span className="text-cyan-300">place</span>
                  <span className="text-slate-400">(</span>
                  <span className="text-violet-400">@Valid</span>{" "}
                  <span className="text-amber-200">OrderRequest</span>{" "}
                  <span className="text-slate-300">req</span>
                  <span className="text-slate-400">)</span>{" "}
                  <span className="text-slate-400">{"{"}</span>{"\n"}
                  {"    "}
                  <span className="text-violet-400">return</span>{" "}
                  <span className="text-slate-300">ResponseEntity</span>{"\n"}
                  {"      ."}
                  <span className="text-cyan-300">status</span>
                  <span className="text-slate-400">(</span>
                  <span className="text-orange-300">201</span>
                  <span className="text-slate-400">)</span>{"\n"}
                  {"      ."}
                  <span className="text-cyan-300">body</span>
                  <span className="text-slate-400">(</span>
                  <span className="text-slate-300">orderService</span>
                  <span className="text-slate-400">.</span>
                  <span className="text-cyan-300">place</span>
                  <span className="text-slate-400">(</span>
                  <span className="text-slate-300">req</span>
                  <span className="text-slate-400">));</span>{"\n"}
                  {"  "}
                  <span className="text-slate-400">{"}"}</span>{"\n"}
                  <span className="text-slate-400">{"}"}</span>
                </code>
              </pre>
              <div className="flex items-center gap-2 border-t border-white/[0.07] px-4 py-2.5 font-mono text-[10.5px]">
                <span className="rounded bg-emerald-400/10 px-2 py-0.5 text-emerald-300">201 Created</span>
                <span className="rounded bg-cyan-400/10 px-2 py-0.5 text-cyan-300">PostgreSQL tx committed</span>
                <span className="ms-auto text-slate-600">Spring Boot 3 · Java 21</span>
              </div>
            </div>

            {/* Frontend window */}
            <div className="absolute -bottom-14 -left-16 z-20 w-72 rotate-[-3deg] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1c] shadow-2xl shadow-black/50 xl:-left-24">
              <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ms-2 font-mono text-[11px] text-slate-500">order.service.ts</span>
              </div>
              <pre className="p-4 font-mono text-[11.5px] leading-[1.7]">
                <code>
                  <span className="text-slate-500">{"// type-safe by design"}</span>{"\n"}
                  <span className="text-sky-300">readonly</span>{" "}
                  <span className="text-slate-300">orders$</span>{" "}
                  <span className="text-slate-400">=</span>{" "}
                  <span className="text-sky-300">this</span>
                  <span className="text-slate-400">.</span>
                  <span className="text-slate-300">http</span>{"\n"}
                  {"  "}
                  <span className="text-slate-400">.</span>
                  <span className="text-slate-400">{"get<"}</span>
                  <span className="text-amber-200">Order</span>
                  <span className="text-slate-400">{"[]>("}</span>
                  <span className="text-emerald-300">"/api/orders"</span>
                  <span className="text-slate-400">)</span>{"\n"}
                  {"  "}
                  <span className="text-slate-400">.</span>
                  <span className="text-cyan-300">pipe</span>
                  <span className="text-slate-400">(</span>
                  <span className="text-cyan-300">shareReplay</span>
                  <span className="text-slate-400">(</span>
                  <span className="text-orange-300">1</span>
                  <span className="text-slate-400">));</span>
                </code>
              </pre>
            </div>

            {/* Floating tech chips */}
            {FLOAT_CHIPS.map((chip) => (
              <div
                key={chip.slug}
                className={`animate-float absolute z-30 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0d1424]/90 shadow-xl shadow-black/40 backdrop-blur ${chip.className}`}
                style={{ animationDelay: chip.delay }}
              >
                <TechIcon slug={chip.slug} size={26} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ——— Marquee ——— */}
      <div className="relative border-y border-slate-200/80 bg-white/50 py-5 backdrop-blur dark:border-white/[0.07] dark:bg-white/[0.02]">
        <div className="marquee-mask overflow-hidden" dir="ltr">
          <div className="animate-marquee flex w-max items-center gap-12 pe-12">
            {[...MARQUEE_STACK, ...MARQUEE_STACK].map((item, i) => (
              <div
                key={`${item.slug}-${i}`}
                className="flex items-center gap-3 text-slate-500 dark:text-slate-500"
              >
                <TechIcon slug={item.slug} size={19} />
                <span className="whitespace-nowrap font-mono text-xs tracking-wider">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
