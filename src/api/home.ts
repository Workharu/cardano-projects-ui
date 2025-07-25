import useSWR from 'swr';
import { useMemo } from 'react';

/** Icons **/
import { I3DCubeScan, Award, DollarCircle, Tree, TickCircle } from 'iconsax-react';

/** Utility **/
import { fetcher } from 'utils/axios';

/** Types **/
import { HomeCardData } from 'types/home';

// Define icon and color mapping
const iconMap: Record<string, any> = {
  'total projects': {
    iconPrimary: I3DCubeScan,
    color: 'primary.darker',
    bgcolor: 'primary.lighter'
  },
  uniqueness: {
    iconPrimary: Award,
    color: 'warning.darker',
    bgcolor: 'warning.lighter'
  },
  'social and environmental impact': {
    iconPrimary: Tree,
    color: 'info.darker',
    bgcolor: 'info.lighter'
  },
  budget: {
    iconPrimary: DollarCircle,
    color: 'warning.darker',
    bgcolor: 'warning.lighter'
  },
  completeness: {
    iconPrimary: TickCircle,
    color: 'error.darker',
    bgcolor: 'error.lighter'
  }
};

const linkMap: Record<string, string> = {
  'total projects': '/projects',
  'social and environmental impact': '/social-and-environmental-impact',
  uniqueness: '/uniqueness',
  budget: '/budget',
  completeness: '/completeness'
};

/** API endpoint **/
const endpoints = {
  key: 'home/data'
};

export function useHomeData() {
  const { data, isLoading } = useSWR(endpoints.key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue: HomeCardData[] = useMemo(() => {
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
    homeData: memoizedValue,
    homeLoading: isLoading
  };
}
