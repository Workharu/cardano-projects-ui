import { useMemo } from 'react';
import useSWR from 'swr';

// icons
import { Bookmark2, Money, ProfileDelete, RefreshCircle } from 'iconsax-react';

import { fetcher } from 'utils/axios';
import { HomeCardData } from 'types/home';

// Define icon and color mapping
const iconMap: Record<string, any> = {
  ideas: {
    iconPrimary: Bookmark2,
    color: 'primary.darker',
    bgcolor: 'primary.lighter'
  },
  uniqueness: {
    iconPrimary: RefreshCircle,
    color: 'success.darker',
    bgcolor: 'success.lighter'
  },
  budget: {
    iconPrimary: Money,
    color: 'warning.darker',
    bgcolor: 'warning.lighter'
  },
  completeness: {
    iconPrimary: ProfileDelete,
    color: 'error.darker',
    bgcolor: 'error.lighter'
  }
};

// API endpoint
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
        title: `Total ${item.title}`,
        value: item.value,
        date: item.date,
        iconPrimary,
        color,
        bgcolor,
        link: `/${name}`
      };
    });
  }, [data]);

  return {
    homeData: memoizedValue,
    homeLoading: isLoading
  };
}
