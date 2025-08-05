import { Box, Typography, Stack, Skeleton, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';

/** Components **/
import CompactProjectCard from './CompactProjectCard';

/** Types **/
import { Metrics } from 'types/metrics';

interface Props {
  title: string;
  projects: Metrics[];
  isLoading: boolean;
  error?: any;
  metricType: keyof Metrics;
  totalItems: number;
  icon?: React.ReactNode;
}

/**
 * MetricsSection component for displaying top projects in a specific metric
 */
export default function MetricsSection({ title, projects, isLoading, error, metricType, totalItems, icon }: Props) {
  if (error) {
    return (
      <Box mb={4}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          {icon}
          <Typography variant="h5" fontWeight={600}>
            {title}
          </Typography>
        </Stack>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          Failed to load {title.toLowerCase()} data. Please try again later.
        </Alert>
      </Box>
    );
  }

  return (
    <Box mb={4}>
      {/* Section Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Stack direction="row" alignItems="center" spacing={1}>
          {icon}
          <Typography variant="h5" fontWeight={600}>
            {title}
          </Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          Top 5 of {totalItems.toLocaleString()} projects
        </Typography>
      </Stack>

      {/* Projects Grid */}
      <Grid container spacing={2}>
        {isLoading ? (
          // Loading skeletons
          [...Array(5)].map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  border: 1,
                  borderColor: 'divider',
                  height: 200
                }}
              >
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Skeleton variant="circular" width={40} height={40} />
                    <Box flex={1}>
                      <Skeleton variant="text" width="80%" height={20} />
                      <Skeleton variant="text" width="60%" height={16} />
                    </Box>
                  </Stack>
                  <Skeleton variant="text" width="100%" height={16} />
                  <Skeleton variant="text" width="90%" height={16} />
                  <Box mt="auto">
                    <Skeleton variant="rectangular" width="100%" height={32} sx={{ borderRadius: 1 }} />
                  </Box>
                </Stack>
              </Box>
            </Grid>
          ))
        ) : projects.length > 0 ? (
          // Actual project cards
          projects.map((project, index) => (
            <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
              <CompactProjectCard project={project} metricType={metricType} rank={index + 1} />
            </Grid>
          ))
        ) : (
          // No data state
          <Grid size={12}>
            <Box
              sx={{
                textAlign: 'center',
                py: 6,
                px: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider'
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No {title.toLowerCase()} data available
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Check back later for updated metrics.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
