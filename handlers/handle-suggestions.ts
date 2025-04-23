import { TWithId } from '@/global/types';
import { privateRequest } from '@/lib/requests';
import { ESuggestionType, TSuggestion } from '@/validations/suggestions';

enum ESuggestionRoute {
  suggestion = 'search/suggestions/',
}

export const handleCreateSuggestion = async (body: TSuggestion) => {
  const { data } = await privateRequest.post<TWithId<TSuggestion>>(
    `${ESuggestionRoute.suggestion}`,
    body,
  );
  return data;
};

type TGetSuggestion = {
  query: string;
  type: ESuggestionType;
  page: number;
  limit: number;
  cancelToken?: AbortSignal;
};

export type TGetSuggestionResponse = {
  metadata: {
    total: number;
  };
  queries: TWithId<TSuggestion>[];
};
export const handleGetSuggestions = async ({
  type,
  query,
  page,
  limit,
  cancelToken,
}: TGetSuggestion) => {
  const { data } = await privateRequest.get<TGetSuggestionResponse>(
    `${ESuggestionRoute.suggestion}?query=${query}&type=${type}&limit=${limit}&page=${page}`,
    {
      signal: cancelToken,
    },
  );
  return data;
};
