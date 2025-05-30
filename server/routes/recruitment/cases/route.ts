import { CaseSchema } from '@/validations/cases';
import { objectIdValidator } from '@/validations/mongoose';
import { createRoute, z } from '@hono/zod-openapi';

export const createCaseRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['Case'],
  summary: 'Create a new case',
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: CaseSchema.openapi('Cases'),
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
  500: {
    description: 'Internal Server Error',
  },
});
export const getCaseRoute = createRoute({
  method: 'get',
  path: '/:id',
  tags: ['Case'],
  summary: 'Fetch single user cases',
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
      content: {
        'application/json': {
          schema: CaseSchema.openapi('Cases'),
        },
      },
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
export const getCasesRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Case'],
  summary: 'Fetch all user cases',
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: CaseSchema.array().openapi('Cases'),
        },
      },
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

export const updateCaseRoute = createRoute({
  method: 'put',
  path: '/:id',
  tags: ['Case'],
  summary: 'Create a new case',
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
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: CaseSchema.openapi('Cases'),
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
  400: {
    description: 'Bad Request',
  },
  404: {
    description: 'Not Found',
  },
  500: {
    description: 'Internal Server Error',
  },
});
export const deleteCaseRoute = createRoute({
  method: 'put',
  path: '/',
  tags: ['Case'],
  summary: 'Delete case',
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
});
export const shareCaseRoute = createRoute({
  method: 'put',
  path: '/share/ :userId/:caseId',
  tags: ['Case'],
  summary: 'Share case',
  responses: {
    200: {
      description: 'Success',
    },
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
});

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/share',
  tags: ['Case'],
  summary: 'Fetch single user cases',
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: CaseSchema.openapi('Cases'),
        },
      },
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
