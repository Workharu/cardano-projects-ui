import useSWR from 'swr';
import qs from 'query-string';
import { useMemo } from 'react';

/** Utility **/
import { fetcher } from 'utils/axios';

/** Types **/
import { IdeasCardData, IdeaData } from 'types/ideas';
import { SortableFields, SortDirection } from 'types/sort';

interface IdeasParams {
  page?: number;
  limit?: number;
  order_by?: SortableFields;
  order_dir?: SortDirection;
}

/** API endpoint configuration **/
const endpoints = {
  base: 'ideas',
  // individual idea endpoint
  idea: (ideaId: any) => `${endpoints.base}/${ideaId}`,
  // ideas list endpoint with pagination and sorting
  ideas: ({ page = 1, limit = 10, order_by = 'id', order_dir = 'asc' }: IdeasParams) =>
    `${endpoints.base}?${qs.stringify({
      page,
      limit,
      order_by,
      order_dir
    })}`
};

export function useIdeasData({ page = 1, limit = 10, order_by = 'id', order_dir = 'asc' }: IdeasParams) {
  const key = endpoints.ideas({ page, limit, order_by, order_dir });

  const { data, isLoading, error, mutate } = useSWR(key, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue: IdeasCardData[] = useMemo(() => {
    const ideasData = data?.data.items || [];

    if (!Array.isArray(ideasData)) {
      return [];
    }

    return ideasData.map((idea: any) => ({
      id: idea.id,
      title: idea.title,
      idea_number: idea.idea_number,
      description: idea.description,
      submitter_name: idea.submitter_name,
      created_at: idea.created_at,
      kudo_count: idea.kudo_count || 0,
      link: `/ideas/${idea.id}`,
      campaign: {
        id: idea.campaign_id,
        name: idea.campaign_name
      },
      fund: {
        id: idea.fund_id,
        name: idea.fund_name
      }
    }));
  }, [data]);

  return {
    ideasData: memoizedValue,
    totalIdeas: data?.data.total_items || 0,
    total_pages: data?.data.total_pages || 0,
    isLoading,
    error,
    mutate
  };
}

/**
 * Custom hook to fetch data for a specific idea
 * @param ideaId - The ID of the idea to fetch data for
 * @returns { fundData, campaignData, ideaData, isLoading, error, mutate }
 * @typedef {Object} IdeaData
 */
export function useIdeaData(ideaId: number | string | undefined) {
  const { data, isLoading, error, mutate } = useSWR(endpoints.idea(ideaId), fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue: IdeaData = useMemo(() => {
    return data?.data.idea;
  }, [data]);

  return {
    fundData: data?.data.fund,
    campaignData: data?.data.campaign,
    ideaData: memoizedValue,
    isLoading,
    error,
    mutate
  };
}
