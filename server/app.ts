/**
 * B1 REST API: origin-closed, JSON-only, and independent of the retired platform.
 * Future endpoint modules must preserve the documented JSON error envelope.
 */
import { randomUUID } from "node:crypto";
import express, { type ErrorRequestHandler, type Express, type RequestHandler } from "express";
import { pingDatabase } from "./db.js";

const BACKEND_VERSION = "b0.2";

function log(event: string, details: Record<string, unknown> = {}): void {
  console.log(
    JSON.stringify({
      level: "info",
      event,
      time: new Date().toISOString(),
      ...details,
    })
  );
}

const requestLogger: RequestHandler = (req, res, next) => {
  const requestId = req.header("x-request-id")?.slice(0, 128) || randomUUID();
  res.setHeader("x-request-id", requestId);

  const startedAt = Date.now();
  res.on("finish", () => {
    log("http_request", {
      requestId,
      method: req.method,
      path: req.path,
      status: res.statusCode,
      durationMs: Date.now() - startedAt,
    });
  });

  next();
};

const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  const requestId = String(res.getHeader("x-request-id") || randomUUID());
  log("api_error", {
    requestId,
    method: req.method,
    path: req.path,
    errorType: error instanceof Error ? error.name : "UnknownError",
  });

  if (res.headersSent) {
    return;
  }

  res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "Something went wrong. Please try again.",
      requestId,
    },
  });
};

/** Builds an Express handler for both Vercel and the local development shim. */
export function createApp(): Express {
  const app = express();
  app.disable("x-powered-by");
  app.use(requestLogger);
  app.use(express.json({ limit: "100kb" }));

  app.get("/api/health", async (_req, res) => {
    try {
      await pingDatabase();
      res.status(200).json({
        ok: true,
        version: BACKEND_VERSION,
        db: "up",
        time: new Date().toISOString(),
      });
    } catch {
      // Deliberately never expose a connection string, SQL error, or stack trace.
      res.status(503).json({ ok: false, db: "down" });
    }
  });

  app.use("/api", (_req, res) => {
    res.status(404).json({
      error: {
        code: "NOT_FOUND",
        message: "This API route does not exist.",
      },
    });
  });

  app.use(errorHandler);
  return app;
}
