import { NOT_ADMIN_ERR_MSG, UNAUTHED_ERR_MSG } from "../../shared/const";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

const requireUser = t.middleware(async opts => {
  const { ctx, next } = opts;

  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(requireUser);

/**
 * Admin access has two routes:
 *   1. A signed-in user whose role is 'admin' (OAuth deployments).
 *   2. A matching `x-admin-token` header (self-hosted / Vercel deployments,
 *      where no OAuth portal exists). Set ADMIN_TOKEN in your environment.
 *
 * Timing-safe comparison so the token can't be guessed byte-by-byte.
 */
function hasValidAdminToken(header: unknown): boolean {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected || typeof header !== "string" || header.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ header.charCodeAt(i);
  return diff === 0;
}

export const adminProcedure = t.procedure.use(
  t.middleware(async opts => {
    const { ctx, next } = opts;

    const tokenOk = hasValidAdminToken(ctx.req?.headers["x-admin-token"]);
    if (!tokenOk && (!ctx.user || ctx.user.role !== 'admin')) {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  }),
);
