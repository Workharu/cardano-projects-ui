/** MUI **/
import { Theme } from '@mui/material/styles';

/** Types **/
import { ColorProps } from 'types/extended';

// ==============================|| CUSTOM FUNCTION - COLORS ||============================== //

/**
 * Get colors based on the provided color prop
 * @param theme - MUI theme object
 * @param color - Color prop to determine which color palette to return
 * @returns Corresponding color palette from the theme
 */
export default function getColors(theme: Theme, color?: ColorProps) {
  switch (color!) {
    case 'secondary':
      return theme.palette.secondary;
    case 'error':
      return theme.palette.error;
    case 'warning':
      return theme.palette.warning;
    case 'info':
      return theme.palette.info;
    case 'success':
      return theme.palette.success;
    default:
      return theme.palette.primary;
  }
}
