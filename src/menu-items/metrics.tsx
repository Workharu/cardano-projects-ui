// assets
import { Award, DollarCircle, Tree, TickCircle } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

/** Icons **/
const icons = {
  uniquenessMetrics: Award,
  budgetMetrics: DollarCircle,
  socialAndEnvironmentalImpactMetrics: Tree,
  completenessMetrics: TickCircle
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
      id: 'social_and_environmental_impact',
      title: 'Socio-Environmental Impact',
      type: 'item',
      icon: icons.socialAndEnvironmentalImpactMetrics,
      url: '/metrics/social-and-environmental-impact',
      target: false,
      disabled: false
    },
    {
      id: 'budget',
      title: 'Budget Friendly',
      type: 'item',
      icon: icons.budgetMetrics,
      url: '/metrics/budget',
      target: false,
      disabled: true
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
