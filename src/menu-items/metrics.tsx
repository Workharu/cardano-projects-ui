// assets
import { Award, Activity, Tree, TickCircle, People, Chart1 } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

/** Icons **/
const icons = {
  uniquenessMetrics: Award,
  socialImpactMetrics: People,
  environmentalImpactMetrics: Tree,
  sdgMetrics: Chart1,
  completenessMetrics: TickCircle,
  activityMetrics: Activity
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
      id: 'social_impact',
      title: 'Social Impact',
      type: 'item',
      icon: icons.socialImpactMetrics,
      url: '/metrics/social-impact',
      target: false,
      disabled: false
    },
    {
      id: 'environmental_impact',
      title: 'Environmental Impact',
      type: 'item',
      icon: icons.environmentalImpactMetrics,
      url: '/metrics/environmental-impact',
      target: false,
      disabled: false
    },
    {
      id: 'sdg',
      title: 'SDG Ratings',
      type: 'item',
      icon: icons.sdgMetrics,
      url: '/metrics/sdg',
      target: false
    },
    {
      id: 'activity',
      title: 'Activity',
      type: 'item',
      icon: icons.activityMetrics,
      url: '/metrics/activity',
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
