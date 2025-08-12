import useSWR from 'swr';
import qs from 'query-string';
import { useMemo } from 'react';

/** Utility **/
import { fetcher } from 'utils/axios';

/** Types **/
import { ProjectData } from 'types/projects';
import { FundsCardData } from 'types/funds';
import { CampaignData } from 'types/campaign';
import { SortableFields, SortDirection } from 'types/sort';

// API endpoint configuration
const endpoints = {
  base: 'campaigns',
  // Individual campaign endpoint
  campaign: (campaignId: any) => `${endpoints.base}/${campaignId}`,
  // Multiple campaigns
  campaigns: ({ campaignId, page = 1, limit = 10, order_by = 'id', order_dir = 'asc', search, funding_status }: UseCampaignParams) =>
    `campaigns/${campaignId}/projects?${qs.stringify({ page, limit, order_by, order_dir, search, funding_status })}`,
  fund_campaigns: (fundId: any) => `${endpoints.base}/${fundId}/campaigns`
};

export function useCampaign(campaignId: any) {
  const { data, isLoading, error, mutate } = useSWR(endpoints.campaign(campaignId), fetcher, {
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
    totalProjects: data?.data?.total_projects || 0,
    isLoading,
    error,
    mutate
  };
}

interface UseCampaignParams {
  campaignId: any;
  page?: number;
  limit?: number;
  order_by?: SortableFields;
  order_dir?: SortDirection;
  search?: string;
  funding_status?: string;
}

export function useCampaignProjects({
  campaignId,
  page = 1,
  limit = 10,
  order_by = 'id',
  order_dir = 'asc',
  search,
  funding_status
}: UseCampaignParams) {
  const key = endpoints.campaigns({ campaignId, page, limit, order_by, order_dir, search, funding_status });

  const { data, isLoading, error, mutate } = useSWR(key, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue: ProjectData[] = useMemo(() => {
    return data?.data.items ?? [];
  }, [data]);

  return {
    fundData: data?.data?.fund,
    campaignsData: data?.data?.campaign,
    projectsData: memoizedValue,
    totalProjects: data?.data?.total_items,
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

export function useCampaignsPerFundData(fundId: any, sortField?: string, sortDirection: SortDirection = 'asc') {
  const params = { ...(sortField && { order_by: sortField }), order_dir: sortDirection };

  const { data, isLoading, error, mutate } = useSWR([endpoints.fund_campaigns(fundId), { params }], fetcher, {
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
    totalProjects: data?.data?.projects_count || 0,
    isLoading,
    error,
    mutate
  };
}
