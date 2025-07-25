import useSWR from 'swr';
import { useMemo } from 'react';

/** Utility **/
import { fetcher } from 'utils/axios';

/** Types **/
import { ProjectsCardData } from 'types/projects';

// API endpoints for different metrics
const endpoints = {
  uniqueness: 'metrics/uniqueness/projects?limit=5&order_by=uniqueness_rank&order_dir=asc',
  social_and_environmental_impact: 'metrics/social-and-environmental-impact/projects?limit=5&order_by=has_impact&order_dir=desc'
  //   budget: 'budget/projects?limit=5&order_by=budget_rank&order_dir=asc',
  //   completeness: 'completeness/projects?limit=5&order_by=completeness_rank&order_dir=asc'
};

export interface MetricsProject extends ProjectsCardData {
  uniqueness?: {
    rank: number;
    value: number;
  };
  social_and_environmental_impact?: {
    has_impact: string;
  };
  budget?: {
    rank: number;
    value: number;
  };
  completeness?: {
    rank: number;
    value: number;
  };
}

export function useUniquenessMetrics() {
  const { data, isLoading, error } = useSWR(endpoints.uniqueness, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue: MetricsProject[] = useMemo(() => {
    const projects = data?.data?.items || [];
    return Array.isArray(projects) ? projects : [];
  }, [data]);

  return {
    uniquenessProjects: memoizedValue,
    isLoading,
    error,
    totalItems: data?.data?.total_items || 0
  };
}

export function useSocialImpactMetrics() {
  const { data, isLoading, error } = useSWR(endpoints.social_and_environmental_impact, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue: MetricsProject[] = useMemo(() => {
    const projects = data?.data?.items || [];
    return Array.isArray(projects) ? projects : [];
  }, [data]);

  return {
    socialImpactProjects: memoizedValue,
    isLoading,
    error,
    totalItems: data?.data?.total_items || 0
  };
}

// export function useBudgetMetrics() {
//   const { data, isLoading, error } = useSWR(endpoints.budget, fetcher, {
//     revalidateIfStale: false,
//     revalidateOnFocus: false,
//     revalidateOnReconnect: false
//   });

//   const memoizedValue: MetricsProject[] = useMemo(() => {
//     const projects = data?.data?.items || [];
//     return Array.isArray(projects) ? projects : [];
//   }, [data]);

//   return {
//     budgetProjects: memoizedValue,
//     isLoading,
//     error,
//     totalItems: data?.data?.total_items || 0
//   };
// }

// export function useCompletenessMetrics() {
//   const { data, isLoading, error } = useSWR(endpoints.completeness, fetcher, {
//     revalidateIfStale: false,
//     revalidateOnFocus: false,
//     revalidateOnReconnect: false
//   });

//   const memoizedValue: MetricsProject[] = useMemo(() => {
//     const projects = data?.data?.items || [];
//     return Array.isArray(projects) ? projects : [];
//   }, [data]);

//   return {
//     completenessProjects: memoizedValue,
//     isLoading,
//     error,
//     totalItems: data?.data?.total_items || 0
//   };
// }
