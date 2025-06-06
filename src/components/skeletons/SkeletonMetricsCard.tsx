import { Card, CardContent, Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

type Props = {
  variant?: 'card' | 'list';
};

export default function SkeletonMetricsCard({ variant = 'card' }: Props) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Skeleton variant="circular" width={48} height={48} />
          <Box flex={1}>
            <Skeleton variant="text" width="70%" height={20} />
            <Skeleton variant="text" width="40%" height={20} />
          </Box>
        </Box>
        <Box mt={2}>
          <Skeleton variant="text" width="100%" height={20} />
        </Box>
      </CardContent>
    </Card>
  );
}
