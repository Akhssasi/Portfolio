import { asc } from "drizzle-orm";
import { db } from "@/db";
import { experience } from "@/db/schema";
import {
  badRequest,
  created,
  ok,
  parseJsonBody,
  requireAdmin,
  serverError,
} from "@/lib/api-utils";
import { experienceInputSchema, zodFieldErrors } from "@/lib/validators";

export const dynamic = "force-dynamic";

/** GET /api/experience — list timeline entries (public). */
export async function GET() {
  try {
    const rows = await db
      .select()
      .from(experience)
      .orderBy(asc(experience.displayOrder), asc(experience.id));
    return ok(rows);
  } catch {
    return serverError("Failed to load experience");
  }
}

/** POST /api/experience — create a timeline entry (admin). */
export async function POST(req: Request) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const { body, error } = await parseJsonBody(req);
  if (error) return error;

  const parsed = experienceInputSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Validation failed", zodFieldErrors(parsed.error));
  }

  try {
    const [row] = await db.insert(experience).values(parsed.data).returning();
    return created(row);
  } catch {
    return serverError("Failed to create experience entry");
  }
}
