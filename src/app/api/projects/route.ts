import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
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
    const rows = await db
      .select()
      .from(projects)
      .orderBy(asc(projects.displayOrder), asc(projects.id));
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

  try {
    const existing = await db
      .select({ id: projects.id })
      .from(projects)
      .where(eq(projects.slug, parsed.data.slug));
    if (existing.length) {
      return conflict("A project with this slug already exists");
    }
    const [row] = await db.insert(projects).values(parsed.data).returning();
    return created(row);
  } catch {
    return serverError("Failed to create project");
  }
}
