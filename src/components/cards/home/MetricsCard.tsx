/** MUI **/
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/** Components **/
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import { Link } from 'react-router';

/** Types **/
import { SizeProps } from 'types/extended';
import { GenericCardProps } from 'types/root';

interface Props {
  primary: string;
  secondary: string;
  content: string;
  iconPrimary: GenericCardProps['iconPrimary'];
  color: string;
  bgcolor: string;
  link: string;
  avatarSize?: SizeProps;
  circular?: boolean;
}

// ============================|| STATISTICS - ROUND ICON CARD ||============================ //

export default function MetricsCard({
  primary,
  secondary,
  content,
  iconPrimary,
  color,
  bgcolor,
  link,
  avatarSize = 'lg',
  circular
}: Props) {
  const IconPrimary = iconPrimary!;
  const primaryIcon = iconPrimary ? <IconPrimary /> : null;

  return (
    <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
      <MainCard>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Grid>
            <Stack sx={{ gap: 1 }}>
              <Typography variant="h5" color="inherit">
                {primary}
              </Typography>
              <Typography variant="h4">{secondary}</Typography>
              {/* <Typography variant="subtitle2" color="inherit">
                {content}
              </Typography> */}
            </Stack>
          </Grid>
          <Grid>
            <Avatar variant={circular ? 'circular' : 'rounded'} sx={{ bgcolor, color }} size={avatarSize}>
              {primaryIcon}
            </Avatar>
          </Grid>
        </Grid>
      </MainCard>
    </Link>
  );
}
