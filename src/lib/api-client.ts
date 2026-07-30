"use client";

/**
 * Client-side HTTP layer (the Angular "service" equivalent).
 * Base URL is environment-driven — never hardcoded.
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string };

export async function sendContactMessage(
  payload: ContactPayload,
): Promise<ContactResult> {
  try {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const json = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      return { ok: false, error: json?.error ?? `Request failed (${res.status})` };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error" };
  }
}
