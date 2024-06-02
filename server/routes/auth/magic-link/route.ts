import { forgotPasswordSchema, loginSchema } from '@/validations/auth';
import { createRoute, z } from '@hono/zod-openapi';

export const createMagicLinkRoute = createRoute({
  method: 'post',
  path: '/api/auth/create-magic-link',
  tags: ['Auth'],
  summary: 'Forgot Password',
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: forgotPasswordSchema.openapi('Login'),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Success',
    },
    400: {
      description: 'Bad Request',
    },
    500: {
      description: 'Internal Server Error',
    },
  },
});

export const magicLinkRoute = createRoute({
  method: 'post',
  path: '/api/auth/magic-link',
  tags: ['Auth'],
  summary: 'magic link login',
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: z
            .object({
              email: z.string(),
              otp: z.string(),
            })
            .openapi('Login'),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Success',
    },
    400: {
      description: 'Bad Request',
    },
    500: {
      description: 'Internal Server Error',
    },
  },
});
