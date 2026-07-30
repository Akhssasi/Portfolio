import { db, isUsingMemoryStore } from "@/db";
import { experience as experienceTable } from "@/db/schema";
import { experienceStore } from "@/db/static-data";
import {
  badRequest,
  notFound,
  ok,
  parseIdParam,
  parseJsonBody,
  requireAdmin,
  serverError,
} from "@/lib/api-utils";
import { experienceUpdateSchema, zodFieldErrors } from "@/lib/validators";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const id = parseIdParam((await ctx.params).id);
  if (!id) return badRequest("Invalid experience id");

  if (isUsingMemoryStore) {
    const row = experienceStore.find((e) => e.id === id);
    return row ? ok(row) : notFound("Experience entry not found");
  }

  try {
    const { eq } = await import("drizzle-orm");
    const [row] = await db!
      .select()
      .from(experienceTable)
      .where(eq(experienceTable.id, id));
    return row ? ok(row) : notFound("Experience entry not found");
  } catch {
    return serverError("Failed to load experience entry");
  }
}

/** PUT /api/experience/:id — update a timeline entry (admin). */
export async function PUT(req: Request, ctx: Ctx) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const id = parseIdParam((await ctx.params).id);
  if (!id) return badRequest("Invalid experience id");

  const { body, error } = await parseJsonBody(req);
  if (error) return error;

  const parsed = experienceUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Validation failed", zodFieldErrors(parsed.error));
  }

  if (isUsingMemoryStore) {
    const idx = experienceStore.findIndex((e) => e.id === id);
    if (idx === -1) return notFound("Experience entry not found");
    const updated = { ...experienceStore[idx], ...parsed.data };
    experienceStore[idx] = updated;
    return ok(updated);
  }

  try {
    const { eq } = await import("drizzle-orm");
    const [row] = await db!
      .update(experienceTable)
      .set(parsed.data)
      .where(eq(experienceTable.id, id))
      .returning();
    return row ? ok(row) : notFound("Experience entry not found");
  } catch {
    return serverError("Failed to update experience entry");
  }
}

/** DELETE /api/experience/:id — remove a timeline entry (admin). */
export async function DELETE(req: Request, ctx: Ctx) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  const id = parseIdParam((await ctx.params).id);
  if (!id) return badRequest("Invalid experience id");

  if (isUsingMemoryStore) {
    const idx = experienceStore.findIndex((e) => e.id === id);
    if (idx === -1) return notFound("Experience entry not found");
    experienceStore.splice(idx, 1);
    return ok({ deleted: id });
  }

  try {
    const { eq } = await import("drizzle-orm");
    const [row] = await db!
      .delete(experienceTable)
      .where(eq(experienceTable.id, id))
      .returning({ id: experienceTable.id });
    return row ? ok({ deleted: row.id }) : notFound("Experience entry not found");
  } catch {
    return serverError("Failed to delete experience entry");
  }
}
