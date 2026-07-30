import { db, isUsingMemoryStore } from "@/db";
import { projects as projectsTable } from "@/db/schema";
import { projectsStore, nextProjectIdValue } from "@/db/static-data";
import {
  badRequest,
  conflict,
  created,
  ok,
  parseJsonBody,
  requireAdmin,
  serverError,
} from "@/lib/api-utils";
import { projectInputSchema, zodFieldErrors } from "@/lib/validators";

export const dynamic = "force-dynamic";

/** GET /api/projects — list all projects (public). */
export async function GET() {
  try {
    if (isUsingMemoryStore) {
      const rows = [...projectsStore].sort(
        (a, b) => a.displayOrder - b.displayOrder || a.id - b.id,
      );
      return ok(rows);
    }
    const { asc } = await import("drizzle-orm");
    const rows = await db!
      .select()
      .from(projectsTable)
      .orderBy(asc(projectsTable.displayOrder), asc(projectsTable.id));
    return ok(rows);
  } catch {
    return serverError("Failed to load projects");
  }
}

/** POST /api/projects — create a project (admin). */
export async function POST(req: Request) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const { body, error } = await parseJsonBody(req);
  if (error) return error;

  const parsed = projectInputSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Validation failed", zodFieldErrors(parsed.error));
  }

  if (isUsingMemoryStore) {
    const exists = projectsStore.find((p) => p.slug === parsed.data.slug);
    if (exists) return conflict("A project with this slug already exists");
    const id = nextProjectIdValue();
    const now = new Date();
    const row = {
      id,
      ...parsed.data,
      translations: parsed.data.translations ?? {},
      createdAt: now,
      updatedAt: now,
    } as (typeof projectsStore)[number];
    projectsStore.push(row);
    return created(row);
  }

  try {
    const { eq } = await import("drizzle-orm");
    const existing = await db!
      .select({ id: projectsTable.id })
      .from(projectsTable)
      .where(eq(projectsTable.slug, parsed.data.slug));
    if (existing.length) {
      return conflict("A project with this slug already exists");
    }
    const [row] = await db!
      .insert(projectsTable)
      .values(parsed.data)
      .returning();
    return created(row);
  } catch {
    return serverError("Failed to create project");
  }
}
