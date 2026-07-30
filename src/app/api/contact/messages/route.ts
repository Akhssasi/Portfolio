import { db, isUsingMemoryStore } from "@/db";
import { contactMessages as contactMessagesTable } from "@/db/schema";
import { contactMessagesStore } from "@/db/static-data";
import { ok, requireAdmin, serverError } from "@/lib/api-utils";

export const dynamic = "force-dynamic";

/** GET /api/contact/messages — inbox for received messages (admin). */
export async function GET(req: Request) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  if (isUsingMemoryStore) {
    const rows = [...contactMessagesStore].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
    return ok(rows);
  }

  try {
    const { desc } = await import("drizzle-orm");
    const rows = await db!
      .select()
      .from(contactMessagesTable)
      .orderBy(desc(contactMessagesTable.createdAt));
    return ok(rows);
  } catch {
    return serverError("Failed to load messages");
  }
}
