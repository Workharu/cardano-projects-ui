/** MUI **/
import { Theme } from '@mui/material/styles';

// ==============================|| CUSTOM FUNCTION - COLOR SHADOWS ||============================== //

/**
 * Get shadow based on the provided shadow prop
 * @param theme - MUI theme object
 * @param shadow - Shadow prop to determine which shadow to return
 * @returns Corresponding shadow from the theme's custom shadows
 */
export default function getShadow(theme: Theme, shadow: string): string {
  switch (shadow) {
    case 'secondary':
      return theme.customShadows.secondary;
    case 'error':
      return theme.customShadows.error;
    case 'warning':
      return theme.customShadows.warning;
    case 'info':
      return theme.customShadows.info;
    case 'success':
      return theme.customShadows.success;
    case 'primaryButton':
      return theme.customShadows.primaryButton;
    case 'secondaryButton':
      return theme.customShadows.secondaryButton;
    case 'errorButton':
      return theme.customShadows.errorButton;
    case 'warningButton':
      return theme.customShadows.warningButton;
    case 'infoButton':
      return theme.customShadows.infoButton;
    case 'successButton':
      return theme.customShadows.successButton;
    default:
      return theme.customShadows.primary;
  }
}
