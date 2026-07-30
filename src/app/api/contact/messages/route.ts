import { desc } from "drizzle-orm";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { ok, requireAdmin, serverError } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

/** GET /api/contact/messages — inbox for received messages (admin). */
export async function GET(req: Request) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  try {
    const rows = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
    return ok(rows);
  } catch {
    return serverError("Failed to load messages");
  }
}
