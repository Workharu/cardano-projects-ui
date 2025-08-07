import { Link } from 'react-router';

/** MUI Imports **/
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/** Components **/
import MainCard from 'components/MainCard';

/** Icons **/
import { MessageText1, Like1 } from 'iconsax-react';

/** Types **/
import { MetricsData } from 'types/projects';
import { Divider } from '@mui/material';

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  fontSize: '1.25rem'
}));

const SimilarProjectsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[200]}`
}));

export default function ProjectMetricsCard({ metrics, isMobile }: { metrics: MetricsData; isMobile: boolean }) {
  if (!metrics) return null;

  const formatScoreAsPercentage = (score: number | undefined) => {
    if (score === undefined || score === null) return 'N/A';
    return `${(score * 100).toFixed(1)}%`;
  };

  return (
    <MainCard border={false} sx={{ p: isMobile ? 2 : 3, mb: 3 }}>
      <SectionHeader variant="h5">Metrics Stats</SectionHeader>
      <Stack spacing={2}>
        {metrics.uniqueness && (
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body1" color="text.secondary">
                <MessageText1 size="18px" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                Uniqueness Score
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formatScoreAsPercentage(metrics.uniqueness.score)}
              </Typography>
            </Stack>

            {metrics.uniqueness.top_similar_projects && metrics.uniqueness.top_similar_projects.length > 0 && (
              <SimilarProjectsContainer>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 'medium' }}>
                  Similar Projects:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 0.7 }}>
                  {metrics.uniqueness.top_similar_projects.map((project) => (
                    <Link key={project.id} to={`/projects/${project.id}`} style={{ textDecoration: 'none', overflow: 'hidden' }}>
                      <Chip
                        key={project.id}
                        label={project.title}
                        variant="outlined"
                        size="medium"
                        sx={{
                          fontSize: '0.75rem',
                          height: 'auto',
                          py: 0.5,
                          '& .MuiChip-label': {
                            px: 1,
                            py: 0.25,
                            lineHeight: 1.2
                          }
                        }}
                      />
                    </Link>
                  ))}
                </Stack>
              </SimilarProjectsContainer>
            )}
          </Stack>
        )}

        <Divider sx={{ my: 2 }} />

        {metrics.environmental_impact && (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" color="text.secondary">
              <Like1 size="18px" style={{ verticalAlign: 'middle', marginRight: 8 }} />
              Social Impact
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {metrics.social_impact?.has_impact == true ? 'Yes' : 'No'}
            </Typography>
          </Stack>
        )}

        <Divider sx={{ my: 2 }} />

        {metrics.environmental_impact && (
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" color="text.secondary">
              <Like1 size="18px" style={{ verticalAlign: 'middle', marginRight: 8 }} />
              Environmental Impact
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {metrics.environmental_impact?.has_impact == true ? 'Yes' : 'No'}
            </Typography>
          </Stack>
        )}
      </Stack>
    </MainCard>
  );
}
