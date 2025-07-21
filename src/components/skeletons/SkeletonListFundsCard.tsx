import { Card, CardContent, Stack } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid2';

type Props = {
  variant?: 'card' | 'list';
};

export default function SkeletonListFundsCard({ variant = 'card' }: Props) {
  return (
    <Card>
      <CardContent>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack sx={{ gap: 1, width: '100%' }}>
            {/* Name */}
            <Skeleton variant="text" width="60%" height={32} sx={{ fontSize: '1.5rem' }} />

            <Stack direction="column" spacing={0.5}>
              {/* Updated at date */}
              <Skeleton variant="text" width="70%" height={24} />

              {/* Project count */}
              <Skeleton variant="text" width="40%" height={20} />
            </Stack>
          </Stack>

          {/* <Grid>
            <Skeleton variant="circular" width={40} height={40} />
          </Grid> */}
        </Grid>
      </CardContent>
    </Card>
  );
}
