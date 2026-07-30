import { eq } from "drizzle-orm";
import { db } from "@/db";
import { skills } from "@/db/schema";
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
  try {
    const [row] = await db.select().from(skills).where(eq(skills.id, id));
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

  try {
    const [row] = await db
      .update(skills)
      .set(parsed.data)
      .where(eq(skills.id, id))
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

  try {
    const [row] = await db
      .delete(skills)
      .where(eq(skills.id, id))
      .returning({ id: skills.id });
    return row ? ok({ deleted: row.id }) : notFound("Skill not found");
  } catch {
    return serverError("Failed to delete skill");
  }
}
