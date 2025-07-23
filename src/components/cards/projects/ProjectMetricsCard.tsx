import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MainCard from 'components/MainCard';
import { MessageText1, Like1 } from 'iconsax-react';
import { MetricsData } from 'types/projects';

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  fontSize: '1.25rem'
}));

export default function ProjectMetricsCard({ metrics, isMobile }: { metrics: MetricsData; isMobile: boolean }) {
  if (!metrics) return null;

  return (
    <MainCard border={false} sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
      <SectionHeader variant="h5">Metrics Stats</SectionHeader>
      <Stack spacing={2}>
        {metrics.uniqueness && (
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" color="text.secondary">
              <MessageText1 size="18px" style={{ verticalAlign: 'middle', marginRight: 8 }} />
              Uniqueness Score
            </Typography>
            <Typography variant="body1">{metrics.uniqueness.value ?? 'N/A'}</Typography>
          </Stack>
        )}
        {metrics.social_and_environmental_impact && (
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" color="text.secondary">
              <Like1 size="18px" style={{ verticalAlign: 'middle', marginRight: 8 }} />
              Social and Environmental Impact
            </Typography>
            <Typography variant="body1">{metrics.social_and_environmental_impact.has_impact === 'True' ? 'Yes' : 'No'}</Typography>
          </Stack>
        )}
      </Stack>
    </MainCard>
  );
}
