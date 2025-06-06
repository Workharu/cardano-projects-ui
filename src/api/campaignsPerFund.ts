import useSWR from 'swr';
import { useMemo } from 'react';
import { fetcher } from 'utils/axios';
import { FundsCardData } from 'types/funds';

// API endpoint configuration
const endpoints = {
  base: 'funds',
  campaigns: (fundId: any) => `${endpoints.base}/${fundId}/campaigns`
};

type SortDirection = 'asc' | 'desc';

export function useCampaignsPerFundData(fundId: any, sortField?: string, sortDirection: SortDirection = 'asc') {
  const params = {
    ...(sortField && { order_by: sortField }),
    order_dir: sortDirection
  };

  const { data, isLoading, error, mutate } = useSWR([endpoints.campaigns(fundId), { params }], fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue: FundsCardData[] = useMemo(() => {
    const campaignsData = data?.data?.items || [];

    if (!Array.isArray(campaignsData)) {
      return [];
    }

    return campaignsData.map((campaign: any) => ({
      id: campaign.id,
      name: campaign.name,
      created_at: campaign.created_at,
      updated_at: campaign.updated_at,
      total: campaign.total || 0,
      link: `/campaigns/${campaign.id}`
    }));
  }, [data]);

  return {
    fundData: data?.data.fund || null,
    campaignsData: memoizedValue,
    totalCampaigns: data?.data?.count || memoizedValue.length,
    totalIdeas: data?.data?.ideas_count || 0,
    isLoading,
    error,
    mutate
  };
}
