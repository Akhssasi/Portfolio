import { db, isUsingMemoryStore } from "@/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (isUsingMemoryStore) {
    return Response.json({ ok: true, mode: "memory" });
  }
  try {
    const { sql } = await import("drizzle-orm");
    await db!.execute(sql`select 1`);
    return Response.json({ ok: true, mode: "postgresql" });
  } catch {
    return Response.json({ ok: false, mode: "postgresql" }, { status: 500 });
  }
}
