import useSWR from 'swr';
import { useMemo } from 'react';
import { fetcher } from 'utils/axios';
import { CampaignData } from 'types/campaign';

// API endpoint configuration
const endpoints = {
  base: 'campaigns',
  campaigns: (campaignId: any) => `${endpoints.base}/${campaignId}`
};

export function useCampaign(campaignId: any) {
  const { data, isLoading, error, mutate } = useSWR(endpoints.campaigns(campaignId), fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue: CampaignData = useMemo(() => {
    return data?.data.campaign;
  }, [data]);

  return {
    fundData: data?.data.fund,
    campaignsData: memoizedValue,
    totalIdeas: data?.data?.total_ideas || 0,
    isLoading,
    error,
    mutate
  };
}
