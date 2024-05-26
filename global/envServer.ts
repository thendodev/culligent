import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

/**
 * Defines the environment variables used by the server-side application.
 * These variables are validated using the Zod library to ensure they are
 * of the expected type.
 *
 * The `emptyStringAsUndefined` option is set to `true` to handle cases where
 * an environment variable is set to an empty string, which would otherwise
 * cause a type mismatch error.
 */

export const envServer = createEnv({
  server: {
    DEV_MONGO_URI: z.string(),
    PROD_MONGO_URI: z.string(),
    UAT_MONGO_URI: z.string(),
    SALT_KEY: z.string(),
    AUTH_GOOGLE_CLIENT_ID: z.string(),
    AUTH_GOOGLE_CLIENT_SECRET: z.string(),
    AUTH_LINKEDIN_CLIENT_ID: z.string(),
    AUTH_LINKEDIN_CLIENT_SECRET: z.string(),
    RESEND_KEY: z.string(),
    DATABASE_NAME: z.string(),
    JWT_SECRET: z.any(),
    JWT_REFRESH_SECRET: z.any(),
    NEXT_PUBLIC_ENVIRONMENT: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
