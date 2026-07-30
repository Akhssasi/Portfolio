import { db, isUsingMemoryStore } from "@/db";
import { contactMessages as contactMessagesTable } from "@/db/schema";
import { contactMessagesStore, nextMessageIdValue } from "@/db/static-data";
import {
  badRequest,
  created,
  parseJsonBody,
  serverError,
} from "@/lib/api-utils";
import { contactInputSchema, zodFieldErrors } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { body, error } = await parseJsonBody(req);
  if (error) return error;

  const parsed = contactInputSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest("Validation failed", zodFieldErrors(parsed.error));
  }

  if (isUsingMemoryStore) {
    const id = nextMessageIdValue();
    const row = {
      id,
      ...parsed.data,
      status: "new",
      createdAt: new Date(),
    } as (typeof contactMessagesStore)[number];
    contactMessagesStore.push(row);
    return created({ success: true, messageId: id });
  }

  try {
    const [row] = await db!
      .insert(contactMessagesTable)
      .values({ ...parsed.data, status: "new" })
      .returning({ id: contactMessagesTable.id, createdAt: contactMessagesTable.createdAt });
    return created({ success: true, messageId: row.id });
  } catch {
    return serverError("Failed to save message");
  }
}
