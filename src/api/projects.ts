import useSWR from 'swr';
import qs from 'query-string';
import { useMemo } from 'react';

/** Utility **/
import { fetcher } from 'utils/axios';

/** Types **/
import { ProjectsCardData, ProjectData } from 'types/projects';
import { SortableFields, SortDirection } from 'types/sort';

interface ProjectsParams {
  page?: number;
  limit?: number;
  order_by?: SortableFields;
  order_dir?: SortDirection;
  search?: string;
  status?: string;
  project_status?: string;
  country?: string;
  continent?: string;
  horizon_group?: string;
  min_requested_fund?: number;
  max_requested_fund?: number;
}

/** API endpoint configuration **/
const endpoints = {
  base: 'projects',
  // individual project endpoint
  project: (projectId: any) => `${endpoints.base}/${projectId}`,
  // projects list endpoint with pagination and sorting
  projects: (params: ProjectsParams) =>
    `${endpoints.base}?${qs.stringify({
      page: params.page || 1,
      limit: params.limit || 10,
      order_by: params.order_by || 'id',
      order_dir: params.order_dir || 'desc',
      search: params.search,
      status: params.status,
      project_status: params.project_status,
      country: params.country,
      continent: params.continent,
      horizon_group: params.horizon_group,
      min_requested_fund: params.min_requested_fund,
      max_requested_fund: params.max_requested_fund
    })}`
};

export function useProjectsData(params: ProjectsParams) {
  const key = endpoints.projects(params);

  const { data, isLoading, error, mutate } = useSWR(key, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue: ProjectsCardData[] = useMemo(() => {
    if (!data?.data || !Array.isArray(data.data.items)) {
      return [];
    }

    return data.data.items.map((project: any) => ({
      link: `/projects/${project.id}`,
      ...project
    }));
  }, [data]);

  return {
    projectsData: memoizedValue,
    totalProjects: data?.data?.total_items ?? 0,
    total_pages: data?.data?.total_pages ?? 0,
    isLoading,
    error,
    mutate
  };
}

/**
 * Custom hook to fetch data for a specific project
 * @param projectId - The ID of the project to fetch data for
 * @returns An object containing project data, campaign data, fund data, metrics data, loading state, error state, and a mutate function
 */
export function useProjectData(projectId: number | string | undefined) {
  const { data, isLoading, error, mutate } = useSWR(endpoints.project(projectId), fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue: ProjectData = useMemo(() => {
    return data?.data.project;
  }, [data]);

  return {
    fundData: data?.data.fund,
    campaignData: data?.data.campaign,
    projectData: memoizedValue,
    fundingData: data?.data.funding,
    votingData: data?.data.voting,
    metricsData: data?.data.metrics,
    isLoading,
    error,
    mutate
  };
}
