-- B1: Visanam Neon/Postgres foundation. Apply only through `pnpm db:migrate`.
-- This migration deliberately contains no child name, photo, DOB, school, precise age,
-- Stripe, order, entitlement, or public-comment data structures.

CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "email" citext NOT NULL UNIQUE,
  "email_verified_at" timestamptz,
  "username" citext NOT NULL UNIQUE,
  "username_fold" text GENERATED ALWAYS AS (
    replace(replace(replace(translate(lower("username"), '015', 'ols'), '.', ''), '_', ''), '-', '')
  ) STORED NOT NULL UNIQUE,
  "display_name" text,
  "password_hash" text NOT NULL,
  "role" text NOT NULL DEFAULT 'user',
  "status" text NOT NULL DEFAULT 'active',
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "last_login_at" timestamptz,
  "deleted_at" timestamptz,
  CONSTRAINT "users_role_check" CHECK ("role" IN ('user', 'admin')),
  CONSTRAINT "users_status_check" CHECK ("status" IN ('active', 'suspended', 'deleted'))
);

CREATE TABLE "sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "token_hash" text NOT NULL UNIQUE,
  "expires_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "user_agent" text,
  "ip_hash" text
);

CREATE INDEX "sessions_user_id_idx" ON "sessions" ("user_id");
CREATE INDEX "sessions_expires_at_idx" ON "sessions" ("expires_at");

CREATE TABLE "email_tokens" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "token_hash" text NOT NULL UNIQUE,
  "purpose" text NOT NULL,
  "expires_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "used_at" timestamptz,
  CONSTRAINT "email_tokens_purpose_check" CHECK ("purpose" IN ('verify', 'reset'))
);

CREATE INDEX "email_tokens_user_id_idx" ON "email_tokens" ("user_id");
CREATE INDEX "email_tokens_expires_at_idx" ON "email_tokens" ("expires_at");

CREATE TABLE "leads" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "type" text NOT NULL,
  "school_name" text,
  "contact_name" text NOT NULL,
  "contact_email" citext NOT NULL,
  "contact_phone" text NOT NULL,
  "grade_range" text,
  "event_type" text,
  "message" text NOT NULL,
  "source" text NOT NULL DEFAULT 'website',
  "consent_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT "leads_type_check" CHECK ("type" IN ('school', 'event'))
);

CREATE TABLE "saved_moments" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "situation_key" text NOT NULL,
  "age_band" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX "saved_moments_user_id_idx" ON "saved_moments" ("user_id");

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER users_set_updated_at
BEFORE UPDATE ON "users"
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
