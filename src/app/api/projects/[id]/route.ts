import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
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
  try {
    const [row] = await db.select().from(projects).where(eq(projects.id, id));
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

  try {
    const [row] = await db
      .update(projects)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(projects.id, id))
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

  try {
    const [row] = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning({ id: projects.id });
    return row ? ok({ deleted: row.id }) : notFound("Project not found");
  } catch {
    return serverError("Failed to delete project");
  }
}
