import { db, isUsingMemoryStore } from "@/db";
import { skills as skillsTable } from "@/db/schema";
import { skillsStore, nextSkillIdValue } from "@/db/static-data";
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
    if (isUsingMemoryStore) {
      const rows = [...skillsStore].sort(
        (a, b) => a.displayOrder - b.displayOrder || a.id - b.id,
      );
      return ok(rows);
    }
    const { asc } = await import("drizzle-orm");
    const rows = await db!
      .select()
      .from(skillsTable)
      .orderBy(asc(skillsTable.displayOrder), asc(skillsTable.id));
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

  if (isUsingMemoryStore) {
    const id = nextSkillIdValue();
    const row = { id, ...parsed.data, createdAt: new Date() } as (typeof skillsStore)[number];
    skillsStore.push(row);
    return created(row);
  }

  try {
    const [row] = await db!.insert(skillsTable).values(parsed.data).returning();
    return created(row);
  } catch {
    return serverError("Failed to create skill");
  }
}
