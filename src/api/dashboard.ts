import useSWR from 'swr';
import { useMemo } from 'react';

/** Icons **/
import { I3DCubeScan, Money, WalletMoney, Award, Activity, Tree, TickCircle, People, Chart1 } from 'iconsax-react';

/** Utility **/
import { fetcher } from 'utils/axios';

/** Types **/
import { DashboardCardData } from 'types/dashboard';

// Define icon and color mapping
const iconMap: Record<string, any> = {
  'total projects': {
    iconPrimary: I3DCubeScan,
    color: 'primary.darker',
    bgcolor: 'primary.lighter'
  },
  'total funds': {
    iconPrimary: Money,
    color: 'primary.darker',
    bgcolor: 'primary.lighter'
  },
  'total campaigns': {
    iconPrimary: WalletMoney,
    color: 'primary.darker',
    bgcolor: 'primary.lighter'
  },
  'highly unique projects': {
    iconPrimary: Award,
    color: 'warning.darker',
    bgcolor: 'warning.lighter'
  },
  'social impact': {
    iconPrimary: People,
    color: 'secondary.darker',
    bgcolor: 'secondary.lighter'
  },
  'environmental impact': {
    iconPrimary: Tree,
    color: 'info.darker',
    bgcolor: 'info.lighter'
  },
  'sdg ratings': {
    iconPrimary: Chart1,
    color: '#9c27b0',
    bgcolor: '#e1bee7'
  },
  activity: {
    iconPrimary: Activity,
    color: 'success.darker',
    bgcolor: 'success.lighter'
  }
};

const linkMap: Record<string, string> = {
  'total projects': '/projects',
  'highly unique projects': '/metrics/uniqueness',
  'social impact': '/metrics/social-impact',
  'environmental impact': '/metrics/environmental-impact',
  'sdg ratings': '/metrics/sdg',
  activity: '/metrics/activity'
};

/** API endpoint **/
const endpoints = {
  key: 'dashboard'
};

export function useDashboardData() {
  const { data, isLoading } = useSWR(endpoints.key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue: DashboardCardData[] = useMemo(() => {
    const actualData = data?.data || [];

    if (!Array.isArray(actualData)) {
      return [];
    }

    return actualData.map((item: any) => {
      const name = item.title?.toLowerCase();
      const { iconPrimary, color, bgcolor } = iconMap[name] || {};

      return {
        title: item.title,
        value: item.value,
        date: item.date,
        iconPrimary,
        color,
        bgcolor,
        link: `${linkMap[name] || ''}`
      };
    });
  }, [data]);

  return {
    dashboardData: memoizedValue,
    dashboardLoading: isLoading
  };
}
