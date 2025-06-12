import { Link } from 'react-router-dom';
import { To } from 'history';

/** MUI **/
import ButtonBase from '@mui/material/ButtonBase';
import { SxProps } from '@mui/system';

/** Components **/
import Logo from './LogoMain';
import LogoIcon from './LogoIcon';
import { APP_DEFAULT_PATH } from 'config';

interface Props {
  isIcon?: boolean;
  sx?: SxProps;
  to?: To;
}

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection({ isIcon, sx, to }: Props) {
  return (
    <ButtonBase component={Link} to={to ?? APP_DEFAULT_PATH} sx={sx} disableRipple>
      {isIcon ? <LogoIcon /> : <Logo />}
    </ButtonBase>
  );
}
