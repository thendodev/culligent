import { ESuggestionType, SuggestionSchema } from '@/validations/suggestions';
import { createRoute, z } from '@hono/zod-openapi';

export const createSuggestionRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['Suggestions'],
  summary: 'Create a suggestion',
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: SuggestionSchema.openapi('Suggestions'),
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
  500: {
    description: 'Internal Server Error',
  },
});

export const getSuggestionsRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Suggestions'],
  summary: 'Fetch suggestions',

  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: {
            data: SuggestionSchema.array().openapi('Suggestions'),
            metadata: z.any(),
          },
        },
      },
    },

    400: {
      description: 'Bad Request',
    },
    500: {
      description: 'Internal Server Error',
    },
  },
});
