import { createContext, ReactNode } from 'react';

// project-imports
import config, { MenuOrientation, ThemeMode } from 'config';
import useLocalStorage from 'hooks/useLocalStorage';

// types
import { CustomizationProps, FontFamily, PresetColor } from 'types/config';

// initial state
const initialState: CustomizationProps = {
  ...config,
  onChangeContainer: () => {},
  onChangeMode: () => {},
  onChangePresetColor: () => {},
  onChangeMiniDrawer: () => {},
  onChangeMenuOrientation: () => {},
  onChangeMenuCaption: () => {},
  onChangeFontFamily: () => {},
  onChangeContrast: () => {}
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
  children: ReactNode;
};

function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useLocalStorage('able-pro-material-react-ts-config', initialState);

  const onChangeContainer = (container: string) => {
    let containerValue: boolean;

    if (container === 'fluid') {
      containerValue = false;
    } else {
      containerValue = true;
    }
    setConfig({
      ...config,
      container: containerValue
    });
  };

  const onChangeMode = (mode: ThemeMode) => {
    setConfig({
      ...config,
      mode
    });
  };

  const onChangePresetColor = (theme: PresetColor) => {
    setConfig({
      ...config,
      presetColor: theme
    });
  };

  const onChangeMiniDrawer = (miniDrawer: boolean) => {
    setConfig({
      ...config,
      miniDrawer
    });
  };

  const onChangeContrast = (themeContrast: string) => {
    let contrastValue: boolean;

    if (themeContrast === 'contrast') {
      contrastValue = true;
    } else {
      contrastValue = false;
    }
    setConfig({
      ...config,
      themeContrast: contrastValue
    });
  };

  const onChangeMenuCaption = (menuCaption: string) => {
    let captionValue: boolean;

    if (menuCaption === 'caption') {
      captionValue = true;
    } else {
      captionValue = false;
    }
    setConfig({
      ...config,
      menuCaption: captionValue
    });
  };

  const onChangeMenuOrientation = (layout: MenuOrientation) => {
    setConfig({
      ...config,
      menuOrientation: layout
    });
  };

  const onChangeFontFamily = (fontFamily: FontFamily) => {
    setConfig({
      ...config,
      fontFamily
    });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeContainer,
        onChangeMode,
        onChangePresetColor,
        onChangeMiniDrawer,
        onChangeMenuOrientation,
        onChangeMenuCaption,
        onChangeFontFamily,
        onChangeContrast
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };
