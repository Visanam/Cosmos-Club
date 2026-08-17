import { COOKIE_NAME } from "../shared/const";
import { getPricingForCountry } from "../shared/pricing";
import Stripe from "stripe";
import { z } from "zod";
import { createLead, createStoryComment, listApprovedStoryComments, listPendingStoryComments, reviewStoryComment } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { makeSeasonOneLineItem, type CheckoutCurrency } from "./products";

const leadInput = z.object({
  type: z.enum(["school", "event"]),
  schoolName: z.string().trim().min(2).max(255).nullable(),
  contactName: z.string().trim().min(2).max(255),
  contactEmail: z.string().trim().email().max(320),
  contactPhone: z.string().trim().min(5).max(64),
  gradeRange: z.string().trim().min(2).max(128).nullable(),
  eventType: z.string().trim().min(2).max(128).nullable(),
  message: z.string().trim().min(6).max(4000),
});

export const storyCommentSchema = z.object({
  page: z.literal("season-1"),
  displayName: z.string().trim().min(2).max(80),
  message: z.string().trim().min(8).max(600),
});

export const storyCommentReviewSchema = z.object({
  id: z.number().int().positive(),
  status: z.enum(["approved", "rejected"]),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leads: router({
    create: publicProcedure.input(leadInput).mutation(async ({ input }) => {
      await createLead(input);
      return { success: true } as const;
    }),
  }),
  comments: router({
    listPublic: publicProcedure.input(z.object({ page: z.literal("season-1") })).query(({ input }) => listApprovedStoryComments(input.page)),
    submit: publicProcedure.input(storyCommentSchema).mutation(async ({ input }) => {
      await createStoryComment(input);
      return { success: true } as const;
    }),
    listPending: adminProcedure.query(() => listPendingStoryComments()),
    review: adminProcedure.input(storyCommentReviewSchema).mutation(async ({ input }) => {
      await reviewStoryComment(input.id, input.status);
      return { success: true } as const;
    }),
  }),
  checkout: router({
    createSession: publicProcedure.input(z.object({
      parentName: z.string().trim().min(2).max(160),
      childNameAge: z.string().trim().min(2).max(160),
      valueFocus: z.string().trim().min(2).max(100),
      // The browser tells us WHICH market it is in. It does not get to say what
      // that market costs — otherwise anyone could edit the request and buy a
      // season for one rupee. The amount is resolved server-side, below.
      country: z.string().trim().min(2).max(64),
    })).mutation(async ({ input, ctx }) => {
      const secret = process.env.STRIPE_SECRET_KEY;
      if (!secret) throw new Error("Secure checkout is not configured yet.");
      const stripe = new Stripe(secret);
      const origin = ctx.req.headers.origin || `${ctx.req.protocol}://${ctx.req.get("host")}`;

      // Authoritative price lookup. Never trust a client-supplied amount.
      const tier = getPricingForCountry(input.country);
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_creation: "always",
        allow_promotion_codes: true,
        client_reference_id: ctx.user?.id.toString(),
        line_items: [makeSeasonOneLineItem(tier.currency as CheckoutCurrency, tier.amount)],
        success_url: `${origin}/checkout?success=true`,
        cancel_url: `${origin}/checkout?cancelled=true`,
        customer_email: ctx.user?.email ?? undefined,
        metadata: {
          user_id: ctx.user?.id.toString() ?? "guest",
          customer_email: ctx.user?.email ?? "guest",
          customer_name: ctx.user?.name ?? input.parentName,
          parent_name: input.parentName,
          child_name_age: input.childNameAge,
          value_focus: input.valueFocus,
          country: tier.country,
          amount: String(tier.amount),
          currency: tier.currency,
        },
      });
      if (!session.url) throw new Error("Stripe did not return a checkout link.");
      return { url: session.url };
    }),
  }),
});

export type AppRouter = typeof appRouter;
