// necessary imports
import { Link } from 'react-router';

// material-ui
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';

interface Props {
  name: string;
  total: number;
  link: string;
}

export default function ListCamaignsPerFundCard({ name, total, link }: Props) {
  return (
    <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
      <MainCard>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack sx={{ gap: 1 }}>
            <Typography variant="h5" color="inherit">
              {name}
            </Typography>
            <Stack direction="column" spacing={0}>
              <Typography variant="subtitle2" color="text.secondary">
                Idea count: {total}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </MainCard>
    </Link>
  );
}
