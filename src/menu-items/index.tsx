// project-imports
import home from './home';
import funds from './funds';
import metrics from './metrics';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [home, metrics]
};

export default menuItems;
