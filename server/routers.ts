/**
 * Compile-only bridge for the untouched frontend during the REST transition.
 * There is no `/api/trpc` runtime route. These procedure definitions exist only
 * to preserve the untouched frontend's TypeScript contract until its dead
 * community-note and legacy auth UI are removed in a frontend release.
 */
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";

const t = initTRPC.create({ transformer: superjson });

const legacyUser = z
  .object({
    id: z.string(),
    email: z.string().email().nullable(),
    displayName: z.string().nullable(),
    role: z.enum(["user", "admin"]),
  })
  .nullable();

const legacyNote = z.object({
  id: z.number().int().positive(),
  displayName: z.string(),
  message: z.string(),
  createdAt: z.date(),
});

export const appRouter = t.router({
  auth: t.router({
    me: t.procedure.output(legacyUser).query(() => null),
    logout: t.procedure.output(z.object({ success: z.literal(true) })).mutation(() => ({ success: true as const })),
  }),
  comments: t.router({
    listPublic: t.procedure
      .input(z.object({ page: z.literal("season-1") }))
      .output(z.array(legacyNote))
      .query(() => []),
    submit: t.procedure
      .input(z.object({ page: z.literal("season-1"), displayName: z.string(), message: z.string() }))
      .output(z.object({ success: z.literal(true) }))
      .mutation(() => ({ success: true as const })),
    listPending: t.procedure.output(z.array(legacyNote)).query(() => []),
    review: t.procedure
      .input(z.object({ id: z.number().int().positive(), status: z.enum(["approved", "rejected"]) }))
      .output(z.object({ success: z.literal(true) }))
      .mutation(() => ({ success: true as const })),
  }),
});

export type AppRouter = typeof appRouter;
