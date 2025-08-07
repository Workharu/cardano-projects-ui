import useSWR from 'swr';
import qs from 'query-string';
import { useMemo } from 'react';

/** Utility **/
import { fetcher } from 'utils/axios';

/** Types **/
import { Metrics } from 'types/metrics';
import { SortableFields, SortDirection } from 'types/sort';

interface MetricsParams {
  page?: number;
  limit?: number;
  order_by?: SortableFields;
  order_dir?: SortDirection;
}

interface MetricConfig {
  endpoint: string;
  defaultOrderBy: SortableFields;
  defaultOrderDir: SortDirection;
}

/** Metric configurations **/
const METRIC_CONFIGS: Record<string, MetricConfig> = {
  uniqueness: {
    endpoint: 'uniqueness',
    defaultOrderBy: 'uniqueness_score',
    defaultOrderDir: 'desc'
  },
  social_impact: {
    endpoint: 'social-impact',
    defaultOrderBy: 'social_impact',
    defaultOrderDir: 'desc'
  },
  environmental_impact: {
    endpoint: 'environmental-impact',
    defaultOrderBy: 'environmental_impact',
    defaultOrderDir: 'desc'
  },
  sdg: {
    endpoint: 'sdg',
    defaultOrderBy: 'sdg_confidence',
    defaultOrderDir: 'desc'
  },
  activity: {
    endpoint: 'activity',
    defaultOrderBy: 'activity_rank',
    defaultOrderDir: 'asc'
  },
  completeness: {
    endpoint: 'completeness',
    defaultOrderBy: 'completeness_rank',
    defaultOrderDir: 'asc'
  }
};

/**
 * Generic hook to fetch metrics data based on type and parameters.
 *
 * @param metricType - The type of metric to fetch (e.g., 'uniqueness', 'social_impact').
 * @param params - Parameters for pagination and sorting.
 * @return An object containing the fetched metrics data, total items, loading state, error, and mutate function.
 */
function useMetrics(metricType: keyof typeof METRIC_CONFIGS, params: MetricsParams = {}) {
  const config = METRIC_CONFIGS[metricType];

  const queryParams = {
    page: params.page || 1,
    limit: params.limit || 5,
    order_by: params.order_by || config.defaultOrderBy,
    order_dir: params.order_dir || config.defaultOrderDir
  };

  const endpoint = `metrics/${config.endpoint}/projects?${qs.stringify(queryParams)}`;

  const { data, isLoading, error, mutate } = useSWR(endpoint, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue: Metrics[] = useMemo(() => {
    const projects = data?.data?.items || [];
    return Array.isArray(projects) ? projects : [];
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

/** Exported hooks using the generic implementation **/
export const useUniquenessMetrics = (params?: MetricsParams) => useMetrics('uniqueness', params);

export const useSocialImpactMetrics = (params?: MetricsParams) => useMetrics('social_impact', params);

export const useEnvironmentalImpactMetrics = (params?: MetricsParams) => useMetrics('environmental_impact', params);

export const useSdgMetrics = (params?: MetricsParams) => useMetrics('sdg', params);

// export const useActivityMetrics = (params?: MetricsParams) => useMetrics('activity', params);

// export const useCompletenessMetrics = (params?: MetricsParams) => useMetrics('completeness', params);
