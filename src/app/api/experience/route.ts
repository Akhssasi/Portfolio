import { db, isUsingMemoryStore } from "@/db";
import { experience as experienceTable } from "@/db/schema";
import { experienceStore, nextExperienceIdValue } from "@/db/static-data";
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
    if (isUsingMemoryStore) {
      const rows = [...experienceStore].sort(
        (a, b) => a.displayOrder - b.displayOrder || a.id - b.id,
      );
      return ok(rows);
    }
    const { asc } = await import("drizzle-orm");
    const rows = await db!
      .select()
      .from(experienceTable)
      .orderBy(asc(experienceTable.displayOrder), asc(experienceTable.id));
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

  if (isUsingMemoryStore) {
    const id = nextExperienceIdValue();
    const row = {
      id,
      ...parsed.data,
      translations: parsed.data.translations ?? {},
      createdAt: new Date(),
    } as (typeof experienceStore)[number];
    experienceStore.push(row);
    return created(row);
  }

  try {
    const [row] = await db!.insert(experienceTable).values(parsed.data).returning();
    return created(row);
  } catch {
    return serverError("Failed to create experience entry");
  }
}
