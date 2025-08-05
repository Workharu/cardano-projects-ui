// assets
import { Home, Money, I3DCubeScan, Chart, Award } from 'iconsax-react';

/** Types **/
import { NavItemType } from 'types/menu';

/** Icons **/
const icons = {
  home: Home,
  funds: Money,
  campaigns: Chart,
  projects: I3DCubeScan,
  comingSoon: Award
};

// ==============================|| MENU ITEMS - HOME PAGE ||============================== //

const home: NavItemType = {
  id: 'home',
  title: 'Home',
  type: 'group',
  children: [
    {
      id: 'home-page',
      title: 'Home',
      type: 'item',
      url: '/',
      target: false,
      icon: icons.home
    },
    {
      id: 'funds',
      title: 'Funds',
      type: 'item',
      url: '/funds',
      target: false,
      icon: icons.funds
    },
    // {
    //   id: 'campaigns',
    //   title: 'Campaigns',
    //   type: 'item',
    //   url: '/campaigns',
    //   target: false,
    //   icon: icons.campaigns
    // },
    {
      id: 'projects',
      title: 'Projects',
      type: 'item',
      url: '/projects',
      target: false,
      icon: icons.projects
    }
  ]
};

export default home;
