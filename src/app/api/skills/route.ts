import { asc } from "drizzle-orm";
import { db } from "@/db";
import { skills } from "@/db/schema";
import {
  badRequest,
  created,
  ok,
  parseJsonBody,
  requireAdmin,
  serverError,
} from "@/lib/api-utils";
import { skillInputSchema, zodFieldErrors } from "@/lib/validators";

export const dynamic = "force-dynamic";

/** GET /api/skills — list all skills (public). */
export async function GET() {
  try {
    const rows = await db
      .select()
      .from(skills)
      .orderBy(asc(skills.displayOrder), asc(skills.id));
    return ok(rows);
  } catch {
    return serverError("Failed to load skills");
  }
}

/** POST /api/skills — create a skill (admin). */
export async function POST(req: Request) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const { body, error } = await parseJsonBody(req);
  if (error) return error;

  const parsed = skillInputSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Validation failed", zodFieldErrors(parsed.error));
  }

  try {
    const [row] = await db.insert(skills).values(parsed.data).returning();
    return created(row);
  } catch {
    return serverError("Failed to create skill");
  }
}
