/**
 * Vercel serverless entry point.
 *
 * Everything under /api/* is rewritten here by vercel.json. An Express app is
 * already a (req, res) handler, so it can be exported directly.
 *
 * The front-end is NOT served from here — Vercel's CDN serves the Vite build
 * from dist/public, which is far faster and cheaper than proxying it through a
 * function.
 */
import "dotenv/config";
import { createApp } from "../server/app.js";

export default createApp();
