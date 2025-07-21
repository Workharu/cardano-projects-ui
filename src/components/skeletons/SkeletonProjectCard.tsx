import Skeleton from '@mui/material/Skeleton';
import { Card, CardContent, Stack, Avatar, Box } from '@mui/material';

type Props = {
  variant?: 'card' | 'list';
};

export default function SkeletonProjectCard({ variant = 'card' }: Props) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          {/* Avatar + name */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Skeleton variant="circular">
              <Avatar sx={{ width: 56, height: 56 }} />
            </Skeleton>
            <Box>
              <Skeleton variant="text" width={120} height={24} />
              <Skeleton variant="text" width={80} height={18} />
            </Box>
          </Stack>

          {/* Title */}
          <Skeleton variant="text" width="90%" height={36} />

          {/* Chips row */}
          <Stack direction="row" spacing={1}>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} variant="rounded" width={100} height={32} />
            ))}
          </Stack>

          {/* Section headers + content */}
          {[...Array(2)].map((_, idx) => (
            <Box key={idx}>
              <Skeleton variant="text" width="40%" height={28} sx={{ mb: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={80} />
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
