import useSWR from 'swr';
import { useMemo } from 'react';
import qs from 'query-string';
import { fetcher } from 'utils/axios';
import { IdeaData } from 'types/idea';

type SortDirection = 'asc' | 'desc';
type SortableFields = string; // You can restrict to exact fields if desired

interface UseCampaignParams {
  campaignId: any;
  page?: number;
  limit?: number;
  order_by?: SortableFields;
  order_dir?: SortDirection;
}

const endpoints = {
  campaigns: ({ campaignId, page = 1, limit = 10, order_by = 'id', order_dir = 'asc' }: UseCampaignParams) =>
    `campaigns/${campaignId}/ideas?${qs.stringify({
      page,
      limit,
      order_by,
      order_dir
    })}`
};

export function useCampaignIdeas({ campaignId, page = 1, limit = 10, order_by = 'id', order_dir = 'asc' }: UseCampaignParams) {
  const key = endpoints.campaigns({ campaignId, page, limit, order_by, order_dir });

  const { data, isLoading, error, mutate } = useSWR(key, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue: IdeaData[] = useMemo(() => {
    return data?.data.items ?? [];
  }, [data]);

  return {
    fundData: data?.data?.fund,
    campaignsData: data?.data?.campaign,
    ideasData: memoizedValue,
    totalIdeas: data?.data?.total_items,
    page: data?.data?.page || 1,
    limit: data?.data?.limit || 10,
    count: data?.data?.count,
    total_pages: data?.data?.total_pages || 1,
    has_next: data?.data?.has_next || false,
    isLoading,
    error,
    mutate
  };
}
