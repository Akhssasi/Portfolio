"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Send,
  AlertTriangle,
} from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { sendContactMessage } from "@/lib/api-client";

type Status = "idle" | "sending" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}
type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (form.name.trim().length < 2) next.name = t("contact.validation.nameMin");
    if (!EMAIL_RE.test(form.email.trim())) next.email = t("contact.validation.emailInvalid");
    if (form.subject.trim().length < 3) next.subject = t("contact.validation.subjectMin");
    if (form.message.trim().length < 10) next.message = t("contact.validation.messageMin");
    return next;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next = validate();
    if (Object.values(next).some(Boolean)) {
      setErrors(next);
      return;
    }
    setStatus("sending");
    const result = await sendContactMessage({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    });
    setStatus(result.ok ? "success" : "error");
  };

  const reset = () => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setStatus("idle");
  };

  const infoCards = [
    { icon: Mail, label: t("contact.emailLabel"), value: t("contact.emailValue"), href: "mailto:hello@devportfoliox.com" },
    { icon: MapPin, label: t("contact.locationLabel"), value: t("contact.locationValue") },
    { icon: Clock, label: t("contact.availabilityLabel"), value: t("contact.availabilityValue") },
  ];

  const inputCls = (hasError?: string) =>
    `w-full rounded-xl border bg-white/60 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:ring-2 dark:bg-white/[0.04] dark:text-white dark:placeholder-slate-600 ${
      hasError
        ? "border-red-400/70 focus:border-red-400 focus:ring-red-400/20"
        : "border-slate-300/80 focus:border-cyan-500 focus:ring-cyan-500/20 dark:border-white/10 dark:focus:border-cyan-400"
    }`;

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker={t("contact.kicker")}
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Info column */}
          <div className="space-y-4">
            {infoCards.map((card, i) => (
              <Reveal key={card.label} delay={0.07 * i}>
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white/70 p-5 dark:border-white/[0.08] dark:bg-white/[0.03]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-violet-500/15 text-cyan-600 dark:text-cyan-300">
                    <card.icon size={18} strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      {card.label}
                    </p>
                    {card.href ? (
                      <a
                        href={card.href}
                        className="mt-0.5 block truncate text-sm font-semibold text-slate-900 transition-colors hover:text-cyan-600 dark:text-white dark:hover:text-cyan-300"
                      >
                        {card.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
                        {card.value}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <div className="relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.08] to-cyan-500/[0.06] p-5">
                <p className="flex items-center gap-2.5 text-sm text-emerald-700 dark:text-emerald-300">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  {t("contact.responseTime")}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form column */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/70 p-6 md:p-8 dark:border-white/[0.08] dark:bg-white/[0.03]">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500"
                    >
                      <CheckCircle2 size={40} strokeWidth={1.6} />
                    </motion.span>
                    <h3 className="mt-6 font-display text-2xl font-bold text-slate-900 dark:text-white">
                      {t("contact.successTitle")}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {t("contact.success")}
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-8 rounded-full border border-slate-300/80 px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-500/60 hover:text-cyan-600 dark:border-white/15 dark:text-slate-300 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
                    >
                      {t("contact.sendAnother")}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                      {t("contact.formTitle")}
                    </h3>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label={t("contact.name")}
                        error={errors.name}
                        input={
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder={t("contact.namePlaceholder")}
                            autoComplete="name"
                            className={inputCls(errors.name)}
                          />
                        }
                      />
                      <Field
                        label={t("contact.email")}
                        error={errors.email}
                        input={
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            placeholder={t("contact.emailPlaceholder")}
                            autoComplete="email"
                            dir="ltr"
                            className={inputCls(errors.email)}
                          />
                        }
                      />
                    </div>

                    <Field
                      label={t("contact.subject")}
                      error={errors.subject}
                      input={
                        <input
                          type="text"
                          value={form.subject}
                          onChange={(e) => update("subject", e.target.value)}
                          placeholder={t("contact.subjectPlaceholder")}
                          className={inputCls(errors.subject)}
                        />
                      }
                    />

                    <Field
                      label={t("contact.message")}
                      error={errors.message}
                      input={
                        <textarea
                          value={form.message}
                          onChange={(e) => update("message", e.target.value)}
                          placeholder={t("contact.messagePlaceholder")}
                          rows={5}
                          className={`${inputCls(errors.message)} resize-none`}
                        />
                      }
                    />

                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-600 dark:text-red-300"
                      >
                        <AlertTriangle size={15} />
                        {t("contact.error")}
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.01] hover:shadow-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:w-auto"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          {t("contact.sending")}
                        </>
                      ) : (
                        <>
                          <Send size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          {t("contact.submit")}
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  input,
}: {
  label: string;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
        {error && (
          <span className="text-xs font-normal text-red-500 dark:text-red-400">{error}</span>
        )}
      </span>
      {input}
    </label>
  );
}
