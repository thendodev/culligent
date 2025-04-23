import { objectIdValidator } from '@/validations/mongoose';
import { createRoute, z } from '@hono/zod-openapi';

export const otpPOST = createRoute({
  method: 'post',
  path: '/api/auth/otp',
  tags: ['Auth'],
  summary: 'Create OTP',
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: z
            .object({
              user: objectIdValidator,
            })
            .openapi('SendOtp'),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Success',
    },
  },
});

export const otpPUT = createRoute({
  method: 'put',
  path: '/api/auth/otp',
  tags: ['Auth'],
  summary: 'Verify OTP',
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: z
            .object({
              user: z.string(),
              otp: z.string(),
            })
            .openapi('VerfiyUser'),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Success',
    },
  },
});
