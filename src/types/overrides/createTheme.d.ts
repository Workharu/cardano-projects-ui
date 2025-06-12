// eslint-disable-next-line
import * as Theme from '@mui/material/styles';

/** Components **/
import { CustomShadowProps } from 'types/theme';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: CustomShadowProps;
  }
}
