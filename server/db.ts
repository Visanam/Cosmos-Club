import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertLead, InsertOrder, InsertStoryComment, InsertUser, leads, orders, storyComments, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createLead(lead: InsertLead) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable. Please try again shortly.");
  await db.insert(leads).values(lead);
}

export async function createStoryComment(comment: Pick<InsertStoryComment, "page" | "displayName" | "message">) {
  const db = await getDb();
  if (!db) throw new Error("Discussion notes are unavailable. Please try again shortly.");
  await db.insert(storyComments).values({ ...comment, status: "pending" });
}

export async function listApprovedStoryComments(page: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({ id: storyComments.id, displayName: storyComments.displayName, message: storyComments.message, createdAt: storyComments.createdAt })
    .from(storyComments)
    .where(and(eq(storyComments.page, page), eq(storyComments.status, "approved")))
    .orderBy(desc(storyComments.createdAt))
    .limit(30);
}

export async function listPendingStoryComments() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select({ id: storyComments.id, page: storyComments.page, displayName: storyComments.displayName, message: storyComments.message, createdAt: storyComments.createdAt })
    .from(storyComments)
    .where(eq(storyComments.status, "pending"))
    .orderBy(desc(storyComments.createdAt));
}

export async function reviewStoryComment(id: number, status: "approved" | "rejected") {
  const db = await getDb();
  if (!db) throw new Error("Discussion notes are unavailable. Please try again shortly.");
  await db.update(storyComments).set({ status, reviewedAt: new Date() }).where(eq(storyComments.id, id));
}

/**
 * Record a completed purchase. Idempotent: Stripe retries webhooks, and the
 * unique stripeSessionId means a replay updates rather than duplicates.
 */
export async function recordOrder(order: InsertOrder) {
  const db = await getDb();
  if (!db) {
    console.error("[Database] Cannot record order: database not available", order.stripeSessionId);
    return;
  }
  await db.insert(orders).values(order).onDuplicateKeyUpdate({ set: { status: order.status ?? "paid" } });
}
