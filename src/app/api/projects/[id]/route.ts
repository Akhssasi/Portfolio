import { db, isUsingMemoryStore } from "@/db";
import { projects as projectsTable } from "@/db/schema";
import { projectsStore } from "@/db/static-data";
import {
  badRequest,
  notFound,
  ok,
  parseIdParam,
  parseJsonBody,
  requireAdmin,
  serverError,
} from "@/lib/api-utils";
import { projectUpdateSchema, zodFieldErrors } from "@/lib/validators";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** GET /api/projects/:id — single project (public). */
export async function GET(_req: Request, ctx: Ctx) {
  const id = parseIdParam((await ctx.params).id);
  if (!id) return badRequest("Invalid project id");

  if (isUsingMemoryStore) {
    const row = projectsStore.find((p) => p.id === id);
    return row ? ok(row) : notFound("Project not found");
  }

  try {
    const { eq } = await import("drizzle-orm");
    const [row] = await db!
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, id));
    return row ? ok(row) : notFound("Project not found");
  } catch {
    return serverError("Failed to load project");
  }
}

/** PUT /api/projects/:id — update a project (admin). */
export async function PUT(req: Request, ctx: Ctx) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const id = parseIdParam((await ctx.params).id);
  if (!id) return badRequest("Invalid project id");

  const { body, error } = await parseJsonBody(req);
  if (error) return error;

  const parsed = projectUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Validation failed", zodFieldErrors(parsed.error));
  }

  if (isUsingMemoryStore) {
    const idx = projectsStore.findIndex((p) => p.id === id);
    if (idx === -1) return notFound("Project not found");
    const updated = { ...projectsStore[idx], ...parsed.data, updatedAt: new Date() };
    projectsStore[idx] = updated;
    return ok(updated);
  }

  try {
    const { eq } = await import("drizzle-orm");
    const [row] = await db!
      .update(projectsTable)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(projectsTable.id, id))
      .returning();
    return row ? ok(row) : notFound("Project not found");
  } catch {
    return serverError("Failed to update project");
  }
}

/** DELETE /api/projects/:id — remove a project (admin). */
export async function DELETE(_req: Request, ctx: Ctx) {
  const guard = requireAdmin(_req);
  if (guard) return guard;

  const id = parseIdParam((await ctx.params).id);
  if (!id) return badRequest("Invalid project id");

  if (isUsingMemoryStore) {
    const idx = projectsStore.findIndex((p) => p.id === id);
    if (idx === -1) return notFound("Project not found");
    projectsStore.splice(idx, 1);
    return ok({ deleted: id });
  }

  try {
    const { eq } = await import("drizzle-orm");
    const [row] = await db!
      .delete(projectsTable)
      .where(eq(projectsTable.id, id))
      .returning({ id: projectsTable.id });
    return row ? ok({ deleted: row.id }) : notFound("Project not found");
  } catch {
    return serverError("Failed to delete project");
  }
}
