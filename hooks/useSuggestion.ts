import { EGenericQueryKeys } from '@/global/config';
import { handleGetSuggestions } from '@/handlers/handleSuggestions';
import { ESuggestionType } from '@/validations/suggestions';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useSuggestive = (type: ESuggestionType, query: string) => {
  const { data, isFetching, error, fetchNextPage, fetchPreviousPage } =
    useInfiniteQuery({
      queryKey: [EGenericQueryKeys, query],
      queryFn: ({ signal }) => {
        return handleGetSuggestions({
          type,
          query,
          page: 1,
          limit: 10,
          cancelToken: signal,
        });
      },
      getNextPageParam: (lastPage, pages) => {
        const totalPages = Math.ceil(lastPage.metadata.total / 10);
        return totalPages > pages.length ? pages.length + 1 : undefined;
      },

      initialPageParam: 1,
      enabled: query.length > 0,
      staleTime: 0,
    });

  return {
    results: data?.pages[0].queries,
    metadata: data?.pages[0].metadata,
    isFetching,
    error,
    fetchNextPage,
    fetchPreviousPage,
  };
};
