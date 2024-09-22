import { postsValidationSchema } from '@/validations/posts';
import { createRoute, z } from '@hono/zod-openapi';

export const createPostRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['Post'],
  summary: 'Create a new posts',
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: postsValidationSchema.openapi('Posts'),
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
export const getPostRoute = createRoute({
  method: 'get',
  path: '/:id',
  tags: ['Post'],
  summary: 'Fetch single post',
  request: {
    params: z.object({
      id: z.string().openapi('Post ID'),
    }),
  },
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: postsValidationSchema.openapi('Cases'),
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
export const getPostsRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Post'],
  summary: 'Fetch all posts',
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: postsValidationSchema.array().openapi('Cases'),
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

export const updatePostRoute = createRoute({
  method: 'put',
  path: '/:id',
  tags: ['Post'],
  summary: 'Update a new post',
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: postsValidationSchema.openapi('Cases'),
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
export const deletePostRoute = createRoute({
  method: 'put',
  path: '/',
  tags: ['Post'],
  summary: 'Delete post',
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
