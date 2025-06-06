import { Card, CardContent, Box, Stack } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

type Props = {
  variant?: 'card' | 'list';
};

export default function SkeletonListIdeasCard({ variant = 'list' }: Props) {
  return (
    <Card>
      <CardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          {/* Left */}
          <Stack alignItems="center" spacing={1} minWidth={80}>
            <Skeleton variant="circular" width={60} height={60} />
            <Skeleton variant="text" width={60} height={16} />
            <Box display="flex" alignItems="center" gap={0.5}>
              <Skeleton variant="rectangular" width={20} height={20} />
              <Skeleton variant="text" width={30} height={16} />
            </Box>
          </Stack>

          {/* Right */}
          <Stack flex={1} spacing={1}>
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="text" width="40%" height={20} />
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Skeleton variant="rectangular" width="100%" height={80} />
            </Box>
            <Box sx={{ alignSelf: 'flex-start' }}>
              <Skeleton variant="rectangular" width={100} height={36} />
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
