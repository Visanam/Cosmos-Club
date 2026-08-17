import express, { type Express } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./_core/oauth";
import { appRouter } from "./routers";
import { createContext } from "./_core/context";
import { registerStripeWebhook } from "./stripeWebhook";

/**
 * Builds the API. Deliberately does NOT call listen() and does NOT serve the
 * front-end, so the exact same app can run in three places:
 *
 *   • local dev      — server/_core/index.ts wraps it with Vite middleware
 *   • a normal box   — server/_core/index.ts serves dist/public statically
 *   • Vercel         — api/index.ts exports it as a serverless function, and
 *                      Vercel's CDN serves the built front-end
 */
export function createApp(): Express {
  const app = express();

  // Stripe signature verification needs the raw body, so this must be
  // registered before any JSON body parser touches the request.
  registerStripeWebhook(app);

  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ limit: "5mb", extended: true }));

  // OAuth is optional. Without a portal configured the routes simply never
  // succeed, and moderation falls back to ADMIN_TOKEN.
  registerOAuthRoutes(app);

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, time: new Date().toISOString() });
  });

  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  return app;
}
