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
}

/** API endpoint configuration **/
const endpoints = {
  base: 'projects',
  // individual project endpoint
  project: (projectId: any) => `${endpoints.base}/${projectId}`,
  // projects list endpoint with pagination and sorting
  projects: ({ page = 1, limit = 10, order_by = 'id', order_dir = 'asc' }: ProjectsParams) =>
    `${endpoints.base}?${qs.stringify({
      page,
      limit,
      order_by,
      order_dir
    })}`
};

export function useProjectsData({ page = 1, limit = 10, order_by = 'id', order_dir = 'asc' }: ProjectsParams) {
  const key = endpoints.projects({ page, limit, order_by, order_dir });

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
      id: project.id,
      title: project.title,
      description: project.description,
      submitter_name: project.submitters[0]?.name || 'Unknown',
      created_at: project.created_at,
      link: `/projects/${project.id}`,
      fund: project.fund,
      campaign: project.campaign
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
 * @returns { fundData, campaignData, projectData, isLoading, error, mutate }
 * @typedef {Object} ProjectData
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
    metricsData: data?.data.metrics,
    isLoading,
    error,
    mutate
  };
}
