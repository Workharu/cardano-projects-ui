/** Types **/
import { DefaultConfigProps } from 'types/config';

// ==============================|| THEME CONSTANT ||============================== //
export const APP_DEFAULT_PATH = '/';
export const HORIZONTAL_MAX_ITEM = 8;
export const DRAWER_WIDTH = 280;
export const MINI_DRAWER_WIDTH = 90;
export const HEADER_HEIGHT = 74;
export const GRID_COMMON_SPACING = { xs: 2, md: 2.5 };

export enum SimpleLayoutType {
  SIMPLE = 'simple',
  LANDING = 'landing'
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto'
}

export enum MenuOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export enum NavActionType {
  FUNCTION = 'function',
  LINK = 'link'
}

// ==============================|| THEME CONFIG ||============================== //
const config: DefaultConfigProps = {
  fontFamily: `'Quicksand', sans-serif`,
  menuOrientation: MenuOrientation.VERTICAL,
  menuCaption: true,
  miniDrawer: false,
  container: true,
  mode: ThemeMode.LIGHT,
  presetColor: 'default',
  themeContrast: false
};

export default config;
