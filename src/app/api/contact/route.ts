import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import {
  badRequest,
  created,
  parseJsonBody,
  serverError,
} from "@/lib/api-utils";
import { contactInputSchema, zodFieldErrors } from "@/lib/validators";

export const dynamic = "force-dynamic";

/**
 * POST /api/contact — receive a contact message (public).
 * Validates the payload, persists it to PostgreSQL and returns 201.
 */
export async function POST(req: Request) {
  const { body, error } = await parseJsonBody(req);
  if (error) return error;

  const parsed = contactInputSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Validation failed", zodFieldErrors(parsed.error));
  }

  try {
    const [row] = await db
      .insert(contactMessages)
      .values({ ...parsed.data, status: "new" })
      .returning({ id: contactMessages.id, createdAt: contactMessages.createdAt });
    return created({ success: true, messageId: row.id });
  } catch {
    return serverError("Failed to save message");
  }
}
