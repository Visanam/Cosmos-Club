import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["school", "event"]).notNull(),
  schoolName: varchar("schoolName", { length: 255 }),
  contactName: varchar("contactName", { length: 255 }).notNull(),
  contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
  contactPhone: varchar("contactPhone", { length: 64 }).notNull(),
  gradeRange: varchar("gradeRange", { length: 128 }),
  eventType: varchar("eventType", { length: 128 }),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type InsertLead = typeof leads.$inferInsert;

export const storyComments = mysqlTable("storyComments", {
  id: int("id").autoincrement().primaryKey(),
  page: varchar("page", { length: 64 }).notNull(),
  displayName: varchar("displayName", { length: 80 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  reviewedAt: timestamp("reviewedAt"),
});

export type InsertStoryComment = typeof storyComments.$inferInsert;

/**
 * A completed Stripe purchase. Written by the webhook so fulfilment never has
 * to be reconstructed from the Stripe dashboard — the value focus captured at
 * checkout is what the parent wraparound is built from.
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  stripeSessionId: varchar("stripeSessionId", { length: 255 }).notNull().unique(),
  parentName: varchar("parentName", { length: 255 }),
  customerEmail: varchar("customerEmail", { length: 320 }),
  childNameAge: varchar("childNameAge", { length: 255 }),
  valueFocus: varchar("valueFocus", { length: 100 }),
  country: varchar("country", { length: 64 }),
  currency: varchar("currency", { length: 8 }),
  /** Amount actually charged, in the currency's smallest unit (paise, cents). */
  amount: int("amount"),
  status: mysqlEnum("orderStatus", ["paid", "refunded"]).default("paid").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
