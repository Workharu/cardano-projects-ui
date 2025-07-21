// necessary imports
import { Link } from 'react-router';

/** MUI **/
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/** Components **/
import MainCard from 'components/MainCard';

interface Props {
  name: string;
  updated_at: Date;
  total: number;
  link: string;
}

export default function ListFundsCard({ name, updated_at, total, link }: Props) {
  return (
    <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
      <MainCard>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack sx={{ gap: 1 }}>
            <Typography variant="h5" color="inherit">
              {name}
            </Typography>
            <Stack direction="column" spacing={0}>
              {/* <Typography variant="subtitle1" color="inherit">
                {new Date(updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography> */}
              <Typography variant="subtitle2" color="text.secondary">
                Project count: {total}
              </Typography>
            </Stack>
          </Stack>
          {/* <Grid>
            <Avatar variant="rounded" sx={{ bgcolor: 'primary.lighter', color: 'primary.darker' }} size="md">
              <Bookmark2 />
            </Avatar>
          </Grid> */}
        </Grid>
      </MainCard>
    </Link>
  );
}
