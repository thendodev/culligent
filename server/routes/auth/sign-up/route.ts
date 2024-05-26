import { signUpSchema } from '@/validations/auth';
import { createRoute, z } from '@hono/zod-openapi';
import { ObjectId } from 'mongodb';

export const signUpRoute = createRoute({
  method: 'post',
  path: '/api/auth/sign-up',
  tags: ['Auth'],
  summary: 'Register user',
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: signUpSchema.openapi('SignUp'),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z
            .object({
              name: z.string().min(1),
              email: z
                .string()
                .refine(
                  (i) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(i),
                  {
                    message: 'Invalid email',
                  },
                ),
              _id: z.string().refine((i) => !!new ObjectId(i)),
              surname: z.string().optional(),
              isVerified: z.boolean().optional(),
            })
            .openapi('SignUpResponse'),
        },
      },
      description: 'Success',
    },
    500: {
      description: 'Internal Server Error',
    },
  },
});
