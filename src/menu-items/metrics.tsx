// assets
import { Award, Money, Check } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  uniquenessMetrics: Award,
  budgetMetrics: Money,
  completenessMetrics: Check
};

// ==============================|| MENU ITEMS - METRICS ||============================== //

const metrics: NavItemType = {
  id: 'group-pages',
  title: 'metrics',
  type: 'group',
  children: [
    {
      id: 'uniqueness',
      title: 'Uniqueness',
      type: 'item',
      icon: icons.uniquenessMetrics,
      url: '/metrics/uniqueness',
      target: false
    },
    {
      id: 'budget',
      title: 'Budget Friendly',
      type: 'item',
      icon: icons.budgetMetrics,
      url: '/metrics/budget',
      target: false
    },
    {
      id: 'completeness',
      title: 'Completeness',
      type: 'item',
      icon: icons.completenessMetrics,
      url: '/metrics/completeness',
      target: false,
      disabled: true
    }
  ]
};

export default metrics;
