import { eq } from "drizzle-orm";
import { db } from "@/db";
import { experience } from "@/db/schema";
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
  try {
    const [row] = await db
      .select()
      .from(experience)
      .where(eq(experience.id, id));
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

  try {
    const [row] = await db
      .update(experience)
      .set(parsed.data)
      .where(eq(experience.id, id))
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

  try {
    const [row] = await db
      .delete(experience)
      .where(eq(experience.id, id))
      .returning({ id: experience.id });
    return row ? ok({ deleted: row.id }) : notFound("Experience entry not found");
  } catch {
    return serverError("Failed to delete experience entry");
  }
}
