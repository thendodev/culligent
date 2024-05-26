import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const envPublic = createEnv({
  client: {
    NEXT_PUBLIC_ENVIRONMENT: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  },
});
