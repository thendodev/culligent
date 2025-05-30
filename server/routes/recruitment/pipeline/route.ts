import { mongooseObjectId, objectIdValidator } from '@/validations/mongoose';
import PipelineValidationSchema from '@/validations/pipeline';
import { createRoute, z } from '@hono/zod-openapi';

export const createPipelineRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['Pipeline'],
  summary: 'Create a new pipeline',
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: PipelineValidationSchema.openapi('Pipeline'),
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
export const getPipelineRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Pipeline'],
  summary: 'get an existing pipeline',
  request: {
    params: z
      .object({
        id: objectIdValidator,
      })
      .openapi({
        param: {
          name: 'id',
          in: 'path',
        },
      }),
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
export const updatePipelineRoute = createRoute({
  method: 'put',
  path: '/:id',
  tags: ['Pipeline'],
  summary: 'update an existing pipeline',
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema:
            PipelineValidationSchema.extend(mongooseObjectId).openapi(
              'Pipeline',
            ),
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
    404: {
      description: 'Not Found',
    },
    500: {
      description: 'Internal Server Error',
    },
  },
});
