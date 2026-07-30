import { db, isUsingMemoryStore } from "@/db";
import { skills as skillsTable } from "@/db/schema";
import { skillsStore } from "@/db/static-data";
import {
  badRequest,
  notFound,
  ok,
  parseIdParam,
  parseJsonBody,
  requireAdmin,
  serverError,
} from "@/lib/api-utils";
import { skillUpdateSchema, zodFieldErrors } from "@/lib/validators";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const id = parseIdParam((await ctx.params).id);
  if (!id) return badRequest("Invalid skill id");

  if (isUsingMemoryStore) {
    const row = skillsStore.find((s) => s.id === id);
    return row ? ok(row) : notFound("Skill not found");
  }

  try {
    const { eq } = await import("drizzle-orm");
    const [row] = await db!.select().from(skillsTable).where(eq(skillsTable.id, id));
    return row ? ok(row) : notFound("Skill not found");
  } catch {
    return serverError("Failed to load skill");
  }
}

/** PUT /api/skills/:id — update a skill (admin). */
export async function PUT(req: Request, ctx: Ctx) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const id = parseIdParam((await ctx.params).id);
  if (!id) return badRequest("Invalid skill id");

  const { body, error } = await parseJsonBody(req);
  if (error) return error;

  const parsed = skillUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Validation failed", zodFieldErrors(parsed.error));
  }

  if (isUsingMemoryStore) {
    const idx = skillsStore.findIndex((s) => s.id === id);
    if (idx === -1) return notFound("Skill not found");
    const updated = { ...skillsStore[idx], ...parsed.data };
    skillsStore[idx] = updated;
    return ok(updated);
  }

  try {
    const { eq } = await import("drizzle-orm");
    const [row] = await db!
      .update(skillsTable)
      .set(parsed.data)
      .where(eq(skillsTable.id, id))
      .returning();
    return row ? ok(row) : notFound("Skill not found");
  } catch {
    return serverError("Failed to update skill");
  }
}

/** DELETE /api/skills/:id — remove a skill (admin). */
export async function DELETE(req: Request, ctx: Ctx) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const id = parseIdParam((await ctx.params).id);
  if (!id) return badRequest("Invalid skill id");

  if (isUsingMemoryStore) {
    const idx = skillsStore.findIndex((s) => s.id === id);
    if (idx === -1) return notFound("Skill not found");
    skillsStore.splice(idx, 1);
    return ok({ deleted: id });
  }

  try {
    const { eq } = await import("drizzle-orm");
    const [row] = await db!
      .delete(skillsTable)
      .where(eq(skillsTable.id, id))
      .returning({ id: skillsTable.id });
    return row ? ok({ deleted: row.id }) : notFound("Skill not found");
  } catch {
    return serverError("Failed to delete skill");
  }
}
