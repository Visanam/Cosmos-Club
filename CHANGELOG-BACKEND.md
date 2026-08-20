# Backend Changelog

## b0.1 — B1: Revive the API

This release replaces the non-working platform scaffold, MySQL database adapter, Stripe checkout paths, public-comment routes, and live tRPC server with a small Express REST foundation. The public health route now checks Neon through the pooled server-side connection and responds safely whether the database is available or not.

The data model is now Postgres-first and includes the foundations for adult accounts, sessions, email tokens, leads, and fixed-key saved moments. It intentionally contains no child name, photo, date of birth, precise age, child school, payment, order, entitlement, public-comment, Stripe, OAuth, or Manus-platform data.

The first explicit SQL migration is `drizzle/migrations/0000_b1_neon_foundation.sql`. It must be applied using the direct Neon migration connection; it must not be replaced with a schema push.
