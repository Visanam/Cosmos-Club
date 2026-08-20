/**
 * B1 database model: Neon Postgres only. All child-name, precise-age, payment,
 * Manus OAuth, and public-comment data models are intentionally absent.
 */
import { sql } from "drizzle-orm";
import { customType, index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const citext = customType<{ data: string; driverData: string }>({
  dataType() {
    return "citext";
  },
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: citext("email").notNull().unique(),
  emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
  username: citext("username").notNull().unique(),
  usernameFold: text("username_fold")
    .generatedAlwaysAs(
      sql`replace(replace(replace(translate(lower("username"), '015', 'ols'), '.', ''), '_', ''), '-', '')`
    )
    .notNull()
    .unique(),
  displayName: text("display_name"),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("user"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    userAgent: text("user_agent"),
    ipHash: text("ip_hash"),
  },
  table => [index("sessions_user_id_idx").on(table.userId), index("sessions_expires_at_idx").on(table.expiresAt)]
);

export const emailTokens = pgTable(
  "email_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    purpose: text("purpose").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    usedAt: timestamp("used_at", { withTimezone: true }),
  },
  table => [index("email_tokens_user_id_idx").on(table.userId), index("email_tokens_expires_at_idx").on(table.expiresAt)]
);

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: text("type").notNull(),
  schoolName: text("school_name"),
  contactName: text("contact_name").notNull(),
  contactEmail: citext("contact_email").notNull(),
  contactPhone: text("contact_phone").notNull(),
  gradeRange: text("grade_range"),
  eventType: text("event_type"),
  message: text("message").notNull(),
  source: text("source").notNull().default("website"),
  consentAt: timestamp("consent_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const savedMoments = pgTable(
  "saved_moments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    situationKey: text("situation_key").notNull(),
    ageBand: text("age_band").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  table => [index("saved_moments_user_id_idx").on(table.userId)]
);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;
