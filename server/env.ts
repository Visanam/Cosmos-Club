/**
 * B1 environment contract: server-only values only. No value is committed here.
 * This module intentionally reads lazily so `/api/health` can report a safe 503
 * rather than failing at serverless module initialization when a value is absent.
 */
function optional(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

export const env = {
  databaseUrl: optional("DATABASE_URL"),
  directDatabaseUrl: optional("DIRECT_DATABASE_URL"),
  sessionSecret: optional("SESSION_SECRET"),
  passwordPepper: optional("PASSWORD_PEPPER"),
  adminToken: optional("ADMIN_TOKEN"),
  cronSecret: optional("CRON_SECRET"),
  resendApiKey: optional("RESEND_API_KEY"),
  resendWebhookSecret: optional("RESEND_WEBHOOK_SECRET"),
  emailFrom: optional("EMAIL_FROM"),
  emailReplyTo: optional("EMAIL_REPLY_TO"),
  emailInternalTo: optional("EMAIL_INTERNAL_TO"),
  r2AccountId: optional("R2_ACCOUNT_ID"),
  r2AccessKeyId: optional("R2_ACCESS_KEY_ID"),
  r2SecretAccessKey: optional("R2_SECRET_ACCESS_KEY"),
  r2Bucket: optional("R2_BUCKET"),
  r2Endpoint: optional("R2_ENDPOINT"),
  upstashRedisRestUrl: optional("UPSTASH_REDIS_REST_URL"),
  upstashRedisRestToken: optional("UPSTASH_REDIS_REST_TOKEN"),
  qstashToken: optional("QSTASH_TOKEN"),
  qstashCurrentSigningKey: optional("QSTASH_CURRENT_SIGNING_KEY"),
  qstashNextSigningKey: optional("QSTASH_NEXT_SIGNING_KEY"),
  appOrigin: optional("APP_ORIGIN"),
  nodeEnv: process.env.NODE_ENV ?? "development",
} as const;

export function requireDatabaseUrl(): string {
  if (!env.databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return env.databaseUrl;
}
