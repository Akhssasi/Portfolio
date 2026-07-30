import { NextResponse } from "next/server";

/** Standard API envelope helpers used by every controller. */

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ data }, init);
}

export function created<T>(data: T) {
  return NextResponse.json({ data }, { status: 201 });
}

export function badRequest(
  message: string,
  fields?: Record<string, string[]>,
) {
  return NextResponse.json({ error: message, fields }, { status: 400 });
}

export function unauthorized(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function notFound(message = "Resource not found") {
  return NextResponse.json({ error: message }, { status: 404 });
}

export function conflict(message: string) {
  return NextResponse.json({ error: message }, { status: 409 });
}

export function serverError(message = "Internal server error") {
  return NextResponse.json({ error: message }, { status: 500 });
}

/**
 * Guard for mutating / admin endpoints. When ADMIN_API_KEY is configured,
 * requests must carry a matching `x-admin-key` header.
 */
export function requireAdmin(req: Request): NextResponse | null {
  const key = process.env.ADMIN_API_KEY;
  if (!key) return null; // open in local development
  return req.headers.get("x-admin-key") === key ? null : unauthorized();
}

export async function parseJsonBody(
  req: Request,
): Promise<{ body?: unknown; error?: NextResponse }> {
  try {
    return { body: await req.json() };
  } catch {
    return { error: badRequest("Request body must be valid JSON") };
  }
}

export function parseIdParam(raw: string): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}
