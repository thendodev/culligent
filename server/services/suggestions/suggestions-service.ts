import { ApiResponse } from '@/global/response.types';
import Suggestion from '@/models/Suggestion';
import { TSuggestion } from '@/validations/suggestions';
import { HttpStatusCode } from 'axios';
import { ObjectId, WithId } from 'mongodb';

type TSuggestionPagination = {
  userId: ObjectId;
  page: number;
  limit: number;
};
export const getSuggestionsService = async ({
  query,
  type,
  page,
  limit,
  userId,
}: TSuggestion & TSuggestionPagination): Promise<ApiResponse<any>> => {
  const queries = await Suggestion.aggregate([
    {
      $match: {
        userId: userId,
        query: { $regex: query, $options: 'i' },
        type: type,
      },
    },
    {
      $facet: {
        metadata: [
          {
            $count: 'total',
          },
        ],
        data: [
          {
            $skip: (page - 1) * limit,
          },
          {
            $limit: limit,
          },
        ],
      },
    },
  ]);

  return {
    data: {
      queries: queries[0].data,
      metadata: queries[0].metadata[0],
    },
    success: true,
    message: 'Auto complete results',
    code: HttpStatusCode.Ok,
  };
};

export const createSuggestionService = async (
  data: TSuggestion & { userId: ObjectId },
): Promise<ApiResponse<WithId<TSuggestion>>> => {
  const query = await Suggestion.create(data);
  return {
    data: query,
    success: true,
    message: 'Auto complete query created',
    code: HttpStatusCode.Created,
  };
};
